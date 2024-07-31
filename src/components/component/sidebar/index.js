"use client";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

const Sidebar = () => {
    const locale = useLocale();
    const pathname = usePathname();
    const t = useTranslations("Global");

    return (
        <>
            <div className="panel-sidebar">
                <div className="panel-sidebar-container">
                    <ul>
                        <li>
                            <Link className={pathname === `/${locale}/about` ? "active" : ""} href={`/${locale}/about`}>{t('About Maxibook')}</Link>
                        </li>
                        <li>
                            <Link className={pathname === `/${locale}/contact-us` ? "active" : ""} href={`/${locale}/contact-us`}>{t('Contact Us')}</Link>
                        </li>
                        <li>
                            <Link className={pathname === `/${locale}/privacy-policy` ? "active" : ""} href={`/${locale}/privacy-policy`}>{t('Privacy Policy')}</Link>
                        </li>
                        <li>
                            <Link className={pathname == `/${locale}/terms-condition` ? "active" : ""} href={`/${locale}/terms-condition`}>{t('Terms of Use')}</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Sidebar;