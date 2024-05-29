import dynamic from "next/dynamic";
import Header from "../../component/header"
import Footer from '../../component/footer';
import { getTranslations } from 'next-intl/server';

const ReduxProvider = dynamic(() => import("../../store/redux-provider"), {
    ssr: false
});

export default function UserLayout({ children, params: { locale } }) {
    return (
        <ReduxProvider>
            <main className="layout-login">
                <div className='flex flex-col h-screen justify-between'>
                    <Header locale={locale} />
                    <div className='flex-grow'>
                        {children}
                    </div>
                    <Footer
                        t={t}
                    />
                </div>
            </main>
        </ReduxProvider>
    )
} 