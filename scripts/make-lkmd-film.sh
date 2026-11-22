#!/usr/bin/env bash
# A second film, cut from LKMD's own brand photography.
#
# Same technique as the hero: each plate scaled to full frame width with the
# camera drifting through it, a slow push on top, cross-dissolves, and one
# grade across the cut so five separate images read as one sequence.
set -e
SRC=/c/Users/babso/Desktop/dareweb/public/lkmd
OUT=/c/Users/babso/Desktop/dareweb/public/video
mkdir -p "$OUT"
DUR=6; XF=1.0; FPS=25; W=1600; H=900

clip () {
  local idx=$1 y0=$2 y1=$3
  echo "[${idx}:v]scale=w='${W}*(1+0.05*t/${DUR})':h=-2:eval=frame,\
crop=${W}:${H}:(iw-${W})/2:'max(0\,min(ih-${H}\,${y0}+(${y1}-${y0})*t/${DUR}))',\
fps=${FPS},setsar=1,format=yuv420p[v${idx}];"
}

F="$(clip 0 400 60)$(clip 1 260 620)$(clip 2 500 120)$(clip 3 180 540)$(clip 4 420 90)"
F="${F}[v0][v1]xfade=transition=fade:duration=${XF}:offset=5[x1];"
F="${F}[x1][v2]xfade=transition=fade:duration=${XF}:offset=10[x2];"
F="${F}[x2][v3]xfade=transition=fade:duration=${XF}:offset=15[x3];"
F="${F}[x3][v4]xfade=transition=fade:duration=${XF}:offset=20[x4];"
F="${F}[x4]eq=contrast=1.05:saturation=0.9:brightness=-0.012,\
colorbalance=rs=-0.03:bs=0.05,vignette=angle=PI/5.4,unsharp=5:5:0.28:5:5:0.0[vout]"

ffmpeg -y -loglevel error \
  -loop 1 -t $DUR -i "$SRC/concrete.jpg" \
  -loop 1 -t $DUR -i "$SRC/site-team.jpg" \
  -loop 1 -t $DUR -i "$SRC/tower.jpg" \
  -loop 1 -t $DUR -i "$SRC/crane-sunset.jpg" \
  -loop 1 -t $DUR -i "$SRC/skybridge.jpg" \
  -filter_complex "$F" -map "[vout]" \
  -an -c:v libx264 -profile:v high -preset slower -crf 27 \
  -pix_fmt yuv420p -movflags +faststart -g 50 "$OUT/lkmd.mp4"

ffmpeg -y -loglevel error -i "$OUT/lkmd.mp4" -frames:v 1 -q:v 3 \
  /c/Users/babso/Desktop/dareweb/public/lkmd-poster.jpg

ls -la "$OUT/lkmd.mp4"
ffprobe -v error -show_entries format=duration -show_entries stream=width,height \
  -of default=noprint_wrappers=1 "$OUT/lkmd.mp4"
