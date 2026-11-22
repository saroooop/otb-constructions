#!/usr/bin/env bash
# A film for every page banner, cut from LKMD's own photography.
#
# The camera tracks SIDE TO SIDE, not up and down. A horizontal move reads as
# a dolly past a subject, which suits a site, a skyline or a line of people;
# drifting vertically up a wall reads as a tilt and felt wrong on these plates.
#
# The pan is expressed as a FRACTION of the available overscan rather than in
# pixels, so it works whatever shape the plate is — a portrait and a landscape
# both pan their full width without the crop ever falling outside the frame.
#
# No text is burned in. The page overlays its own headline as live HTML, which
# stays sharp at any resolution, reflows on a phone, can be read by a screen
# reader, and can be edited without a re-render.
set -e

SRC=/c/Users/babso/Desktop/dareweb/public/lkmd
OUT=/c/Users/babso/Desktop/dareweb/public/video
POSTERS=/c/Users/babso/Desktop/dareweb/public/posters
mkdir -p "$OUT" "$POSTERS"

DUR=6; XF=1.0; FPS=25; W=1600; H=900
OVER=2240        # scale to this width so there is room to travel

# $2 = 0 pans left-to-right, 1 pans right-to-left. Alternating them stops the
# cut feeling like one long drag in a single direction.
clip () {
  local idx=$1 dir=$2
  echo "[${idx}:v]scale=${OVER}:${H}:force_original_aspect_ratio=increase,\
crop=${W}:${H}:'(iw-${W})*(${dir}+(1-2*${dir})*t/${DUR})':(ih-${H})/2,\
fps=${FPS},setsar=1,format=yuv420p[v${idx}];"
}

GRADE="eq=contrast=1.05:saturation=0.92:brightness=-0.01,\
colorbalance=rs=-0.02:bs=0.035,vignette=angle=PI/5.6,unsharp=5:5:0.26:5:5:0.0"

build () {
  local name=$1 a=$2 b=$3 c=$4
  local F
  F="$(clip 0 0)$(clip 1 1)$(clip 2 0)"
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

  ffmpeg -y -loglevel error -ss 2 -i "$OUT/$name.mp4" -frames:v 1 -q:v 4 \
    -vf "scale=1280:-2" "$POSTERS/$name.jpg"
  printf '  %-12s %5sKB  poster %3sKB\n' "$name.mp4" \
    "$(( $(stat -c%s "$OUT/$name.mp4") / 1024 ))" \
    "$(( $(stat -c%s "$POSTERS/$name.jpg") / 1024 ))"
}

#     name       plate A            plate B              plate C
build services   site-team          engineers-laptop     skybridge
build safety     helmet             team-lineup          hivis
build careers    engineers-laptop   team-lineup          engineer-orange
build structure  turbines           team-lineup          handshake
build projects   tower              concrete             crane-sunset
build cares      children           community-workshop   turbines

echo "done."
