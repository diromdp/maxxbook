import dynamic from 'next/dynamic';
import { urlAPI } from "../../../../../lib/constant";
import { axiosInstance } from "../../../../../lib/utils";

import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";

const PlaceAdsance = dynamic(() => import('@/app/component/placeAdsence'), {
    ssr: false,
})
const DocumentDesc = dynamic(() => import('../../../../component/documentDesc'), {
    ssr: false,
})
const ListDataDetailDocument = dynamic(() => import('../../../../component/ListDataDetailDocument'), {
    ssr: false,
});


async function getDetails(slug) {
    try {
        const response = await axiosInstance(`${urlAPI}backend/documents/detail/${slug}`,
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

export async function generateMetadata({ params }) {
    const slug = params.slug;
    const dataDetailDocument = await getDetails(slug);
    const headersList = headers();
    const pathname = headersList.get("referer");

    return {
        title: dataDetailDocument.title_seo ? dataDetailDocument.title_seo : dataDetailDocument.title,
        description: dataDetailDocument.description_seo ? dataDetailDocument.description_seo : '',
        keywords: [dataDetailDocument.title],
        twitter: {
            card: 'summary_large_image',
            title: dataDetailDocument.title_seo ? dataDetailDocument.title_seo : dataDetailDocument.title,
            url: pathname,
            description: dataDetailDocument.description_seo ? dataDetailDocument.description_seo : '',
            images: {
                url: dataDetailDocument.thumb_url ? dataDetailDocument.thumb_url : '/image/maxibook.png',
                alt: dataDetailDocument.title_seo ? dataDetailDocument.title_seo : dataDetailDocument.title,
            },
        },
        openGraph: {
            title: dataDetailDocument.title_seo ? dataDetailDocument.title_seo : dataDetailDocument.title,
            description: dataDetailDocument.description_seo ? dataDetailDocument.description_seo : '',
            url: pathname,
            type: 'website',
            images: [
                {
                    url: dataDetailDocument.thumb_url,
                    width: 800,
                    height: 600,
                },
                {
                    url: dataDetailDocument.thumb_url,
                    width: 1800,
                    height: 1600,
                    alt: dataDetailDocument.title_seo,
                },
            ],
        },
    }
}

export default async function documentPage({ params }) {
    const slug = params.slug || "";
    const t = await getTranslations("Documents");

    return (
        <div className="document-page min-h-screen">
            <div className="screen-layer mb-[32px]">
                <div className="flex flex-col px-[16px] lg:px-0 lg:flex-row gap-[16px]">
                    <div className="w-full lg:w-[70%] flex flex-col items-center relative">
                        {/* <PlaceAdsance className="my-[16px] hidden md:block w-full " type={'Leaderboard'} /> */}
                        <DocumentDesc slug={slug} />
                    </div>
                    <div className="w-full lg:w-[30%]">
                        <div className="another-document">
                            <div className="another-document-content">
                                {/* <div className="adds flex flex-col hidden lg:flex items-center">
                                    <PlaceAdsance type={'Large rectangle'} />
                                </div> */}
                                <div className="title-document-content">
                                    <h2>{t('other documents')}</h2>
                                </div>
                                <ListDataDetailDocument />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
