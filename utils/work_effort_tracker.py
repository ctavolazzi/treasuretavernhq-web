#!/usr/bin/env python3
import argparse
import json
import os
import re
from dataclasses import dataclass, asdict
from typing import List, Dict, Any

STATUS_RE = re.compile(r"^##\s*Status:\s*(.+)$", re.IGNORECASE)
CHECKBOX_RE = re.compile(r"^-\s*\[( |x)\]\s*(.+)$")
TITLE_RE = re.compile(r"^#\s*(.+)$")
TIMESTAMP_RE = re.compile(r"^\*\*(Started|Last Updated):\*\*\s*(.+)$")

@dataclass
class Task:
    text: str
    done: bool

@dataclass
class EffortSummary:
    path: str
    title: str
    status: str
    started: str = ""
    last_updated: str = ""
    tasks: List[Task] = None

    def to_dict(self) -> Dict[str, Any]:
        return {
            "path": self.path,
            "title": self.title,
            "status": self.status,
            "started": self.started,
            "last_updated": self.last_updated,
            "tasks": [{"text": t.text, "done": t.done} for t in (self.tasks or [])],
        }

def parse_effort(path: str) -> EffortSummary:
    title = os.path.basename(path)
    status = ""
    started = ""
    last_updated = ""
    tasks: List[Task] = []

    try:
        with open(path, "r", encoding="utf-8") as f:
            for line in f:
                if not title or title.endswith(".md"):
                    m = TITLE_RE.match(line.strip())
                    if m:
                        title = m.group(1).strip()
                m = STATUS_RE.match(line.strip())
                if m:
                    status = m.group(1).strip()
                m = TIMESTAMP_RE.match(line.strip())
                if m:
                    if m.group(1).lower() == "started":
                        started = m.group(2).strip()
                    elif m.group(1).lower() == "last updated":
                        last_updated = m.group(2).strip()
                m = CHECKBOX_RE.match(line)
                if m:
                    done = True if m.group(1) == "x" else False
                    text = m.group(2).strip()
                    tasks.append(Task(text=text, done=done))
    except FileNotFoundError:
        pass

    return EffortSummary(path=path, title=title, status=status, started=started, last_updated=last_updated, tasks=tasks)


def summarize(paths: List[str]) -> Dict[str, Any]:
    summaries = [parse_effort(p).to_dict() for p in paths]
    return {"summaries": summaries}


def main():
    parser = argparse.ArgumentParser(description="Work Effort Tracker")
    parser.add_argument("command", choices=["summarize"], help="Action to perform")
    parser.add_argument("paths", nargs="*", help="Paths to work effort markdown files")
    parser.add_argument("--json", dest="json_paths", help="JSON array of paths")
    args = parser.parse_args()

    paths: List[str] = args.paths
    if args.json_paths:
        try:
            arr = json.loads(args.json_paths)
            if isinstance(arr, list):
                paths.extend(arr)
        except json.JSONDecodeError:
            pass

    # Deduplicate while preserving order
    seen = set()
    unique_paths = []
    for p in paths:
        if p not in seen:
            seen.add(p)
            unique_paths.append(p)

    if args.command == "summarize":
        print(json.dumps(summarize(unique_paths), indent=2))


if __name__ == "__main__":
    main()
