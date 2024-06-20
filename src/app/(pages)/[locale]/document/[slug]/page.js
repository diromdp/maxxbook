import Image from "next/image";
import Link from "next/link";
import PlaceAdsance from "@/app/component/placeAdsence";
import DocumentDesc from "../../../../component/documentDesc";
import { urlAPI } from "../../../../../lib/constant";
import { getTranslations, getLocale } from "next-intl/server";
import { headers } from "next/headers";

async function getData() {
    const data = await fetch(`${urlAPI}backend/documents?perPage=${10}&sortBy=${'id'}&sortDirection=${'desc'}&is_random=${1}`, {
        method: 'GET',
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

async function getDetails(slug) {
    const data = await fetch(`${urlAPI}backend/documents/detail/${slug}`, {
        method: 'GET',
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

export async function generateMetadata({ params }) {
    // read route params
    const slug = params.slug;
    const dataDetailDocument = await getDetails(slug);
    const headersList = headers();
    const pathname = headersList.get("referer");

    // fetch data
    return {
        title: dataDetailDocument.title_seo,
        description: dataDetailDocument.description_seo,
        keywords: [dataDetailDocument.title],
        twitter: {
            card: 'summary_large_image',
            title: dataDetailDocument.title_seo,
            url: pathname,
            description: dataDetailDocument.description_seo,
            images: {
                url: dataDetailDocument.thumb_url,
                alt: dataDetailDocument.title_seo,
            },
        },
        openGraph: {
            title: dataDetailDocument.title_seo,
            description: dataDetailDocument.description_seo,
            url: pathname,
            type: 'website',
            images: [
                {
                    url: dataDetailDocument.thumb_url, // Must be an absolute URL
                    width: 800,
                    height: 600,
                },
                {
                    url: dataDetailDocument.thumb_url, // Must be an absolute URL
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
    const dataDocument = await getData();
    const t = await getTranslations("Documents");
    const locale = await getLocale();
    
    return (
        <div className="document-page">
            <div className="screen-layer mb-[32px]">
                <div className="flex flex-col px-[16px] lg:px-0 lg:flex-row gap-[16px]">
                    <div className="w-full lg:w-[70%] flex flex-col items-center relative">
                        <PlaceAdsance className="my-[16px] hidden md:block w-full " type={'Leaderboard'} />
                        <DocumentDesc slug={slug} />
                    </div>
                    <div className="w-full lg:w-[30%]">
                        <div className="another-document">
                            <div className="another-document-content">
                                <div className="adds flex flex-col hidden lg:flex items-center">
                                    <PlaceAdsance type={'Large rectangle'} />
                                </div>
                                <div className="title-document-content">
                                    <h2>{t('other documents')}</h2>
                                </div>
                                {
                                    dataDocument && dataDocument.data.map((item, index) => {
                                        return (
                                            <Link key={index} href={`/${locale}/document/${item.slug}`} className="item-content">
                                                <div className="img">
                                                    <Image alt={item.slug} fill priority src={item.thumb_url ? item.thumb_url : 'https://imgv2-1-f.scribdassets.com/img/document/698827662/298x396/91da6ea0cc/0?v=1'} />
                                                </div>
                                                <div className="description">
                                                    <div className="type-totals">
                                                        <span className="title">Document</span>
                                                        <span className="separator">.</span>
                                                        <span className="title">{item && item.page_count ? item.page_count : 0} {t('pages')}</span>
                                                    </div>
                                                    <div className="title-document">
                                                        <h4>{item.title}</h4>
                                                        <span className="people-name">{item.user && item.user.name}</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
