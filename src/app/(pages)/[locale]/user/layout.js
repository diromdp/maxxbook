import ProtectLogin from '../protectLogin';

export default async function PagesLayout({
    children,
    params: { locale }
}) {
    return (
        <>
            <ProtectLogin>
                {children}
            </ProtectLogin>
        </>
    )
}