#!/usr/bin/env bash
# The home hero film, cut from LKMD's own photography.
#
# The camera move is expressed as a FRACTION of the available overscan, not a
# pixel offset. Pixel offsets broke the moment the plates were upscaled: a
# value that used to sit mid-frame clamped to the bottom of the taller image
# and sliced the tops off people's heads.
#
# Fraction 0 is the top of the plate, 1 is the bottom. Anything with faces in
# it is anchored near the top and barely moves, because a head leaving frame
# is far more noticeable than a static shot.
set -e

SRC=/c/Users/babso/Desktop/dareweb/public/lkmd
OUT=/c/Users/babso/Desktop/dareweb/public/video
mkdir -p "$OUT"

DUR=6; XF=1.0; FPS=25; W=1600; H=900

# $2,$3 = start and end fraction of the vertical travel.
clip () {
  local idx=$1 f0=$2 f1=$3
  echo "[${idx}:v]scale=w='${W}*(1+0.05*t/${DUR})':h=-2:eval=frame,\
crop=${W}:${H}:(iw-${W})/2:'(ih-${H})*(${f0}+(${f1}-${f0})*t/${DUR})',\
fps=${FPS},setsar=1,format=yuv420p[v${idx}];"
}

GRADE="eq=contrast=1.05:saturation=0.9:brightness=-0.012,\
colorbalance=rs=-0.03:bs=0.05,vignette=angle=PI/5.4,unsharp=5:5:0.28:5:5:0.0"

#        plate            start  end    why
#  0  concrete        0.55 → 0.10  abstract, free to travel
#  1  site-team       0.02 → 0.14  THREE PEOPLE: stay at the top, barely move
#  2  tower           0.55 → 0.08  crane rises, so climb it
#  3  crane-sunset    0.15 → 0.45  figures sit high in frame
#  4  skybridge       0.25 → 0.55  architecture, free to travel
F="$(clip 0 0.55 0.10)$(clip 1 0.02 0.14)$(clip 2 0.55 0.08)$(clip 3 0.15 0.45)$(clip 4 0.25 0.55)"
F="${F}[v0][v1]xfade=transition=fade:duration=${XF}:offset=5[x1];"
F="${F}[x1][v2]xfade=transition=fade:duration=${XF}:offset=10[x2];"
F="${F}[x2][v3]xfade=transition=fade:duration=${XF}:offset=15[x3];"
F="${F}[x3][v4]xfade=transition=fade:duration=${XF}:offset=20[x4];"
F="${F}[x4]${GRADE}[vout]"

ffmpeg -y -loglevel error \
  -loop 1 -t $DUR -i "$SRC/concrete.jpg" \
  -loop 1 -t $DUR -i "$SRC/site-team.jpg" \
  -loop 1 -t $DUR -i "$SRC/tower.jpg" \
  -loop 1 -t $DUR -i "$SRC/crane-sunset.jpg" \
  -loop 1 -t $DUR -i "$SRC/skybridge.jpg" \
  -filter_complex "$F" -map "[vout]" \
  -an -c:v libx264 -profile:v high -preset veryslow -crf 27 \
  -pix_fmt yuv420p -movflags +faststart -g 48 "$OUT/lkmd.mp4"

ffmpeg -y -loglevel error -ss 7 -i "$OUT/lkmd.mp4" -frames:v 1 -q:v 3 \
  /c/Users/babso/Desktop/dareweb/public/lkmd-poster.jpg

printf '  lkmd.mp4  %s KB\n' "$(( $(stat -c%s "$OUT/lkmd.mp4") / 1024 ))"
