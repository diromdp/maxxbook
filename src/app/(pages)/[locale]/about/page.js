import Sidebar from "@/app/component/sidebar";
import { headers } from "next/headers";
import dynamic from "next/dynamic";
import { useTranslations, useLocale } from "next-intl";
import { getLocale } from "next-intl/server";
import { urlAPI } from "../../../../lib/constant";

const ContentAbout = dynamic(() => import("../../../component/contentAbout"), {
    ssr: false,
});

async function getDetails() {
    const data = await fetch(`${urlAPI}backend/settings?keys=seo.title_about,seo.title_about_id,seo.description_about,seo.description_about_id,page.description_about,page.description_about_id`, {
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
    const selectedTitle = detailSEO.filter(x => x.key === 'seo.title_about');
    const selectedDesc = detailSEO.filter(x => x.key === 'seo.description_about');
    const selectedTitleID = detailSEO.filter(x => x.key === 'seo.title_about_id');
    const selectedDescID = detailSEO.filter(x => x.key === 'seo.description_about_id');
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
                },
                openGraph: {
                    title: selectedTitle[0].value,
                    description: selectedDesc[0].value,
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
                },
                openGraph: {
                    title: selectedTitleID[0].value,
                    description: selectedDescID[0].value,
                    url: pathname,
                    type: 'website',
                },
            }
        }

    }
}

const About = () => {
    const t = useTranslations("Global");
    return (
        <>
            <div className="screen-layer pt-[80px] lg:pt-[120px] min-h-screen">
                <div className="flex flex-col md:flex-row gap-[16px] about-page px-[16px] 1xl:px-0">
                    <div className="md:w-[20%]">
                        <Sidebar />
                    </div>
                    <div className="md:w-[80%] flex-col items-start">
                        <div className="content">
                            <div className="title">
                                <h1>{t('About Maxibook')}</h1>
                            </div>
                            <ContentAbout />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default About;