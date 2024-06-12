import { Roboto, Montserrat, League_Spartan } from 'next/font/google';

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
  description: 'Maxibook is place to find documents or materials than can help to solve your problem',
  verification: {
    google: 'google',
    yandex: 'yandex',
    yahoo: 'yahoo',
    bing: 'bing',
  },
  themeColor: 'black',
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
