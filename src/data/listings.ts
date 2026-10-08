import data from './listings.json';

export type Listing = (typeof data.listings)[number];

export const listings: Listing[] = data.listings;
export const categories = data.categories;

const byId = new Map(listings.map((l) => [l.id, l]));

// Accepts listing ids ("4544984469") or Etsy links ("https://www.etsy.com/listing/4544984469/black-cat...").
export function listingId(ref: string): string {
  return ref.match(/listing\/(\d+)/)?.[1] ?? ref.trim();
}

export function getListings(refs: string[]): Listing[] {
  return refs.map((ref) => byId.get(listingId(ref))).filter((l): l is Listing => Boolean(l));
}
