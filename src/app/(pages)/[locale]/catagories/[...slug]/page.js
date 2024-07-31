import { getLocale } from "next-intl/server";
import { headers } from "next/headers";
import dynamic from 'next/dynamic';
import { urlAPI } from "../../../../../lib/constant";
import { axiosInstance } from "../../../../../lib/utils";


const SingleCategory = dynamic(() => import('../../../../../components/clientSide/singleCategory'), {
    ssr: false,
})

async function getData(val) {
    try {
        const response = await axiosInstance(`${urlAPI}backend/customer/categories/detail/${val}`,
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
    }
}

export async function generateMetadata({ params }) {
    const { slug, locale } = params;
    const headersList = headers();
    const pathname = headersList.get("referer");
    const detailSEO = await getData(slug);
    if (detailSEO != undefined || detailSEO && detailSEO.length > 0) {
        return {
            title: `Maxibook - ${locale == 'en' ? detailSEO[0].name : detailSEO[0].name_id}`,
            description: locale == 'en' ? detailSEO[0].description : detailSEO[0].description_id,
            canonical: pathname,
            twitter: {
                card: 'summary_large_image',
                title: `Maxibook - ${locale == 'en' ? detailSEO[0].name : detailSEO[0].name_id}`,
                description: locale == 'en' ? detailSEO[0].description : detailSEO[0].description_id,
                url: pathname,
                images: [{ url: '/image/og-image.png' }],
            },
            openGraph: {
                title: `Maxibook - ${locale == 'en' ? detailSEO[0].name : detailSEO[0].name_id}`,
                description: locale == 'en' ? detailSEO[0].description : detailSEO[0].description_id,
                url: pathname,
                type: 'website',
                images: [{ url: '/image/og-image.png' }],
            },
        }
    }
}

export default async function CategoriesAndSubCategories({ params }) {
    const { slug } = params;
    const data = await getData(slug);
    const locale = await getLocale();
    return (
        <>
            <SingleCategory locale={locale} detailCategory={data} slug={slug} />
        </>
    );
}

