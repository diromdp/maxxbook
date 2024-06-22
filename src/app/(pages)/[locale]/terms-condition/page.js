import Sidebar from "@/app/component/sidebar";
import { headers } from "next/headers";
import { useTranslations, useLocale } from "next-intl";
import { getLocale } from "next-intl/server";

import { urlAPI } from "../../../../lib/constant";
import { use } from "react";
async function getDetails() {
    const data = await fetch(`${urlAPI}backend/settings?keys=page.title_term,page.description_seo_term,page.description_term,page.title_term_id,page.description_seo_term_id,page.description_term_id`, {
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
    const selectedTitle = detailSEO.filter(x => x.key === 'page.title_term')
    const selectedDesc = detailSEO.filter(x => x.key === 'page.description_seo_term')

    return {
        title: detailSEO.length > 0 ? selectedTitle[0].value : '',
        description: detailSEO.length > 0 ? selectedDesc[0].value : '',
        twitter: {
            card: 'summary_large_image',
            title: detailSEO.length > 0 ? selectedTitle[0].value : '',
            url: pathname,
            description: detailSEO.length > 0 ? selectedDesc[0].value : '',
        },
        openGraph: {
            title: detailSEO.length > 0 ? selectedTitle[0].value : '',
            description: detailSEO.length > 0 ? selectedDesc[0].value : '',
            url: pathname,
            type: 'website',
        },
    }
}

const TermCondition = () => {
    const detailSEO = use(getDetails());
    const selectedEditor = detailSEO.filter(x => x.key === 'page.description_term');
    const selectedEditorID = detailSEO.filter(x => x.key === 'page.description_term_id');

    const t = useTranslations("Global");
    const localeNext = useLocale();

    return (
        <>
            <div className="screen-layer pt-[80px] lg:pt-[120px]">
                <div className="flex flex-col md:flex-row gap-[16px] about-page px-[16px] 1xl:px-0">
                    <div className="md:w-[20%]">
                        <Sidebar />
                    </div>
                    <div className="md:w-[80%] flex-col items-start">
                        <div className="content">
                            <div className="title">
                                <h1>{t('Terms of Use')} </h1>
                            </div>
                            <div className="desc mb-[32px]">
                                {
                                    localeNext === "en" ? 
                                    <div dangerouslySetInnerHTML={{ __html: selectedEditor && selectedEditor[0].value }} />:
                                    <div dangerouslySetInnerHTML={{ __html: selectedEditorID && selectedEditorID[0].value }} />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TermCondition;