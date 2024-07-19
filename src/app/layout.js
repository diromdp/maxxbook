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
  title: 'Maxibook - Get millions of documents you need here',
  manifest: '/manifest.json',
  description: 'Maxibook is place to find documents or materials than can help to solve your problem',
  openGraph: {
    title: `Maxibook - Get millions of documents you need here`,
    description: `Get millions of documents you need here from a global community, share information, and find inspiration`,
    images: '/image/og-image.png',
  },
  twitter: {
    title: `Maxibook - Get millions of documents you need here`,
    description: `Get millions of documents you need here from a global community, share information, and find inspiration`,
    card: `summary_large_image`,
    image: '/image/og-image.png',
  },
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
      { url: '/icon/favicon-16x16.png', sizes: '16x16' },
      { url: '/icon/favicon-32x32.png', sizes: '32x32' },
      { url: '/icon/favicon-96x96.png', sizes: '96x96' },
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
  return (
    <>
      <html lang="en">
        <body className={`${monst.variable} ${roboto.variable} ${league.variable}`}>
          {children}
        </body>
        <GoogleAnalytics gaId={'G-778ZK1T3GN'} />
      </html>
    </>

  )
}
