import Link from "next/link";
import { urlAPI } from "../../../../lib/constant";
import { getLocale, getTranslations } from 'next-intl/server';
import { headers } from "next/headers";

async function getData() {

    // Fetch data from external API
    const data = await fetch(`${urlAPI}backend/categories`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': "application/json",
        },
    });
    // Pass data to the page via props
    return data.json();
}
async function getDetails() {
    const data = await fetch(`${urlAPI}backend/settings?keys=seo.title_category%2Cseo.description_category`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Accept': "application/json",
        },
    });

    if (!data.ok) {
        throw new Error('Failed to fetch data')
    }
    return data.json()
}

export async function generateMetadata() {
    const headersList = headers();
    const pathname = headersList.get("referer");
    const detailSEO = await getDetails();
    return {
        title: detailSEO.length > 0 ? detailSEO[0].value : '',
        description: detailSEO.length > 0 ? detailSEO[1].value : '',
        twitter: {
            card: 'summary_large_image',
            title: detailSEO.length > 0 ? detailSEO[0].value : '',
            url: pathname,
            description: detailSEO.length > 0 ? detailSEO[1].value : '',
        },
        openGraph: {
            title: detailSEO.length > 0 ? detailSEO[0].value : '',
            description: detailSEO.length > 0 ? detailSEO[1].value : '',
            url: pathname,
            type: 'website',
        },
    }
}

export default async function category() {
    const data = await getData()
    const localData = await getLocale();
    const t = await getTranslations("Documents");

    console.log(data);
    return <>
        <div className="categories-page">
            <div className="screen-layer">
                <div className="title-pages">
                    <h1>{t('title')}</h1>
                    <p>{t('description')}</p>
                </div>
                <div className="list-of-category">
                    {
                        data && data.map((item, key) => {
                            if(item.sub_categories.length > 0) {
                                return (
                                    <div key={key} className="items">
                                        <h3>
                                            <Link href={`/${localData}/catagories/${item.slug}`}>
                                                { localData == "en" ? item.name : item.name_id}
                                            </Link>
                                        </h3>
                                        <ul>
                                            {
                                                item.sub_categories && item.sub_categories.map((sub_category, index) => {
                                                    return (
                                                        <li key={index}>
                                                            <Link href={`/${localData}/subcategory/${sub_category.slug}`}>
                                                                { localData == "en" ? sub_category.name : sub_category.name_id}
                                                            </Link>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            </div>
        </div>
    </>
}
