#!/usr/bin/env bash
# Assemble the hero film from the three generated motion clips.
#
# Each clip arrives as 5s of 1280x720 at whatever bitrate the generator chose,
# with its own slightly different white balance. This pass upscales to 1080p,
# applies ONE grade across all three so the cut reads as a single shoot, and
# cross-dissolves between them. The result loops, so the last frame is faded
# toward the first.
#
# Usage: make-hero-film.sh <dir-with-clips>
set -e

CLIPS=${1:?usage: make-hero-film.sh <dir containing hero-1-pit.mp4 etc>}
OUT=/c/Users/babso/Desktop/dareweb/public/video
POSTER=/c/Users/babso/Desktop/dareweb/public/hero-poster.jpg
mkdir -p "$OUT"

XF=1.0           # cross-dissolve
W=1920
H=1080
FPS=25

for n in hero-1-pit hero-2-headgear hero-3-plant; do
  [ -f "$CLIPS/$n.mp4" ] || { echo "missing $CLIPS/$n.mp4"; exit 1; }
done

# Per-clip normalise: scale to 1080p, pad any odd ratio, lock fps and sar.
norm () {
  echo "[${1}:v]scale=${W}:${H}:force_original_aspect_ratio=increase,\
crop=${W}:${H},fps=${FPS},setsar=1,format=yuv420p[v${1}];"
}

# Durations differ by a frame or two between generations; read the real one
# off the first clip so the xfade offsets cannot drift.
D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$CLIPS/hero-1-pit.mp4")
D=${D%.*}
OFF1=$(awk "BEGIN{print $D - $XF}")
OFF2=$(awk "BEGIN{print 2*$D - 2*$XF}")

FILTER="$(norm 0)$(norm 1)$(norm 2)"
FILTER="${FILTER}[v0][v1]xfade=transition=fade:duration=${XF}:offset=${OFF1}[x1];"
FILTER="${FILTER}[x1][v2]xfade=transition=fade:duration=${XF}:offset=${OFF2}[x2];"
# One grade for the whole cut — cool the shadows toward the navy UI, hold the
# warmth in the highlights, close the corners slightly.
FILTER="${FILTER}[x2]eq=contrast=1.06:saturation=0.86:brightness=-0.015,\
colorbalance=rs=-0.035:gs=-0.01:bs=0.06:rm=0.015:bm=0.02,\
vignette=angle=PI/5.4,unsharp=5:5:0.3:5:5:0.0[vout]"

ffmpeg -y -loglevel error \
  -i "$CLIPS/hero-1-pit.mp4" \
  -i "$CLIPS/hero-2-headgear.mp4" \
  -i "$CLIPS/hero-3-plant.mp4" \
  -filter_complex "$FILTER" -map "[vout]" \
  -an -c:v libx264 -profile:v high -preset slower -crf 25 \
  -pix_fmt yuv420p -movflags +faststart -g 50 \
  "$OUT/hero.mp4"

ffmpeg -y -loglevel error -i "$OUT/hero.mp4" -frames:v 1 -q:v 3 "$POSTER"

ls -la "$OUT/hero.mp4" "$POSTER"
ffprobe -v error -show_entries format=duration,size -show_entries stream=width,height \
  -of default=noprint_wrappers=1 "$OUT/hero.mp4"
