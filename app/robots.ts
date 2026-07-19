import type { MetadataRoute } from 'next';

const siteUrl = 'https://joblens.vercel.app';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      disallow: '/',
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
