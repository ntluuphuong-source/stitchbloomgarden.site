// Values people edit live in src/data/settings.json (editable in Pages CMS under "Site settings").
import settings from './data/settings.json';

export const SITE = {
  name: 'StitchBloomGarden',
  domain: 'stitchbloomgarden.site',
  tagline: settings.tagline,
  description: settings.description,
  email: settings.email,
};

// Tag on every Etsy link so visits from this site show up in Etsy Stats.
export const UTM = 'utm_source=stitchbloomgarden.site&utm_medium=referral&utm_campaign=website';

export const SHOPS = {
  StitchBloomGarden: {
    name: 'StitchBloomGarden',
    url: 'https://www.etsy.com/shop/StitchBloomGarden',
    blurb: settings.stitchBloomGardenBlurb,
  },
  NyNaCrossStitch: {
    name: 'NyNaCrossStitch',
    url: 'https://www.etsy.com/shop/NyNaCrossStitch',
    blurb: settings.nynaBlurb,
  },
} as const;

// Etsy links (or listing ids) shown under "Stitchers' favorites" on the home page.
export const FEATURED = settings.featured;

// Email signup: the <form action="..."> URL from Kit or MailerLite. Empty shows a "Follow the shop" button instead.
// The email field is named "email_address" on Kit and "fields[email]" on MailerLite.
export const NEWSLETTER = {
  action: settings.newsletterAction,
  field: settings.newsletterField || 'email_address',
};

export function etsyLink(url: string): string {
  return url + (url.includes('?') ? '&' : '?') + UTM;
}
