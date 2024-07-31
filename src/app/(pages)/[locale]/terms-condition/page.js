import Sidebar from "@/app/component/sidebar";
import { headers } from "next/headers";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { BaseUrl } from "../../../../lib/constant";

const ContentTnc = dynamic(() => import("../../../component/contentTnc"), {
    ssr: false,
});

export async function generateMetadata() {
    const headersList = headers();
    const pathname = headersList.get("referer");

    try {
        const response = await fetch(`${BaseUrl}/api/public/settings?keys=page.title_term,page.description_seo_term,page.description_term,page.title_term_id,page.description_seo_term_id,page.description_term_id`,
            {
               headers: {
                  'Content-Type': 'application/json',
                  'Accept': "application/json",
               }, 
            }
         );
      
         const data = await response.json();
         const detailSEO = data.data;
    
         if (detailSEO != undefined || detailSEO && detailSEO.length > 0) {
            const selectedTitle = detailSEO && detailSEO.filter(x => x.key === 'page.title_term')
            const selectedDesc = detailSEO && detailSEO.filter(x => x.key === 'page.description_seo_term')

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
    } catch (error) {
        console.log(error);
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