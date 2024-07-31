import Header from "@/components/component/header"
import Footer from '@/components/component/footer';
import { NextIntlClientProvider } from 'next-intl';
import { useTranslations, useMessages } from "next-intl";
import dynamic from "next/dynamic";
import ProtectAuth  from "./protectAuth";
const ReduxProvider = dynamic(() => import("@/store/redux-provider"), {
    ssr: false
});

export default function PagesLayout({
    children,
    params: { locale }
}) {
    const messages = useMessages();
    const t = useTranslations('Homepage');
    return (
        <>
            <ReduxProvider>
                <NextIntlClientProvider messages={messages}>
                    <ProtectAuth>
                        <div className='flex flex-col'>
                            <Header locale={locale} />
                                <div className='h-full '>
                                    {children}
                                </div>
                            <Footer
                                t={t}
                            />
                        </div>
                    </ProtectAuth>
                </NextIntlClientProvider>
            </ReduxProvider>
        </>
    )
}