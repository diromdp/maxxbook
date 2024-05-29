import { urlAPI } from "../../../../../lib/constant";
import { getLocale } from "next-intl/server";
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


export default async function SubCategory({ params }) {
    const { slug } = params;    
    const data = await getData(slug)
    const locale = getLocale();
    return (
        <>
            <SingleSubCategory locale={locale} detailSubCategory={data} slug={slug} />
        </>
    );
}