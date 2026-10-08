// Turns the Etsy listing exports in data/*.csv into src/data/listings.json.
// Re-run after replacing the CSVs with fresh exports: npm run import-listings
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';

// First match wins, so the narrow categories come first.
const CATEGORIES = [
  ['bookmarks', 'Bookmarks', /bookmark/i],
  ['christmas', 'Christmas', /christmas|santa|xmas|gnome|snowman|holiday|winter/i],
  ['halloween', 'Halloween & Spooky', /halloween|spooky|ghost|witch|gothic|skull|raven|haunted|demon|tarot|bat\b/i],
  ['faith', 'Faith', /christian|jesus|god|lord|bible|faith|religious|psalm/i],
  ['cats', 'Funny Cats', /\bcats?\b|kitten|kitty/i],
  ['funny', 'Funny Quotes', /funny|sarcas|sassy|snark|humor|meme/i],
  ['nature', 'Nature & Seasons', /landscape|mountain|forest|nature|botanical|flower|floral|plant|autumn|fall|ocean|bird|butterfly|deer/i],
];

function parseCsv(text) {
  const rows = [];
  let row = [], field = '', quoted = false;
  text = text.replace(/^﻿/, '');
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') quoted = false;
      else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ',') { row.push(field); field = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(field); field = '';
      if (row.some((v) => v !== '')) rows.push(row);
      row = [];
    } else field += c;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  const [header, ...body] = rows;
  return body.map((r) => Object.fromEntries(header.map((h, i) => [h.trim(), (r[i] ?? '').trim()])));
}

const FILLER = /\b(cross[ -]?stitch|pattern|pdf|xstitch|needlepoint|embroidery|chart|instant|digital|download|hand)\b/gi;

// "Black Cat Reading Cross Stitch Pattern | Reading PDF ..." -> "Black Cat Reading"
// "Owl Cross Stitch Pattern PDF, Brown Owl Xstitch, ..." -> "Owl, Brown Owl"
function shortTitle(title) {
  const parts = title.split(/\s[|–-]\s|,|\(/).map((p) => p.trim()).filter(Boolean);
  let name = parts[0].split(/\s*cross[ -]?stitch/i)[0].replace(/\s*(pattern|pdf)\s*$/i, '').trim();
  if (!name) return parts[0];
  if (!name.includes(' ') && parts[1]) {
    const extra = parts[1].replace(FILLER, '').replace(/\s+/g, ' ').trim();
    if (extra) name += `, ${extra}`;
  }
  return name;
}

const listings = [];
for (const file of readdirSync('data').filter((f) => f.endsWith('.csv')).sort()) {
  for (const r of parseCsv(readFileSync(`data/${file}`, 'utf8'))) {
    if (!r.listing_id || !r.url || !r.title) continue;
    if (/add-on service/i.test(r.title)) continue;
    const match = CATEGORIES.find(([, , re]) => re.test(r.title));
    listings.push({
      id: r.listing_id,
      shop: r.shop,
      title: r.title,
      name: shortTitle(r.title),
      url: r.url,
      // Etsy serves the same photo at 570px wide, which is plenty for a card.
      image: r.image_1.replace('il_fullxfull.', 'il_570xN.'),
      category: match ? match[0] : 'other',
    });
  }
}

const categories = [...CATEGORIES.map(([key, label]) => ({ key, label })), { key: 'other', label: 'More Patterns' }]
  .filter((c) => listings.some((l) => l.category === c.key));

writeFileSync('src/data/listings.json', JSON.stringify({ categories, listings }, null, 2) + '\n');
console.log(`listings.json: ${listings.length} listings, ${categories.length} categories`);
