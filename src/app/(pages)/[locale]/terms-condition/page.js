import Sidebar from "@/app/component/sidebar";
import { headers } from "next/headers";
import { urlAPI } from "../../../../lib/constant";
import { use } from "react";
async function getDetails() {
    const data = await fetch(`${urlAPI}backend/settings?keys=page.title_term,page.description_seo_term,page.description_term`, {
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
                                <h1>Terms of Use </h1>
                            </div>
                            <div className="desc mb-[32px]">
                                <div dangerouslySetInnerHTML={{ __html: selectedEditor && selectedEditor[0].value }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TermCondition;