const state = {
  index: null,
  status: null,
  query: "",
  category: "all",
};

const categoryNames = {
  all: "All Files",
  _root: "Root Documents",
  "00_README_START_HERE": "Start Here",
  "01_Identity_and_Records": "Identity and Records",
  "02_Financial": "Financial",
  "03_Medical": "Medical",
  "04_Home_and_Vehicle": "Home and Vehicle",
  "05_Maps": "Maps",
  "06_Reference_Library": "Reference Library",
  "07_Tools_and_Software": "Tools and Software",
  "08_Family_and_Contacts": "Family and Contacts",
  "09_Backups_and_Exports": "Backups and Exports",
  "10_Identity_Reset": "Identity Reset",
  "99_Indexes_and_Checksums": "Indexes and Checksums",
  config: "Config",
};

function formatBytes(bytes) {
  const units = ["B", "KB", "MB", "GB", "TB"];
  let value = bytes;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  return `${value.toFixed(value >= 10 || unit === 0 ? 0 : 1)} ${units[unit]}`;
}

function formatDate(value) {
  if (!value) return "Unknown";
  return new Date(value).toLocaleString();
}

function cleanName(name) {
  return name
    .replace(/\.[^.]+$/, "")
    .replace(/_/g, " ")
    .replace(/\bCDC\b/g, "CDC")
    .replace(/\bFEMA\b/g, "FEMA")
    .replace(/\bNWS\b/g, "NWS");
}

function typeFor(file) {
  const ext = file.name.split(".").pop().toLowerCase();
  if (ext === "pdf") return "PDF";
  if (ext === "html" || ext === "htm") return "HTML";
  if (ext === "md") return "Markdown";
  if (ext === "csv" || ext === "tsv") return "Table";
  if (ext === "json") return "JSON";
  return ext.toUpperCase();
}

function categoryLabel(key) {
  return categoryNames[key] || key.replace(/_/g, " ");
}

function currentFiles() {
  if (!state.index) return [];
  const q = state.query.trim().toLowerCase();
  return state.index.files.filter((file) => {
    const matchesCategory = state.category === "all" || file.category === state.category;
    const haystack = [
      file.path,
      file.name,
      file.category,
      file.source || "",
      file.source_url || "",
      file.sha256,
    ]
      .join(" ")
      .toLowerCase();
    return matchesCategory && (!q || haystack.includes(q));
  });
}

function renderMetrics(index) {
  document.getElementById("fileCount").textContent = index.file_count.toLocaleString();
  document.getElementById("totalSize").textContent = formatBytes(index.total_bytes);
  document.getElementById("generatedAt").textContent = formatDate(index.generated_at);
  document.getElementById("statusLine").textContent = `Local archive rooted at ${index.root}`;

  if (!state.status) return;

  document.getElementById("diskFree").textContent = formatBytes(state.status.disk.free);
  document.getElementById("rcloneStatus").textContent =
    state.status.rclone.ok ? state.status.rclone.remotes.join(", ") || "Configured" : "Check needed";
  document.getElementById("webStatus").textContent =
    state.status.prepper_web.active ? "Active" : state.status.prepper_web.status;
}

function renderCategories(index) {
  const categories = document.getElementById("categories");
  categories.innerHTML = "";

  const allButton = categoryButton("all", {
    files: index.file_count,
    bytes: index.total_bytes,
  });
  categories.appendChild(allButton);

  Object.entries(index.categories)
    .sort(([a], [b]) => a.localeCompare(b))
    .forEach(([key, stats]) => {
      categories.appendChild(categoryButton(key, stats));
    });
}

function categoryButton(key, stats) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `category-item${state.category === key ? " is-active" : ""}`;
  button.innerHTML = `
    <span>${categoryLabel(key)}</span>
    <small>${stats.files.toLocaleString()} files · ${formatBytes(stats.bytes)}</small>
  `;
  button.addEventListener("click", () => {
    state.category = key;
    render();
  });
  return button;
}

function renderFiles() {
  const files = currentFiles();
  const rows = document.getElementById("fileRows");
  const heading = document.getElementById("fileHeading");
  const count = document.getElementById("resultCount");

  heading.textContent = categoryLabel(state.category);
  count.textContent = `${files.length.toLocaleString()} of ${state.index.file_count.toLocaleString()} files`;
  rows.innerHTML = "";

  if (files.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "No files match this view.";
    rows.appendChild(empty);
    return;
  }

  files.forEach((file) => {
    const card = document.createElement("article");
    card.className = "file-card";
    card.innerHTML = `
      <div class="file-card-main">
        <div>
          <span class="file-type">${typeFor(file)}</span>
          <h3>${cleanName(file.name)}</h3>
        </div>
        <a class="open-link" href="${encodeURI(file.url)}" target="_blank" rel="noopener">Open</a>
      </div>
      <dl>
        <div>
          <dt>Category</dt>
          <dd>${categoryLabel(file.category)}</dd>
        </div>
        <div>
          <dt>Size</dt>
          <dd>${formatBytes(file.size)}</dd>
        </div>
        <div>
          <dt>Modified</dt>
          <dd>${formatDate(file.modified)}</dd>
        </div>
        <div>
          <dt>Path</dt>
          <dd class="mono">${file.path}</dd>
        </div>
        ${file.source ? `<div><dt>Source</dt><dd>${file.source}</dd></div>` : ""}
        <div>
          <dt>SHA-256</dt>
          <dd class="mono hash" title="${file.sha256}">${file.sha256}</dd>
        </div>
      </dl>
    `;
    rows.appendChild(card);
  });
}

function render() {
  if (!state.index) return;
  renderMetrics(state.index);
  renderCategories(state.index);
  renderFiles();
}

async function init() {
  const [indexResponse, statusResponse] = await Promise.all([
    fetch("data/index.json", { cache: "no-store" }),
    fetch("data/status.json", { cache: "no-store" }).catch(() => null),
  ]);
  state.index = await indexResponse.json();
  if (statusResponse && statusResponse.ok) {
    state.status = await statusResponse.json();
  }

  const search = document.getElementById("search");
  search.addEventListener("input", () => {
    state.query = search.value;
    render();
  });

  document.getElementById("clearSearch").addEventListener("click", () => {
    search.value = "";
    state.query = "";
    render();
    search.focus();
  });

  render();
}

init().catch((error) => {
  document.getElementById("statusLine").textContent = `Could not load index: ${error.message}`;
});
