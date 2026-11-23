#!/usr/bin/env bash
# The mining film: a haul road, a headgear and a processing plant, in motion.
#
# Unlike every other film on the site, this one is NOT a ken-burns move over a
# still. The three source clips carry real motion — the truck actually drives,
# the sheave wheels actually turn — so there is no camera move to synthesise
# here. The only jobs are to join them and to grade them to match the rest of
# the site.
#
# The haul road leads, because that truck climbing the escarpment is the shot
# the page is built around.
#
# Rendered at the clips' native 1280x720. Upscaling to 1600x900 to match the
# other films would only soften real detail and add weight for nothing — the
# plate is full-width CSS cover either way, so what shows is sharpness, not
# the pixel count.
set -e

SRC=${1:?pass the directory holding the three clips}
OUT=/c/Users/babso/Desktop/dareweb/public/video
POSTERS=/c/Users/babso/Desktop/dareweb/public/posters
mkdir -p "$OUT" "$POSTERS"

XF=1.0; FPS=25; W=1280; H=720

norm () { echo "[$1:v]fps=${FPS},scale=${W}:${H},setsar=1,format=yuv420p[v$1];"; }

GRADE="eq=contrast=1.05:saturation=0.92:brightness=-0.01,\
colorbalance=rs=-0.02:bs=0.035,vignette=angle=PI/5.6,unsharp=5:5:0.26:5:5:0.0"

F="$(norm 0)$(norm 1)$(norm 2)"
F="${F}[v0][v1]xfade=transition=fade:duration=${XF}:offset=4[x1];"
F="${F}[x1][v2]xfade=transition=fade:duration=${XF}:offset=8[x2];"
F="${F}[x2]${GRADE}[vout]"

ffmpeg -y -loglevel error \
  -i "$SRC/roads-earthworks.mp4" \
  -i "$SRC/mining-infrastructure.mp4" \
  -i "$SRC/processing-beneficiation.mp4" \
  -filter_complex "$F" -map "[vout]" \
  -an -c:v libx264 -profile:v high -preset veryslow -crf 25 \
  -pix_fmt yuv420p -movflags +faststart -g 48 "$OUT/mining.mp4"

# Poster taken from the first second, while the truck is still on the road.
ffmpeg -y -loglevel error -ss 1 -i "$OUT/mining.mp4" -frames:v 1 -q:v 3 \
  -vf "scale=1280:-2" "$POSTERS/mining.jpg"

printf '  mining.mp4  %sKB   poster %sKB\n' \
  "$(( $(stat -c%s "$OUT/mining.mp4") / 1024 ))" \
  "$(( $(stat -c%s "$POSTERS/mining.jpg") / 1024 ))"
