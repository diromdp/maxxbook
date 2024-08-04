import { lazy } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { useTranslations, useMessages } from "next-intl";
import ProtectAuth  from "./protectAuth";

const ReduxProvider = lazy(() => import("@/store/redux-provider"));
const Header = lazy(() => import("@/components/component/header"));
const Footer = lazy(() => import("@/components/component/footer"));

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