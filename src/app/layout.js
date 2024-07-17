import { Roboto, Montserrat, League_Spartan } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import { use } from "react";
import { BaseUrl, urlAPI } from '../lib/constant';
import '@/app/scss/style.scss';
import '@wangeditor/editor/dist/css/style.css' // import css


const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
})
const monst = Montserrat({
  weight: ['700', '400', '500'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',

})
const league = League_Spartan({
  weight: ['700', '400', '500'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-league_spartan',

})

export const metadata = {
  title: 'Maxibook - All you can read anything',
  manifest: '/manifest.json',
  description: 'Maxibook is place to find documents or materials than can help to solve your problem',
  alternates: {
    canonical: BaseUrl,
    languages: {
      'en': '/en',
      'id': '/id',
    },
  },
  verification: {
    google: 'google',
    yandex: 'yandex',
    yahoo: 'yahoo',
    bing: 'bing',
  },
  icons: {
    icon: [
      { url: '/icon/favicon-16x16.png', sizes: '16x16'},
      { url: '/icon/favicon-32x32.png', sizes: '32x32'},
      { url: '/icon/favicon-96x96.png', sizes: '96x96'},
    ],
    shortcut: ['/icon/apple-icon.png'],
    apple: [
      { url: '/icon/apple-icon.png' },
      { url: '/icon/apple-icon-114x114.png', sizes: '114x114', type: 'image/png' },
      { url: '/icon/apple-icon-114x114.png', sizes: '114x114', type: 'image/png' },
      { url: '/icon/apple-icon-144x144.png', sizes: '144x144', type: 'image/png' },
      { url: '/icon/apple-icon-180x180.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/icon/apple-icon-precomposed.png',
      },
    ],
  },
  openGraph: {
    title: 'Maxibook - All you can read anything',
    description: 'Maxibook is place to find documents or materials than can help to solve your problem',
    url: 'https://maxibook.co',
    siteName: 'Next.js',
    images: [
      {
        url: 'https://maxibook.co/image/og-image.png', // Must be an absolute URL
        width: 1200,
        height: 630,
        alt: 'Maxibook Default Image'
      },
      {
        url: 'https://maxibook.co/image/og-image.png', // Must be an absolute URL
        width: 1800,
        height: 1600,
        alt: 'Maxibook Default Image'
      },
    ],
    twitter: {
      card: 'summary_large_image',
      title: 'Maxibook - All you can read anything',
      description: 'Maxibook is place to find documents or materials than can help to solve your problem',
      creator: '@maxibook',
      images: ['https://maxibook.co/image/og-image.png'], // Must be an absolute URL
    },
    locale: 'EN',
    type: 'website',
  },
}

async function getDetails() {
  const data = await fetch(`${urlAPI}backend/settings?keys=page.google_analytics`, {
     method: 'get',
     headers: {
        'Content-Type': 'application/json',
        'Accept': "application/json",
     },
  });
  return data.json()
}

export default function RootLayout({ children }) {
  const detailSEO = use(getDetails());
  const seletedGO = detailSEO.filter(x => x.key === 'page.google_analytics');
  return (
    <>
      <html lang="en">
        <body className={`${monst.variable} ${roboto.variable} ${league.variable}`}>
          {children}
        </body>
        <GoogleAnalytics gaId={seletedGO && seletedGO[0].value} />
      </html>
    </>
    
  )
}
