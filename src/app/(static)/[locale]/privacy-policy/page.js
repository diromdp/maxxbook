import Sidebar from "@/app/component/sidebar";
import { headers } from "next/headers";
import { urlAPI } from "../../../../lib/constant";

// async function getDetails() {
//     const data = await fetch(`${urlAPI}backend/settings?keys=page.title_privacy%2Cpage.description_seo_privacy%2Cpage.description_privacy`, {
//        method: 'get',
//        headers: {
//           'Content-Type': 'application/json',
//           'Accept': "application/json",
//        },
//     });
 
//     if (!data.ok) {
//        throw new Error('Failed to fetch data')
//     }
//     return data.json()
//  }
 
//  export async function generateMetadata() {
//     const headersList = headers();
//     const pathname = headersList.get("referer");
 
//     const detailSEO = await getDetails();

//     return {
//        title: detailSEO.length > 0 ? detailSEO[0].value : '',
//        description: detailSEO.length > 0 ? detailSEO[1].value : '',
//        twitter: {
//           card: 'summary_large_image',
//           title: detailSEO.length > 0 ? detailSEO[0].value : '',
//           url: pathname,
//           description: detailSEO.length > 0 ? detailSEO[1].value : '',
//        },
//        openGraph: {
//           title: detailSEO.length > 0 ? detailSEO[0].value : '',
//           description: detailSEO.length > 0 ? detailSEO[1].value : '',
//           url: pathname,
//           type: 'website',
//        },
//     }
//  }
 export default async function PrivacyPolicy() {
    // const detailSEO = await getDetails();
    return (
        <div className="screen-layer pt-[120px]">
            <div className="flex gap-[16px] contact-page">
                <div className="w-[80%] flex-col items-start">
                    <div className="content">
                        <div className="title">
                            <h1>Privacy Policy Maxibook</h1>
                        </div>
                        <div className="desc">
                            {/* <div dangerouslySetInnerHTML={{__html: detailSEO && detailSEO[2].value}} /> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

