const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const sharp = require('sharp');

async function main() {
  const tracked = execFileSync('git', ['ls-files'], { encoding: 'utf8' }).trim().split('\n');
  const sources = tracked.filter(f => /^src\/.*\.(tsx?|css)$/.test(f));
  const sourceText = sources.map(f => fs.readFileSync(f, 'utf8')).join('\n');
  const images = tracked.filter(f => f.startsWith('public/images/') && /\.(png|webp)$/i.test(f));
  const replacements = [];
  let before = 0, after = 0;
  for (const file of images) {
    const size = fs.statSync(file).size;
    if (size < 500000) continue;
    const isPng = file.endsWith('.png');
    if (isPng && !sourceText.includes(path.basename(file))) continue;
    const input = fs.readFileSync(file);
    const metadata = await sharp(input).metadata();
    if ((metadata.pages || 1) > 1) continue;
    const output = file.replace(/\.png$/, '.webp');
    let buffer;
    for (const quality of [84, 78, 72]) {
      buffer = await sharp(input).rotate().resize({ width: 2400, height: 2400, fit: 'inside', withoutEnlargement: true }).webp({ quality, effort: 6 }).toBuffer();
      if (buffer.length < 950000) break;
    }
    if (buffer.length >= size) continue;
    fs.writeFileSync(output, buffer);
    if (isPng) replacements.push([path.basename(file), path.basename(output)]);
    before += size; after += buffer.length;
    const checked = await sharp(output).metadata();
    console.log(`${output}: ${size} -> ${buffer.length} bytes; ${checked.width}x${checked.height}`);
  }
  // Mechanical extension replacements only; preserve surrounding page content.
  for (const file of sources) {
    const original = fs.readFileSync(file, 'utf8');
    let updated = original;
    for (const [from, to] of replacements) updated = updated.split(from).join(to);
    if (updated !== original) fs.writeFileSync(file, updated);
  }
  console.log(JSON.stringify({ before, after, reductionPercent: Math.round((1 - after / before) * 100) }));
}
main().catch(error => { console.error(error); process.exitCode = 1; });
