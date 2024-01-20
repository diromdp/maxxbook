'use client';
import React, { useEffect } from 'react';
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton"
import ResultShow from '@/app/component/result';
import PaginationComponent from '@/app/component/pagination';

const FilterComponent = React.lazy(() => import('../../component/FilterComponent'));


export default function result() {
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(!isLoading);
        }, 1000)
    }, []);
    return (
        <div className="result-page">
            <div className="mx-auto w-full max-w-screen-xl">
                <FilterComponent isLoading={isLoading} />
                <div className="result-word">
                    {

                        !isLoading ?
                            <p>1-42 of 2,043 results</p> :
                            <Skeleton className={"w-[180px] h-[20px]"} />
                    }

                </div>
                <ResultShow isLoading={isLoading} />
                <PaginationComponent isLoading={isLoading} defaultCurrent={3} total={500} onShowSizeChange={(e) => console.log(e)} />
            </div>
        </div>
    );
}