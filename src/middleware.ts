import createMiddleware from 'next-intl/middleware';
  
export default createMiddleware({
	locales: ['en', 'id'],
	defaultLocale: 'en',
	// localePrefix: 'never',
	localeDetection: false,
	// domains: [
	// 	{
	// 		domain: 'localhost',
	// 		defaultLocale: 'en',
	// 		locales: ['en'],
	// 	},
	// 	{
	// 		domain: 'id.localhost',
	// 		defaultLocale: 'id',
	// 		locales: ['id'],
	// 	},
	// ],
});

export const config = {
	matcher: ['/', '/(id|en)/:path*']
};