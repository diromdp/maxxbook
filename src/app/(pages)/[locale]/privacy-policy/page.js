import Sidebar from "@/app/component/sidebar";
import { headers } from "next/headers";
import { useTranslations } from "next-intl";
import { getLocale } from "next-intl/server";

import { urlAPI } from "../../../../lib/constant";
import dynamic from "next/dynamic";

const ContentPrivacy = dynamic(() => import("../../../component/contentPrivacy"), {
    ssr: false,
});


async function getDetails() {
    const data = await fetch(`${urlAPI}backend/settings?keys=page.title_privacy,page.description_seo_privacy,page.description_privacy,page.title_privacy_id,page.description_seo_privacy_id,page.description_privacy_id`, {
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
    const selectedTitle = detailSEO.filter(x => x.key === 'page.title_privacy')
    const selectedDesc = detailSEO.filter(x => x.key === 'page.description_seo_privacy')
    const selectedTitleID = detailSEO.filter(x => x.key === 'page.title_privacy_id')
    const selectedDescID = detailSEO.filter(x => x.key === 'page.description_seo_privacy_id')
    const locale = await getLocale();

    if (locale == "en") {
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
const PrivacyPolicy = () => {
    const t = useTranslations("Global");
    return (
        <div className="screen-layer pt-[80px] lg:pt-[120px] min-h-screen">
            <div className="flex flex-col md:flex-row gap-[16px] about-page px-[16px] 1xl:px-0">
                <div className="md:w-[20%]">
                    <Sidebar />
                </div>
                <div className="md:w-[80%] flex-col items-start">
                    <div className="content mb-[32px]">
                        <div className="title">
                            <h1>{t('Privacy Policy')}</h1>
                        </div>
                        <ContentPrivacy />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PrivacyPolicy;
