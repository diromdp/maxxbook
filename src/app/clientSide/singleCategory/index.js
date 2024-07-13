"use client";
import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import { useTranslations } from "next-intl";
import axios from "axios";
import { urlAPI } from "../../../lib/constant";


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
    const [detailSubCategoryClient, setDetailSubCategory] = useState([]);

    const getData = async () => {
        await axios.get(`${urlAPI}backend/customer/categories/detail/${slug}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': "application/json",
            }
        })
            .then((data) => {
                if (data.status === 200) {
                    const subCategory = data.data;
                    setLoading(false);
                    setDetailSubCategory(subCategory[0].sub_categories);
                }
            })
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response.data.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });
    }

    useEffect(() => {
        getData();
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
            <div className="screen-layer min-h-screen">
                <BreadCumb menu={menu} />
                <div className="title-pages">
                    <h1>{detailCategory && locale == "en" ? detailCategory[0].name : detailCategory[0].name_id} {t('Documents')}</h1>
                    <p>{detailCategory && locale == "en" ? detailCategory[0].description : detailCategory[0].description_id}.</p>
                </div>
                {
                    detailSubCategoryClient.length > 0 && <SlideSubCategories locale={locale} subCategory={detailSubCategoryClient} isLoading={isLoading} />
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