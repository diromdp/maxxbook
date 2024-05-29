import Link from "next/link";
import { urlAPI } from "../../../../lib/constant";
import { getLocale, getTranslations } from 'next-intl/server';

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

export default async function category() {
    const data = await getData()
    const localData = await getLocale();
    const t = await getTranslations("Documents");
    return <>
        <div className="categories-page">
            <div className="mx-auto w-full max-w-screen-xl">
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
                                                item.sub_categories && item.sub_categories.map((sub_category, key) => {
                                                    return (
                                                        <li>
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
