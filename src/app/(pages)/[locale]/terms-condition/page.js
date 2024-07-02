import Sidebar from "@/app/component/sidebar";
import { headers } from "next/headers";
import { useTranslations, useLocale } from "next-intl";
import dynamic from "next/dynamic";
import { urlAPI } from "../../../../lib/constant";

const ContentTnc = dynamic(() => import("../../../component/contentTnc"), {
    ssr: false,
});
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

    if (selectedTitle.length > 0 && selectedDesc.length > 0) {
        return {
            title: selectedTitle[0].value,
            description: selectedDesc[0].value,
            twitter: {
                card: 'summary_large_image',
                title: selectedTitle[0].value,
                url: pathname,
                description: selectedDesc[0].value,
                images: {
                    url: '/image/maxibook.png',
                    alt: 'Maxibook Image',
                },
            },
            openGraph: {
                title: selectedTitle[0].value,
                description: selectedDesc[0].value,
                url: pathname,
                type: 'website',
                images: {
                    url: '/image/maxibook.png',
                    alt: 'Maxibook Image',
                },
            },
        }
    }
}

const TermCondition = () => {
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
                                <h1>{t('Terms of Use')} </h1>
                            </div>
                            <ContentTnc />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TermCondition;