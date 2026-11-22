#!/usr/bin/env bash
# A film for every page banner, cut from LKMD's own photography.
#
# No text is burned in. The page overlays its own headline as live HTML, which
# stays sharp at any resolution, reflows on a phone, can be read by a screen
# reader and can be edited without a re-render. Burned-in type does none of
# that. The films are the motion; the message stays in the markup.
#
# Each film is three plates: establish, people, detail — so every banner has
# the same rhythm even though the subjects differ.
set -e

SRC=/c/Users/babso/Desktop/dareweb/public/lkmd
OUT=/c/Users/babso/Desktop/dareweb/public/video
POSTERS=/c/Users/babso/Desktop/dareweb/public/posters
mkdir -p "$OUT" "$POSTERS"

DUR=6; XF=1.0; FPS=25; W=1600; H=900

# A plate scaled to full frame width with the camera drifting vertically
# through it, plus a slow push. The move that suits a tall subject.
clip () {
  local idx=$1 y0=$2 y1=$3
  echo "[${idx}:v]scale=w='${W}*(1+0.05*t/${DUR})':h=-2:eval=frame,\
crop=${W}:${H}:(iw-${W})/2:'max(0\,min(ih-${H}\,${y0}+(${y1}-${y0})*t/${DUR}))',\
fps=${FPS},setsar=1,format=yuv420p[v${idx}];"
}

GRADE="eq=contrast=1.05:saturation=0.9:brightness=-0.012,\
colorbalance=rs=-0.03:bs=0.05,vignette=angle=PI/5.4,unsharp=5:5:0.28:5:5:0.0"

# name | three plates | three vertical drifts
build () {
  local name=$1 a=$2 b=$3 c=$4 ya=$5 yb=$6 yc=$7
  local F
  F="$(clip 0 ${ya% *} ${ya#* })$(clip 1 ${yb% *} ${yb#* })$(clip 2 ${yc% *} ${yc#* })"
  F="${F}[v0][v1]xfade=transition=fade:duration=${XF}:offset=5[x1];"
  F="${F}[x1][v2]xfade=transition=fade:duration=${XF}:offset=10[x2];"
  F="${F}[x2]${GRADE}[vout]"

  ffmpeg -y -loglevel error \
    -loop 1 -t $DUR -i "$SRC/$a.jpg" \
    -loop 1 -t $DUR -i "$SRC/$b.jpg" \
    -loop 1 -t $DUR -i "$SRC/$c.jpg" \
    -filter_complex "$F" -map "[vout]" \
    -an -c:v libx264 -profile:v high -preset veryslow -crf 27 \
    -pix_fmt yuv420p -movflags +faststart -g 48 "$OUT/$name.mp4"

  ffmpeg -y -loglevel error -i "$OUT/$name.mp4" -frames:v 1 -q:v 3 "$POSTERS/$name.jpg"
  printf '  %-14s %6s KB\n' "$name.mp4" "$(( $(stat -c%s "$OUT/$name.mp4") / 1024 ))"
}

#      name        plate A        plate B           plate C          drifts
build services   site-team      tower             skybridge        "300 40"  "520 90"  "140 420"
build safety     helmet         hivis             engineer-white   "160 20"  "120 10"  "420 60"
build careers    engineer-orange engineer-white   site-team        "620 120" "480 90"  "250 30"
build structure  skybridge      concrete          highrise         "180 420" "380 60"  "520 90"
build projects   tower          concrete          crane-sunset     "500 80"  "340 40"  "160 20"

echo "done."
