import type { MetadataRoute } from 'next';

const siteUrl = 'https://job-lens-xi.vercel.app';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      disallow: '/',
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
