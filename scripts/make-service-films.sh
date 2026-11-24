#!/usr/bin/env bash
# A different film for every service page.
#
# All six service pages shared one film, which made them feel like one page
# with the words swapped. Each now gets its own cut, built from the plates
# that actually show that discipline: scaffolds and towers for building work,
# road crews and spans for civil engineering, drawings and site managers for
# the management services.
#
# Same grammar as the other page films — a side-to-side pan over three plates,
# alternating direction, graded to match. The pan is a FRACTION of the
# available overscan, never a pixel offset, so it survives any plate shape.
#
# The third argument of clip() is the vertical seat: 0 is the top of the
# plate, 0.5 the middle. Anything with a face in it sits high, because a
# cropped head is the one mistake a viewer always notices.
#
# ONLY LANDSCAPE PLATES BELONG HERE. A portrait plate scaled to fill a 16:9
# frame loses about three quarters of its height, so whatever the vertical
# seat says, the crop lands somewhere arbitrary — on the first cut of these
# films that meant a hard hat with the face below the frame. Every plate
# below is at least 1.4:1 and at least 1200px wide.
#
# The refurbishment and property-development plates were generated for these
# two films: the library is heavily mining and civil, and had nothing showing
# an occupied building mid-refurbishment or a finished mixed-use development.
# Both films were borrowing abstract and industrial plates that did not match
# the page they sat on.
set -e

SRC=/c/Users/babso/Desktop/dareweb/public
OUT=$SRC/video
POSTERS=$SRC/posters
mkdir -p "$OUT" "$POSTERS"

DUR=6; XF=1.0; FPS=25; W=1600; H=900
OVER=1950        # gentle overscan: enough room to pan, little enough
                 # that the crop keeps ~70% of the plate's height

clip () {
  local idx=$1 dir=$2 vy=${3:-0.5}
  echo "[${idx}:v]scale=${OVER}:${H}:force_original_aspect_ratio=increase,\
crop=${W}:${H}:'(iw-${W})*(${dir}+(1-2*${dir})*t/${DUR})':'(ih-${H})*${vy}',\
fps=${FPS},setsar=1,format=yuv420p[v${idx}];"
}

GRADE="eq=contrast=1.05:saturation=0.92:brightness=-0.01,\
colorbalance=rs=-0.02:bs=0.035,vignette=angle=PI/5.6,unsharp=5:5:0.26:5:5:0.0"

build () {
  local name=$1 a=$2 b=$3 c=$4 v1=$5 v2=$6 v3=$7
  local F
  F="$(clip 0 0 $v1)$(clip 1 1 $v2)$(clip 2 0 $v3)"
  F="${F}[v0][v1]xfade=transition=fade:duration=${XF}:offset=5[x1];"
  F="${F}[x1][v2]xfade=transition=fade:duration=${XF}:offset=10[x2];"
  F="${F}[x2]${GRADE}[vout]"

  ffmpeg -y -loglevel error \
    -loop 1 -t $DUR -i "$a" -loop 1 -t $DUR -i "$b" -loop 1 -t $DUR -i "$c" \
    -filter_complex "$F" -map "[vout]" \
    -an -c:v libx264 -profile:v high -preset veryslow -crf 27 \
    -pix_fmt yuv420p -movflags +faststart -g 48 "$OUT/$name.mp4"

  ffmpeg -y -loglevel error -ss 2 -i "$OUT/$name.mp4" -frames:v 1 -q:v 4 \
    -vf "scale=1280:-2" "$POSTERS/$name.jpg"

  printf '  %-34s %5sKB  poster %3sKB\n' "$name.mp4" \
    "$(( $(stat -c%s "$OUT/$name.mp4") / 1024 ))" \
    "$(( $(stat -c%s "$POSTERS/$name.jpg") / 1024 ))"
}

L=$SRC/lkmd; S=$SRC/sectors; D=$SRC/disciplines

#     film name                       plate A                        plate B                      plate C                              vertical seats
#  People plates sit high (0.08-0.18); landscape and architecture are free to
#  sit nearer the middle.
build svc-building-construction       $S/sector-building.jpg         $L/site-team.jpg             $L/crane-sunset.jpg                  0.42 0.10 0.26
build svc-civil-structural            $D/roads-earthworks.jpg        $S/sector-transport.jpg      $D/building-civil-engineering.jpg    0.46 0.40 0.42
build svc-refurbishment               $L/refurb-interior.jpg         $L/refurb-facade.jpg         $L/concrete.jpg                      0.42 0.40 0.44
build svc-construction-management     $L/team-lineup.jpg             $L/drawings.jpg              $S/hero-safety.jpg                   0.08 0.45 0.34
build svc-design-and-construct        $S/hero-services.jpg           $L/handshake.jpg             $S/hero-projects.jpg                 0.38 0.16 0.36
build svc-property-development        $L/development-mixeduse.jpg    $L/development-handover.jpg  $L/skybridge.jpg                     0.40 0.40 0.38

echo "done."
