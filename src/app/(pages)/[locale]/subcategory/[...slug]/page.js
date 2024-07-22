import { getLocale } from "next-intl/server";
import { headers } from "next/headers";

import { urlAPI } from "../../../../../lib/constant";
import { axiosInstance } from "../../../../../lib/utils";

import SingleSubCategory from "../../../../clientSide/singleSubCategory";


async function getData(val) {
    try {
        const response = await axiosInstance(`${urlAPI}backend/customer/sub-categories/detail/${val}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json",
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error retrieving data:', error);
        throw new Error('Could not get data');
    }
}

export async function generateMetadata({ params }) {
    const { slug, locale } = params;
    const headersList = headers();
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