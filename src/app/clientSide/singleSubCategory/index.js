"use client";
import { useState, useEffect } from "react";
import BreadCumb from "@/app/component/breadcumb";
import { useTranslations } from "next-intl";

import ResultShowID from "../../component/resultbyid";

const SingleSubCategory = ({ slug, locale, detailSubCategory }) => {
    const t = useTranslations("Global");
    const [menu, setMenu] = useState([
        {
            name: t('Home'),
            urlPath: '/',
            isIcon: false
        }
    ]);
    const [isLoading, setLoading] = useState(true);
    
    useEffect(() => {
        setTimeout(() => {
            setLoading(!isLoading);
        }, 1000)
        if (slug && slug.length == 2) {
            const data = [
                {
                    name: slug[0],
                    urlPath: `/${locale}/subcategory/${slug[0]}`,
                    isIcon: true,
                },
                {
                    name: slug[1],
                    urlPath: null,
                    isIcon: true,
                }
            ];
            setMenu([...menu, ...data]);
        } else if (slug && slug.length < 2) {
            const data = [
                {
                    name: slug[0],
                    urlPath: null,
                    isIcon: true,
                },
            ];
            setMenu([...menu, ...data]);
        }
    }, []);

    return (
        <>
            <div className="categories-page">
                <div className="screen-layer">
                    <BreadCumb menu={menu} />
                    {
                        detailSubCategory.length > 0 &&
                        <>
                            <div className="title-pages">
                                <h1>{locale == "en" ? detailSubCategory[0].name : detailSubCategory[0].name_id} {t('Documents')}</h1>
                                <p>{locale == "en" ? detailSubCategory[0].description : detailSubCategory[0].description_id}.</p>
                            </div>
                            <div className="epxlore-more">
                                <ResultShowID idSubCategory={detailSubCategory[0].id} />
                            </div>
                        </>
                    }
                </div>
            </div>
        </>
    );
}

export default SingleSubCategory;