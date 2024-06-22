import Sidebar from "@/app/component/sidebar";
import { useLocale } from "next-intl";
import { headers } from "next/headers";
import { urlAPI } from "../../../../lib/constant";
import { use } from "react";

async function getDetails() {
    const data = await fetch(`${urlAPI}backend/settings?keys=seo.title_about,seo.description_about,page.description_about`, {
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
    return {
        title: selectedTitle ?  selectedTitle[0].value : '',
        description: selectedDesc ? selectedDesc[0].value : '',
        twitter: {
            card: 'summary_large_image',
            title: selectedTitle ? selectedTitle[0].value : '',
            url: pathname,
            description: selectedDesc ? selectedDesc[0].value : '',
        },
        openGraph: {
            title: selectedTitle ? selectedTitle[0].value : '',
            description: selectedDesc ? selectedDesc[0].value : '',
            url: pathname,
            type: 'website',
        },
    }
}

const About = () => {
    const detailSEO = use(getDetails());
    const selectedEditor = detailSEO.filter(x => x.key === 'page.description_about')
    const selectedEditorID = detailSEO.filter(x => x.key === 'page.description_about_id');
    const localeNext = useLocale();
    console.log(selectedEditorID);
    return (
        <>
            <div className="screen-layer pt-[80px] lg:pt-[120px]">
                <div className="flex flex-col md:flex-row gap-[16px] about-page px-[16px] md:px-0">
                    <div className="md:w-[20%]">
                        <Sidebar />
                    </div>
                    <div className="md:w-[80%] flex-col items-start">
                        <div className="content">
                            <div className="title">
                                <h1>Aboasdut Maxibook</h1>
                            </div>
                            <div className="desc mb-[32px]">
                                {
                                    localeNext == "en" ?
                                    <div dangerouslySetInnerHTML={{ __html: selectedEditor && selectedEditor[0].value }} />:
                                    <div dangerouslySetInnerHTML={{ __html: selectedEditor && selectedEditor[0].value }} />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default About;