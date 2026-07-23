#!/usr/bin/env bash
set -euo pipefail

# ─────────────────────────────────────────────────────────────
#  Remotion Motion Graphics Skills — one-command setup
#
#  Scaffolds a fresh Remotion project (if needed) and installs:
#    • the 4 motion-graphics skills from this repo
#    • the official Remotion best-practices skill
#
#  Usage:
#    curl -fsSL https://raw.githubusercontent.com/liamrjohnston/remotion-motion-graphics-skill/main/install.sh | bash
#    curl -fsSL ... | bash -s -- my-project-name
#
#  Or after cloning this repo:
#    bash install.sh [project-name]
# ─────────────────────────────────────────────────────────────

REPO="liamrjohnston/remotion-motion-graphics-skill"
DIR="${1:-motion-graphics}"

bold() { printf '\033[1m%s\033[0m\n' "$1"; }

bold "▸ Remotion Motion Graphics Skills — setup"

if ! command -v node >/dev/null 2>&1; then
  echo "✗ Node.js is required. Install it from https://nodejs.org and re-run."
  exit 1
fi

if [ -f package.json ] && grep -q '"remotion"' package.json; then
  bold "▸ Existing Remotion project detected — installing skills into it"
else
  if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    echo "✗ You are inside a git repository, so a new project can't be scaffolded here."
    echo "  Either cd to a folder outside any repo, or run this from inside an existing Remotion project."
    exit 1
  fi
  bold "▸ Scaffolding a new Remotion project in ./${DIR}"
  npx create-video@latest --yes --blank --no-tailwind "$DIR"
  cd "$DIR"
fi

bold "▸ Installing the 4 motion-graphics skills"
npx -y skills add "$REPO" -y

bold "▸ Installing the official Remotion skill"
npx -y skills add remotion-dev/skills -y

echo ""
bold "✓ All set."
echo "  Preview:   npx remotion studio"
echo "  Then open your AI agent (e.g. Claude Code) in this folder and ask for a graphic:"
echo "    \"Build a 6-second 1080x1920 clip: ... Use the motion-graphics and cinematic-camera skills.\""
