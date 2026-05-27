#!/usr/bin/env bash
# =====================================================================
# DES SME 2012 Slide Rescue Script
# Run this ON YOUR OWN COMPUTER (not Claude) while desglobal.com is live
# It will download all slide images into images/sme2012/
# =====================================================================

OUTDIR="$(dirname "$0")/images/sme2012"
mkdir -p "$OUTDIR"

echo ""
echo "=== DES SME 2012 Slide Downloader ==="
echo "Saving slides to: $OUTDIR"
echo ""

SAVED=0
for i in $(seq 0 60); do
  URL="https://www.desglobal.com/presentations/SME%202012/img${i}.jpg"
  OUTFILE="$OUTDIR/img${i}.jpg"

  HTTP_CODE=$(curl -s \
    -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
    -H "Referer: https://www.desglobal.com/sme2012.html" \
    --max-time 15 \
    -o "$OUTFILE" \
    -w "%{http_code}" \
    "$URL")

  if [ "$HTTP_CODE" = "200" ]; then
    SIZE=$(wc -c < "$OUTFILE" | tr -d ' ')
    echo "  ✓ Saved img${i}.jpg  (${SIZE} bytes)"
    SAVED=$((SAVED + 1))
  else
    rm -f "$OUTFILE"
    if [ "$HTTP_CODE" = "403" ] && [ $i -eq 0 ]; then
      echo ""
      echo "  ✗ Server returned 403 Forbidden on img0."
      echo "  The server may require browser cookies to access these files."
      echo ""
      echo "  MANUAL FALLBACK:"
      echo "  1. Open https://www.desglobal.com/presentations/SME%202012/img0.html in Chrome"
      echo "  2. Right-click the slide image → Save Image As → img0.jpg"
      echo "     into the folder: $OUTDIR"
      echo "  3. Repeat for img1.html, img2.html, ... until you get a 404"
      break
    else
      echo "  — img${i} not found (HTTP $HTTP_CODE), stopping."
      break
    fi
  fi
done

echo ""
if [ $SAVED -gt 0 ]; then
  echo "Done! $SAVED slide(s) saved to $OUTDIR"
  echo "The slide viewer on presentations.html is now active."
else
  echo "No slides could be auto-downloaded. See MANUAL FALLBACK above."
fi
echo ""
