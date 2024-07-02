import Sidebar from "@/app/component/sidebar";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { getLocale } from "next-intl/server";
import { headers } from "next/headers";
import { urlAPI } from "../../../../lib/constant";

const ContentContactUs = dynamic(() => import("../../../component/contentContactUs"), {
    ssr: false,
});
async function getDetails() {
    const data = await fetch(`${urlAPI}backend/settings?keys=page.title_contact,page.description_seo_contact,page.description_contact,title_contact_id,page.description_seo_contact_id,page.description_contact_id,page.title_contact_id`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Accept': "application/json",
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
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
    const selectedTitleID = detailSEO.filter(x => x.key === 'page.title_contact_id');
    const selectedDescID = detailSEO.filter(x => x.key === 'page.description_seo_contact_id');
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
                    images: {
                        url: '/image/maxibook.png',
                        alt: selectedTitle[0].value,
                    },
                },
                openGraph: {
                    title: selectedTitle[0].value,
                    description: selectedDesc[0].value,
                    url: pathname,
                    type: 'website',
                    images: {
                        url: '/image/maxibook.png',
                        alt: selectedTitle[0].value,
                    },
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
                    images: {
                        url: '/image/maxibook.png',
                        alt: selectedTitleID[0].value,
                    },
                },
                openGraph: {
                    title: selectedTitleID[0].value,
                    description: selectedDescID[0].value,
                    url: pathname,
                    type: 'website',
                    images: {
                        url: '/image/maxibook.png',
                        alt: selectedTitleID[0].value,
                    },
                },
            }
        }
    }
}

const ContactUs = () => {
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
                            <h1>{t('Contact Us')}</h1>
                        </div>
                        <ContentContactUs />
                        <div className="googlemap">
                            <iframe
                                className="google-iframe w-full min-h-screen"
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