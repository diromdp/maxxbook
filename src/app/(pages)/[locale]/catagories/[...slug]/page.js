import SingleCategory from '../../../../clientSide/singleCategory';
import { urlAPI } from "../../../../../lib/constant";
import { getLocale } from "next-intl/server";

async function getData(val) {
    const data = await fetch(`${urlAPI}backend/customer/categories/detail/${val}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': "application/json",
        },
    });
    return data.json();
}

export default async function CategoriesAndSubCategories({ params }) {
    const { slug } = params;    
    const data = await getData(slug)
    const locale = getLocale();
    return (
        <>
            <SingleCategory locale={locale} detailCategory={data} slug={slug} />
        </>
    );
}

