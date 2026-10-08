// Everything you are likely to change about the site lives here.

export const SITE = {
  name: 'StitchBloomGarden',
  domain: 'stitchbloomgarden.site',
  tagline: 'Funny, cozy and a little bit spooky cross stitch patterns',
  description:
    'Free cross stitch patterns, stitching tips and modern PDF patterns from StitchBloomGarden: sassy cats, cozy seasons, faith and nature designs.',
  email: '', // e.g. 'hello@stitchbloomgarden.site' (shown in the footer when set)
};

// Tag on every Etsy link so visits from this site show up in Etsy Stats.
export const UTM = 'utm_source=stitchbloomgarden.site&utm_medium=referral&utm_campaign=website';

export const SHOPS = {
  StitchBloomGarden: {
    name: 'StitchBloomGarden',
    url: 'https://www.etsy.com/shop/StitchBloomGarden',
    blurb: 'Sassy black cats, funny quotes, faith and cozy nature patterns.',
  },
  NyNaCrossStitch: {
    name: 'NyNaCrossStitch',
    url: 'https://www.etsy.com/shop/NyNaCrossStitch',
    blurb: 'Spooky-cute Halloween, Christmas samplers and woodland friends.',
  },
} as const;

// Listing ids shown under "Stitchers' favorites" on the home page.
export const FEATURED_IDS = [
  '4544984469', // Funny Black Cat Peeking
  '4557483906', // Five Coffees Later
  '4553655771', // Funny Orange Hugging Grey Cat
  '4531398514', // The Lord is My Shepherd
  '4565464081', // I Will Succeed Because I Am Insane
  '4488842677', // Coffee Diver
  '4579004984', // Red Truck Christmas Tree
  '4510600528', // Are You Pooping
];

// Email signup. Paste the form action URL from Kit or MailerLite here to turn the form on.
// Kit: Grow > Landing Pages & Forms > your form > Publish > HTML, copy the <form action="..."> URL.
// MailerLite: Forms > Embedded forms > your form > HTML code, copy the <form action="..."> URL.
// The form posts a field named "email_address" (Kit) or "fields[email]" (MailerLite); set NEWSLETTER.field to match.
export const NEWSLETTER = {
  action: '',
  field: 'email_address',
};

export function etsyLink(url: string): string {
  return url + (url.includes('?') ? '&' : '?') + UTM;
}
