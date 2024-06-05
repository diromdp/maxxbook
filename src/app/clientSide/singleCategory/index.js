"use client";
import { useState, useEffect } from "react";
import BreadCumb from "@/app/component/breadcumb";
import SlideSubCategories from "@/app/component/slideSubCategories";
import ResultShowID from "../../component/resultbyid";

const SingleCategory = ({detailCategory, slug, locale}) => {
    const [menu, setMenu] = useState([
        {
            name: 'Home',
            urlPath: '/',
            isIcon: false
        }
    ]);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        console.log(detailCategory);
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
                    <h1>{detailCategory && locale.value == "en" ? detailCategory[0].name : detailCategory[0].name_id} Documents</h1>
                    <p>{detailCategory && locale.value == "en" ? detailCategory[0].description : detailCategory[0].description_id}.</p>
                </div>
                <div className="pt-[48px]">
                    {
                        slug.length < 2 && <SlideSubCategories locale={locale.value} subCategory={detailCategory[0].sub_categories} isLoading={isLoading} />
                    }
                </div>
                <div className="epxlore-more">
                    {
                        slug.length < 2 &&
                        <div className="title-more">
                            <h2>Explore more in {detailCategory && locale.value == "en" ? detailCategory[0].name : detailCategory[0].name_id}</h2>
                        </div>
                    }
                    <ResultShowID idCategory={detailCategory && detailCategory[0].id} />
                </div>
            </div>
        </div>
    );
}

export default SingleCategory;