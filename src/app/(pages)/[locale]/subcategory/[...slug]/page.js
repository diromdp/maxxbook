import { getLocale } from "next-intl/server";
import { headers } from "next/headers";

import { urlAPI } from "../../../../../lib/constant";
import SingleSubCategory from "../../../../clientSide/singleSubCategory";


async function getData(val) {
    const data = await fetch(`${urlAPI}backend/customer/sub-categories/detail/${val}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': "application/json",
        },
    });
    return data.json();
}

export async function generateMetadata({ params }) {
    const { slug, locale } = params;
    const headersList = headers();
    const pathname = headersList.get("referer");
    const detailSEO = await getData(slug);
    // return {
    //     title: `Maxibook - ${locale == 'en' ? detailSEO[0].name : detailSEO[0].name_id}`,
    //     description: locale == 'en' ? detailSEO[0].description : detailSEO[0].description_id,
    //     twitter: {
    //         card: 'summary_large_image',
    //         title: `Maxibook - ${locale == 'en' ? detailSEO[0].name : detailSEO[0].name_id}`,
    //         description: locale == 'en' ? detailSEO[0].description : detailSEO[0].description_id,
    //         url: pathname,
    //     },
    //     openGraph: {
    //         title: `Maxibook - ${locale == 'en' ? detailSEO[0].name : detailSEO[0].name_id}`,
    //         description: locale == 'en' ? detailSEO[0].description : detailSEO[0].description_id,
    //         url: pathname,
    //         type: 'website',
    //     },
    // }
}


export default async function SubCategory({ params }) {
    const { slug } = params;    
    const data = await getData(slug)
    const locale = await getLocale();
    return (
        <>
            <SingleSubCategory locale={locale} detailSubCategory={data} slug={slug} />
        </>
    );
}