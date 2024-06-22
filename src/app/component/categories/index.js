import Link from "next/link";
import Image from 'next/image'
import { useTranslations } from 'next-intl';
import { getLocale } from 'next-intl/server';
import { urlAPI } from "../../../lib/constant";

async function getCategory() {

    // Fetch data from external API
    const data = await fetch(`${urlAPI}backend/categories/home`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': "application/json",
        },
    });
    // Pass data to the page via props
    return data.json();
}
export default async function Categories() {
    const t = useTranslations('Homepage');
    const data = await getCategory()
    const localData = await getLocale();
    return (
        <div className="categories">
            <div className="container m-auto">
                <div className="content">
                    {
                        data && data.length > 0 && data.map((item, index) => {
                            return (
                                <Link key={index} href={`/${localData}/catagories/${item.slug}`} className="item">
                                    <span>{localData == 'en' ? item.name : item.name_id}</span>
                                    <Image alt={item.name ? item.name : ''} className="image" width={96} height={96} src={item.icon_url ? item.icon_url : ''} />
                                </Link>
                            )
                        })
                    }
                </div>
                <div className="see-more">
                    <Link href={`/${localData}/catagories`}>{t('see category')}</Link>
                </div>
            </div>
        </div>
    );
}
