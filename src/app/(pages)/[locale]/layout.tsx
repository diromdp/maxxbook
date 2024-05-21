import Header from "../../component/header"
import Footer from '../../component/footer';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';

export default async function PagesLayout({
    children,
    params: { locale }
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    const messages = await getMessages();
    const t = await getTranslations('Homepage');

    return (
        <html lang={locale}>
            <body>
                <NextIntlClientProvider messages={messages}>
                    <div className='flex flex-col h-screen justify-between'>
                        <Header />
                        <div className='flex-grow'>
                            {children}
                        </div>
                        <Footer
                            t={t}
                        />
                    </div>
                </NextIntlClientProvider>
            </body>
        </html>
    )
}