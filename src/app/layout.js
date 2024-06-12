import { Roboto, Montserrat, League_Spartan } from 'next/font/google';
import { BaseUrl } from '../lib/constant';
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
}

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <body className={`${monst.variable} ${roboto.variable} ${league.variable}`}>
          {children}
        </body>
      </html>
    </>
    
  )
}
