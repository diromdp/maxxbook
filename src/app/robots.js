export default function robots() {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
        disallow: '/user/',
      },
      sitemap: 'https://maxibook.com/sitemap.xml',
    }
  }
  