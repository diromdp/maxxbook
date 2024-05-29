import Header from "../../component/header"
import Footer from '../../component/footer';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import dynamic from "next/dynamic";


const ReduxProvider = dynamic(() => import("../../store/redux-provider"), {
    ssr: false
});
export default async function PagesLayout({
    children,
    params: { locale }
}) {
    const messages = await getMessages();
    const t = await getTranslations('Homepage');
    return (
        <>
            <ReduxProvider>
                <NextIntlClientProvider messages={messages}>
                    <div className='flex flex-col h-screen justify-between'>
                        <Header locale={locale} />
                        <div className='flex-grow'>
                            {children}
                        </div>
                        <Footer
                            t={t}
                        />
                    </div>
                </NextIntlClientProvider>
            </ReduxProvider>
        </>
    )
}