#!/usr/bin/env bash
# SUPERSEDED by make-hero-film.sh, which assembles the hero from generated
# motion clips. Running this script OVERWRITES public/video/hero.mp4 with the
# photo-derived cut. Kept as the fallback route if the generated media is ever
# dropped and only the three site photographs remain.
#
# Cuts the hero film from the real site photographs.
#
# The plates are portrait phone shots, so a centre crop to 16:9 would throw
# away the headgear. Instead each plate is scaled to the full frame width and
# the camera drifts vertically through it — which is also the move that suits
# a 40-metre tower. A slow push is layered on top, then one cool grade across
# the whole cut so three different days read as one shoot.
set -e

SRC=/c/Users/babso/Desktop/dareweb/public
OUT=/c/Users/babso/Desktop/dareweb/public/video
mkdir -p "$OUT"

DUR=7            # seconds per plate
XF=1.2           # cross-dissolve
FPS=25
W=1920
H=1080

# plate | start-y | end-y   (y is the top of the 1080 window inside the 2560-tall scaled plate)
# tower wide  — drift UP the structure, finishing on the headgear
# team shot   — settle DOWN onto the crew
# gate / PPE  — slow drift up to faces
clip () {
  local idx=$1 y0=$2 y1=$3
  echo "[${idx}:v]scale=w='${W}*(1+0.055*t/${DUR})':h=-2:eval=frame,\
crop=${W}:${H}:(iw-${W})/2:'max(0\,min(ih-${H}\,${y0}+(${y1}-${y0})*t/${DUR}))',\
fps=${FPS},setsar=1,format=yuv420p[v${idx}];"
}

FILTER="$(clip 0 1100 180)$(clip 1 300 820)$(clip 2 600 180)"
FILTER="${FILTER}[v0][v1]xfade=transition=fade:duration=${XF}:offset=5.8[x1];"
FILTER="${FILTER}[x1][v2]xfade=transition=fade:duration=${XF}:offset=11.6[x2];"
# One grade for the whole cut: cool the shadows, pull saturation back off the
# hi-vis, hold contrast, and close the corners slightly.
FILTER="${FILTER}[x2]eq=contrast=1.07:saturation=0.74:brightness=-0.022,\
colorbalance=rs=-0.04:gs=-0.01:bs=0.07:rm=-0.02:bm=0.03,\
vignette=angle=PI/5.2,\
unsharp=5:5:0.35:5:5:0.0[vout]"

ffmpeg -y -loglevel error \
  -loop 1 -t $DUR -i "$SRC/hero-headgear.jpg" \
  -loop 1 -t $DUR -i "$SRC/team-site-visit.jpg" \
  -loop 1 -t $DUR -i "$SRC/site-access-ppe.jpg" \
  -filter_complex "$FILTER" -map "[vout]" \
  -an -c:v libx264 -profile:v high -preset slower -crf 27 \
  -pix_fmt yuv420p -movflags +faststart -g 50 \
  "$OUT/hero.mp4"

# Poster: the first frame, so the <video> has something to show while it loads.
ffmpeg -y -loglevel error -i "$OUT/hero.mp4" -frames:v 1 -q:v 3 "$SRC/hero-poster.jpg"

ls -la "$OUT/hero.mp4" "$SRC/hero-poster.jpg"
ffprobe -v error -show_entries format=duration,size -show_entries stream=width,height,codec_name -of default=noprint_wrappers=1 "$OUT/hero.mp4"
