import dynamic from "next/dynamic";

const ReduxProvider = dynamic(() => import("@/store/redux-provider"), {
    ssr: false
});

export default function RedirectLayout({ children }) {
    return (
        <ReduxProvider>
            <main className="layout-login">
                {children}
            </main>
        </ReduxProvider>
    )
} 