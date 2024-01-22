"use client";
import { useState, useEffect } from "react";

import { Button } from '@/components/ui/button';
import BreadCumb from "@/app/component/breadcumb";
import SlideSubCategories from "@/app/component/slideSubCategories";
import ResultShow from "@/app/component/result";

const CategoriesAndSubCategories = () => {
    const [isLoading, setLoading] = useState(true);

    const menu = [
        {
            name: 'Home',
            urlPath: '/',
            isIcon: false
        },
        {
            name: 'Category',
            urlPath: '/categories',
            isIcon: true
        },
    ];
    useEffect(() => {
        setTimeout(() => {
            setLoading(!isLoading);
        }, 1000)
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
                    <SlideSubCategories isLoading={isLoading} />
                </div>
                <div className="epxlore-more">
                    <div className="title-more">
                        <h2>Explore more in Science & Mathematics</h2>
                    </div>
                    <ResultShow isLoading={isLoading} />
                    <Button className="rounded-[99px] btn-primary h-[40px] bg-blue-700 mt-[32px]">Show More</Button>
                </div>
            </div>
        </div>
    );
}

export default CategoriesAndSubCategories;