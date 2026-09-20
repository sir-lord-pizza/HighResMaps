# HighResMaps

`18300x24900 px`, `0.5 m/px`.

**Regenerate:** `npm install` then `node generate-tiles.mjs <src.jpg> <outFolder> 80`

**Tile path order:** `{z}/{y}/{x}.webp` (row before column).

**Serve:** jsDelivr, pin to a commit SHA:
`https://cdn.jsdelivr.net/gh/MrPizza/HighResMaps@<sha>/day/{z}/{y}/{x}.webp`

**Leaflet calibration** (fixed by scale, zoom 0..7):
`ScaleX = ScaleY = 0.015625`, `CenterX = -X0*0.015625`, `CenterY = Y0*0.015625`.
`(X0, Y0)` = game coords at top-left pixel, solve from one known landmark:
`X0 = gameX - pxCol/2`, `Y0 = gameY + pxRow/2`. Bounds: X `X0..X0+9150`, Y `Y0-12450..Y0`.
