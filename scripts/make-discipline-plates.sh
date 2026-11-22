#!/usr/bin/env bash
# SUPERSEDED. The six discipline plates are now generated infrastructure
# photography (see CONTENT-TODO.md). Running this script OVERWRITES them with
# crops of the site photographs. Kept only as the record of how the grid was
# filled before generated imagery was available.
#
# Six discipline plates cut from the same site shoot.
#
# There are only three source photographs, so the grid repeated itself badly.
# Rather than show the same frame six times, each discipline gets its own crop
# of the shoot — structure, ground, portal, crew, gate, detail — at 4:3 and
# under one grade, so six different crops still read as one body of work.
set -e

SRC=/c/Users/babso/Desktop/dareweb/public
OUT=$SRC/disciplines
mkdir -p "$OUT"

# Source plates are 960x1280 portrait.
GRADE="eq=contrast=1.08:saturation=0.78:brightness=-0.015,\
colorbalance=rs=-0.04:bs=0.06,unsharp=5:5:0.4:5:5:0.0"

cut () {
  local src=$1 name=$2 crop=$3
  ffmpeg -y -loglevel error -i "$SRC/$src" \
    -vf "crop=${crop},scale=1280:960:flags=lanczos,${GRADE}" \
    -q:v 3 "$OUT/${name}.jpg"
}

#            source               name                       w:h:x:y
cut hero-headgear.jpg   building-civil-engineering  640:480:150:180   # concrete face and structure
cut hero-headgear.jpg   roads-earthworks            960:720:0:560     # apron, rail and barriers
cut team-site-visit.jpg mining-infrastructure       800:600:80:230    # headgear above the crew
cut hero-headgear.jpg   processing-beneficiation    560:420:340:420   # the portal opening
cut site-access-ppe.jpg water-bulk-services         600:450:300:120   # gate line and perimeter
cut team-site-visit.jpg mechanical-electrical       760:570:100:600   # crew at the collar

ls -la "$OUT"
