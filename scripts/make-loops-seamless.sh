#!/usr/bin/env bash
# Make every film loop without a visible jump.
#
# All these films ended on a different plate from the one they opened on, so
# when the browser looped them the viewer saw a hard cut from the last frame
# straight back to the first. On a hero that plays forever it reads as the
# page bouncing.
#
# The fix is to dissolve the film's own tail back into its own head. Given a
# clip C of duration D and a crossfade of X:
#
#     out[0 .. X)    = C[D-X .. D]  dissolving into  C[0 .. X]
#     out[X .. D-X)  = C[X .. D-X]              (untouched)
#
# The result runs D-X and its last frame is C[D-X], which is exactly where
# its first frame starts from — so the join is invisible and the loop never
# lands on a cut. Frames at or after X are unchanged, so existing posters
# (taken at t=2) still match.
#
# Idempotent: a film already under LOOPED_TAG is skipped, so re-running this
# after rebuilding only one film does not keep shaving a second off the rest.
set -e

VID=/c/Users/babso/Desktop/dareweb/public/video
X=1.0                      # crossfade seconds, same as the cuts inside the films
LOOPED_TAG="seamless-loop"

for f in "$VID"/*.mp4; do
  name=$(basename "$f")

  if ffprobe -v error -show_entries format_tags=comment -of csv=p=0 "$f" | grep -q "$LOOPED_TAG"; then
    printf '  %-34s already seamless, skipped\n' "$name"; continue
  fi

  D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$f")
  DMX=$(python -c "print(f'{$D-$X:.3f}')")

  tmp="$VID/.$name.tmp.mp4"
  ffmpeg -y -loglevel error -i "$f" -filter_complex "
    [0:v]split=3[a][b][c];
    [a]trim=start=0:end=${X},setpts=PTS-STARTPTS[head];
    [b]trim=start=${DMX},setpts=PTS-STARTPTS[tail];
    [tail][head]blend=all_expr='A*(1-T/${X})+B*(T/${X})'[mix];
    [c]trim=start=${X}:end=${DMX},setpts=PTS-STARTPTS[rest];
    [mix][rest]concat=n=2:v=1:a=0[vout]" \
    -map "[vout]" -an -c:v libx264 -profile:v high -preset veryslow -crf 27 \
    -pix_fmt yuv420p -movflags +faststart -g 48 \
    -metadata comment="$LOOPED_TAG" "$tmp"

  mv -f "$tmp" "$f"
  printf '  %-34s %5.1fs -> %5.1fs  %5sKB\n' "$name" "$D" "$DMX" \
    "$(( $(stat -c%s "$f") / 1024 ))"
done

echo "done."
