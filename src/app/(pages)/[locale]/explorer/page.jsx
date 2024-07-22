
import Image from "next/image";
import Link from "next/link";
import { use } from "react";
import { headers } from "next/headers";
import { getLocale } from "next-intl/server";
import SavedComponent from "../../../component/savedComponent";
import { useTranslations, useLocale } from "next-intl";
import SliderCardItem from "@/app/component/sliderCardItem";
import { urlAPI } from "../../../../lib/constant";
import { axiosInstance } from "../../../../lib/utils";

import imgBanner1 from "@/app/assets/images/img-banner-1.svg";
import imgBanner2 from "@/app/assets/images/img-banner-2.svg";


async function getData() {
    try {
        const response = await axiosInstance(`${urlAPI}backend/documents?perPage=${20}&sortBy=${'id'}&sortDirection=${'desc'}&is_random=${1}`,
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

async function getDetails() {
    try {
        const response = await axiosInstance(`${urlAPI}backend/settings?keys=seo.title_result,seo.description_seo_result,seo.title_result_id,seo.description_seo_result_id`,
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
    const detailSEO = await getDetails();
    const selectedTitle = detailSEO && detailSEO.filter(x => x.key === 'seo.title_result');
    const selectedDesc = detailSEO && detailSEO.filter(x => x.key === 'seo.description_seo_result');
    const selectedTitleID = detailSEO && detailSEO.filter(x => x.key === 'seo.title_result_id');
    const selectedDescID = detailSEO && detailSEO.filter(x => x.key === 'seo.description_seo_result_id');
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
                    images: [{ url: '/image/og-image.png' }],

                },
                openGraph: {
                    title: selectedTitle[0].value,
                    description: selectedDesc[0].value,
                    url: pathname,
                    type: 'website',
                    images: [{ url: '/image/og-image.png' }],

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
                    images: [{ url: '/image/og-image.png' }],

                },
                openGraph: {
                    title: selectedTitleID[0].value,
                    description: selectedDescID[0].value,
                    url: pathname,
                    type: 'website',
                    images: [{ url: '/image/og-image.png' }],

                },
            }
        }
    }
}

const ExplorerPages = () => {
    const t = useTranslations('Exporler');
    const locale = useLocale();
    const data = use(getData());
    const cardItems = data.data;
    return (
        <div className="explorer-pages">
            <div className="banner-explorer">
                <div className="banner-1">
                    <Image alt="banner-1" src={imgBanner1} width={300} height={225} />
                </div>
                <div className="screen-layer relative top-[110px] lg:top-[160px] ">
                    <h1>{t('heading')}</h1>
                    <p>{t('leading')}</p>
                </div>
                <div className="banner-2">
                    <Image alt="banner-2" src={imgBanner2} width={300} height={225} />
                </div>
            </div>
            <div className="screen-layer px-[24px] 3xl:px-0 md:h-screen">
                <SavedComponent />
                <div className="item-view">
                    <div className="flex justify-between items-center mb-[16px]">
                        <h2>{t('documents')}</h2>
                        <Link className="view-more" href={`/${locale}/result`}>{t('View more')}</Link>
                    </div>
                    <SliderCardItem data={cardItems} />
                </div>
            </div>
        </div>
    );
}

export default ExplorerPages;