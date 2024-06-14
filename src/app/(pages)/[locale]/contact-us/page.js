import Sidebar from "@/app/component/sidebar";
import { headers } from "next/headers";
import { urlAPI } from "../../../../lib/constant";
import { use } from "react";


async function getDetails() {
    const data = await fetch(`${urlAPI}backend/settings?keys=page.title_contact,page.description_seo_contact,page.description_contact`, {
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
    const selectedTitle = detailSEO.filter(x => x.key === 'page.title_contact');
    const selectedDesc = detailSEO.filter(x => x.key === 'page.description_seo_contact');

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


const ContactUs = () => {
    const detailSEO = use(getDetails());
    const selectedEditor = detailSEO.filter(x => x.key === 'page.description_contact')

    return (
        <div className="screen-layer pt-[120px]">
            <div className="flex gap-[16px] contact-page">
                <div className="w-[20%]">
                    <Sidebar />
                </div>
                <div className="w-[80%] flex-col items-start">
                    <div className="content mb-[32px]">
                        <div className="title">
                            <h1>Contact Us</h1>
                        </div>
                        <div className="desc">
                            <div dangerouslySetInnerHTML={{__html: selectedEditor && selectedEditor[0].value}}></div>
                        </div>
                        <div className="googlemap">
                            <iframe
                                className="google-iframe"
                                title={"Maxibook"}
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2141.398698034589!2d106.8357595716977!3d-6.350808165822227!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ec39d21587cd%3A0xb00808a789734eec!2sJl.%20H.%20Shibi%203%2C%20RT.5%2FRW.2%2C%20Srengseng%20Sawah%2C%20Kec.%20Jagakarsa%2C%20Kota%20Jakarta%20Selatan%2C%20Daerah%20Khusus%20Ibukota%20Jakarta!5e0!3m2!1sen!2sid!4v1706375844493!5m2!1sen!2sid"
                                style={{ border: 0 }}
                                allowFullScreen
                                aria-hidden="false"
                                tabIndex="0"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactUs;