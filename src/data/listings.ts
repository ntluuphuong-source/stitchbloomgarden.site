import data from './listings.json';

export type Listing = (typeof data.listings)[number];

export const listings: Listing[] = data.listings;
export const categories = data.categories;

const byId = new Map(listings.map((l) => [l.id, l]));

export function getListings(ids: string[]): Listing[] {
  return ids.map((id) => byId.get(id)).filter((l): l is Listing => Boolean(l));
}
