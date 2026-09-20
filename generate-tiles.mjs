import sharp from 'sharp';
import { rmSync, existsSync } from 'node:fs';

const [, , src, outDir, qualityArg, bgArg] = process.argv;
if (!src || !outDir) {
    console.error('Usage: node generate-tiles.mjs <sourceImage> <outDir> [quality] [r,g,b]');
    process.exit(1);
}

const quality = Number(qualityArg) || 80;

// The square-pyramid area outside the 18300x24900 image is filled with this colour. Pass the source's
// deep-ocean colour so the padding blends into the sea instead of showing white blocks.
const [r, g, b] = (bgArg ?? '25,40,59').split(',').map(Number);
const background = { r, g, b, alpha: 1 };

if (existsSync(outDir)) {
    rmSync(outDir, { recursive: true, force: true });
}

sharp.cache(false);
sharp.concurrency(Math.max(1, (await import('node:os')).cpus().length - 1));

const start = Date.now();
await sharp(src, { limitInputPixels: false })
    .webp({ quality, effort: 4 })
    // skipBlanks: -1 keeps every tile. The google layout otherwise drops tiles that match the background,
    // which would punch holes in the open ocean (uniform sea == our ocean fill colour).
    .tile({ size: 256, layout: 'google', background, skipBlanks: -1 })
    .toFile(outDir);

const secs = ((Date.now() - start) / 1000).toFixed(1);
console.log(`done: ${outDir} in ${secs}s`);
