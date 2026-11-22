#!/usr/bin/env bash
# Grade and install the generated photography into public/.
#
# The generated plates arrive warm (golden hour, sodium work lights) and the
# real site photographs are cool midday. A light unifying pass — not a heavy
# one — pulls them close enough to sit in the same grid without flattening the
# warmth that makes the generated frames look photographed rather than drawn.
#
# Source: scratchpad gen/ tree produced by gen_all.py. Pass the path as $1.
set -e

GEN=${1:?usage: install-generated-media.sh <path-to-gen-dir>}
PUB=/c/Users/babso/Desktop/dareweb/public
mkdir -p "$PUB/disciplines" "$PUB/sectors"

# Light unifying grade: hold the warmth, lift contrast a touch, cool the
# shadows slightly so blacks sit against the navy UI rather than fighting it.
GRADE="eq=contrast=1.05:saturation=0.92:brightness=-0.008,\
colorbalance=rs=-0.02:bs=0.035:rm=0.01,\
unsharp=5:5:0.3:5:5:0.0"

install_one () {
  local src=$1 dest=$2 w=$3
  [ -f "$src" ] || { echo "  missing $src"; return 0; }
  ffmpeg -y -loglevel error -i "$src" \
    -vf "scale=${w}:-2:flags=lanczos,${GRADE}" -q:v 4 "$dest"
  printf '  %-52s %s\n' "$(basename "$dest")" "$(du -h "$dest" | cut -f1)"
}

echo "disciplines (1600px):"
for n in building-civil-engineering roads-earthworks mining-infrastructure \
         processing-beneficiation water-bulk-services mechanical-electrical; do
  install_one "$GEN/disciplines/$n.jpg" "$PUB/disciplines/$n.jpg" 1600
done

echo "sectors (1600px):"
for n in sector-mining sector-water sector-transport sector-building; do
  install_one "$GEN/sectors/$n.jpg" "$PUB/sectors/$n.jpg" 1600
done

echo "hero stills (1920px):"
for n in hero-1-pit hero-2-headgear hero-3-plant; do
  install_one "$GEN/hero/$n.jpg" "$PUB/sectors/$n.jpg" 1920
done

echo "done."
