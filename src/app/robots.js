export default function robots() {
    return {
      rules: {
        userAgent: '*',
        allow: '/sitemap.xml',
        disallow: '/user/',
      },
      sitemap: 'https://maxibook.com/sitemap.xml',
    }
  }
  