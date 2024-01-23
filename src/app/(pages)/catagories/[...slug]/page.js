"use client";
import { useState, useEffect } from "react";

import { Button } from '@/components/ui/button';
import BreadCumb from "@/app/component/breadcumb";
import SlideSubCategories from "@/app/component/slideSubCategories";
import ResultShow from "@/app/component/result";

const CategoriesAndSubCategories = ({ params }) => {
    const [isLoading, setLoading] = useState(true);
    const [menu, setMenu] = useState([
        {
            name: 'Home',
            urlPath: '/',
            isIcon: false
        }
    ]);
    const { slug } = params;

    useEffect(() => {
        setTimeout(() => {
            setLoading(!isLoading);
        }, 1000)
        if (slug && slug.length == 2) {
            const data = [
                {
                    name: slug[0],
                    urlPath: `/catagories/${slug[0]}`,
                    isIcon: true,
                },
                {
                    name: slug[1],
                    urlPath: null,
                    isIcon: true,
                }
            ];
            setMenu([...menu, ...data]);
            console.log('masuk')
        } else if (slug && slug.length < 2) {
            const data = [
                {
                    name: slug[0],
                    urlPath: null,
                    isIcon: true,
                },
            ];
            setMenu([...menu, ...data]);
            console.log('masuk 2')
        }
    }, []);
    return (
        <div className="categories-page">
            <div className="mx-auto w-full max-w-screen-xl">
                <BreadCumb menu={menu} />
                <div className="title-pages">
                    <h1>Science & Mathematics Documents</h1>
                    <p>Explore the ways the world works.</p>
                </div>
                <div className="pt-[48px]">
                    {
                        slug.length < 2 && <SlideSubCategories isLoading={isLoading} />
                    }
                </div>
                <div className="epxlore-more">
                    {
                        slug.length < 2 &&
                        <div className="title-more">
                            <h2>Explore more in Science & Mathematics</h2>
                        </div>
                    }
                    <ResultShow isLoading={isLoading} />
                    <Button className="rounded-[99px] btn-primary h-[40px] bg-blue-700 mt-[32px]">Show More</Button>
                </div>
            </div>
        </div>
    );
}

export default CategoriesAndSubCategories;