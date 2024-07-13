"use client";
import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import { useTranslations } from "next-intl"
const BreadCumb = dynamic(() => import('../../component/breadcumb'), {
    ssr: false,
})
const SlideSubCategories = dynamic(() => import('@/app/component/slideSubCategories'), {
    ssr: false,
})
const ResultShowID = dynamic(() => import('../../component/resultbyid'), {
    ssr: false,
})

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
    console.log(detailCategory[0].sub_categories && detailCategory[0].sub_categories)
    return (
        <div className="categories-page">
            <div className="screen-layer min-h-screen">
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
                            <h2>{t('Explore more in')} {detailCategory && locale == "en" ? detailCategory[0].name : detailCategory[0].name_id}</h2>
                        </div>
                    }
                    <ResultShowID idCategory={detailCategory && detailCategory[0].id} />
                </div>
            </div>
        </div>
    );
}

export default SingleCategory;