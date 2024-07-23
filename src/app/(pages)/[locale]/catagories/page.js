import { getLocale, getTranslations } from 'next-intl/server';
import { headers } from "next/headers";
import { urlAPI } from "../../../../lib/constant";
import ListCategory from "../../../component/ListCategory";
import { axiosInstance } from "../../../../lib/utils";

async function getDetails() {
    try {
        const response = await axiosInstance(`${urlAPI}backend/settings?keys=seo.title_category,seo.description_category,seo.title_category_id,seo.description_category_id`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json",
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error retrieving data:', error);
        throw new Error('Could not get data');
    }
}

export async function generateMetadata() {
    const headersList = headers();
    const pathname = headersList.get("referer");
    const ogImage = '/image/og-image.png';
    const detailSEO = await getDetails();
    const selectedTitle = detailSEO && detailSEO.filter(x => x.key === 'seo.title_category')
    const selectedDesc = detailSEO && detailSEO.filter(x => x.key === 'seo.description_category')
    const selectedTitleID = detailSEO && detailSEO.filter(x => x.key === 'seo.title_category_id')
    const selectedDescID = detailSEO && detailSEO.filter(x => x.key === 'seo.description_category_id')

    const locale = await getLocale();

    if (locale === 'en') {
        if (selectedTitle.length > 0 && selectedDescID.length > 0) {
            return {
                title: selectedTitle[0].value,
                description: selectedDesc[0].value,
                twitter: {
                    card: 'summary_large_image',
                    title: selectedTitle[0].value,
                    url: pathname,
                    description: selectedDesc[0].value,
                    images: [{ url: ogImage }],
                },
                openGraph: {
                    title: selectedTitle[0].value,
                    description: selectedDesc[0].value,
                    images: [{ url: ogImage }],
                    url: pathname,
                    type: 'website',
                },
            }
        }
    } else {
        if (selectedTitleID.length > 0 && selectedDescID.length > 0) {
            return {
                title: selectedTitleID[0].value,
                description: selectedDescID[0].value,
                twitter: {
                    card: 'summary_large_image',
                    title: selectedTitleID[0].value,
                    url: pathname,
                    description: selectedDescID[0].value,
                    images: [{ url: ogImage }],
                },
                openGraph: {
                    title: selectedTitleID[0].value,
                    description: selectedDescID[0].value,
                    images: [{ url: ogImage }],
                    url: pathname,
                    type: 'website',
                    images: [{ url: '/image/og-image.png' }],
                },
            }
        }
    }
}

export default async function category() {
    const t = await getTranslations("Documents");

    return <>
        <div className="categories-page ">
            <div className="screen-layer px-[16px] lg:px-[24px]">
                <div className="title-pages">
                    <h1>{t('title')}</h1>
                    <p>{t('description')}</p>
                </div>
                <ListCategory />
            </div>
        </div>
    </>
}
