"use client";
import { useState, useEffect } from "react";
import BreadCumb from "@/app/component/breadcumb";
import { useTranslations } from "next-intl"
import SlideSubCategories from "@/app/component/slideSubCategories";
import ResultShowID from "../../component/resultbyid";

const SingleCategory = ({detailCategory, slug, locale}) => {
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
                    urlPath: `/${locale}/catagories/${slug[0]}`,
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
        <div className="categories-page">
            <div className="screen-layer">
                <BreadCumb menu={menu} />
                <div className="title-pages">
                    <h1>{detailCategory && locale == "en" ? detailCategory[0].name : detailCategory[0].name_id} {t('Documents')}</h1>
                    <p>{detailCategory && locale == "en" ? detailCategory[0].description : detailCategory[0].description_id}.</p>
                </div>
                {
                    detailCategory[0].sub_categories.length > 0 && <SlideSubCategories locale={locale} subCategory={detailCategory[0].sub_categories} isLoading={isLoading} />
                }
                <div className="epxlore-more">
                    {
                        slug.length < 2 &&
                        <div className="title-more">
                            <h2>{t('Explore more in')} {detailCategory && locale.value == "en" ? detailCategory[0].name : detailCategory[0].name_id}</h2>
                        </div>
                    }
                    <ResultShowID idCategory={detailCategory && detailCategory[0].id} />
                </div>
            </div>
        </div>
    );
}

export default SingleCategory;