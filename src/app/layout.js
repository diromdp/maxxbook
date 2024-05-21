import { Roboto, Montserrat } from 'next/font/google';

import '@/app/scss/style.scss';

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
export const metadata = {
  title: 'Maxibook - All you can read anything',
  description: 'Maxibook is place to find documents or materials than can help to solve your problem',
}

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <body className={`${monst.variable} ${roboto.variable}`}>
          {children}
        </body>
      </html>
    </>
    
  )
}
