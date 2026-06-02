#!/usr/bin/env python3
from __future__ import annotations

import json
import shutil
import subprocess
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "site" / "data" / "status.json"


def run(command: list[str]) -> tuple[int, str]:
    try:
        result = subprocess.run(command, check=False, text=True, capture_output=True, timeout=20)
        return result.returncode, (result.stdout + result.stderr).strip()
    except Exception as exc:
        return 1, str(exc)


def main() -> None:
    usage = shutil.disk_usage(ROOT)
    rclone_code, rclone_out = run(["rclone", "listremotes"])
    tmux_code, tmux_out = run(["tmux", "list-sessions"])
    service_code, service_out = run(["systemctl", "--user", "is-active", "prepper-web.service"])

    status = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "root": str(ROOT),
        "disk": {
            "total": usage.total,
            "used": usage.used,
            "free": usage.free,
            "percent_used": round((usage.used / usage.total) * 100, 2) if usage.total else 0,
        },
        "rclone": {
            "ok": rclone_code == 0,
            "remotes": [line for line in rclone_out.splitlines() if line.strip()],
        },
        "tmux": {
            "ok": tmux_code == 0,
            "sessions": [line for line in tmux_out.splitlines() if line.strip()],
        },
        "prepper_web": {
            "active": service_code == 0 and service_out.strip() == "active",
            "status": service_out.strip() or "unknown",
        },
    }

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(status, indent=2), encoding="utf-8")
    print(f"Wrote {OUT}")


if __name__ == "__main__":
    main()

