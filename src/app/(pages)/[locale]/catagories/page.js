import Link from "next/link";
import { getLocale, getTranslations } from 'next-intl/server';
import { headers } from "next/headers";
import { urlAPI } from "../../../../lib/constant";


async function getData() {
    const data = await fetch(`${urlAPI}backend/categories`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': "application/json",
        },
    });
    return data.json();
}

async function getDetails() {
    const data = await fetch(`${urlAPI}backend/settings?keys=seo.title_category,seo.description_category,seo.title_category_id,seo.description_category_id`, {
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
    const selectedTitle = detailSEO.filter(x => x.key === 'seo.title_category')
    const selectedDesc = detailSEO.filter(x => x.key === 'seo.description_category')
    const selectedTitleID = detailSEO.filter(x => x.key === 'seo.title_category_id')
    const selectedDescID = detailSEO.filter(x => x.key === 'seo.description_category_id')

    const locale = await getLocale();

   if( locale === 'en') {
      return {
          title: selectedTitle ?  selectedTitle[0].value : '',
          description: selectedDesc ? selectedDesc[0].value : '',
          twitter: {
              card: 'summary_large_image',
              title: selectedTitle ? selectedTitle[0].value : '',
              url: pathname,
              description: selectedDesc ? selectedDesc[0].value : '',
          },
          openGraph: {
              title: selectedTitle ? selectedTitle[0].value : '',
              description: selectedDesc ? selectedDesc[0].value : '',
              url: pathname,
              type: 'website',
          },
      }
  } else {
      return {
          title: selectedTitleID ?  selectedTitleID[0].value : '',
          description: selectedDescID ? selectedDescID[0].value : '',
          twitter: {
              card: 'summary_large_image',
              title: selectedTitleID ? selectedTitleID[0].value : '',
              url: pathname,
              description: selectedDescID ? selectedDescID[0].value : '',
          },
          openGraph: {
              title: selectedTitleID ? selectedTitleID[0].value : '',
              description: selectedDescID ? selectedDescID[0].value : '',
              url: pathname,
              type: 'website',
          },
      }
  }
}

export default async function category() {
    const data = await getData()
    const localData = await getLocale();
    const t = await getTranslations("Documents");

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
