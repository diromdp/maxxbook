"use client";
import Link from "next/link";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";

const Sidebar = () => {
    const locale = useLocale();
    const pathname = usePathname();

    return (
        <>
            <div className="panel-sidebar">
                <div className="panel-sidebar-container">
                    <ul>
                        <li>
                            <Link className={pathname === `/${locale}/about` ? "active" : ""} href={`/${locale}/about`}>About Us</Link>
                        </li>
                        <li>
                            <Link className={pathname === `/${locale}/contact-us` ? "active" : ""} href={`/${locale}/contact-us`}>Contact Us</Link>
                        </li>
                        <li>
                            <Link className={pathname === `/${locale}/privacy-policy` ? "active" : ""} href={`/${locale}/privacy-policy`}>Privacy Policy</Link>
                        </li>
                        <li>
                            <Link className={pathname == `/${locale}/terms-condition` ? "active" : ""} href={`/${locale}/terms-condition`}>Terms Condition</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Sidebar;