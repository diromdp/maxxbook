"use client";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="categories-page ">
            <div className="screen-layer px-[16px] lg:px-[24px]">
                <div className="title-pages">
                    <h1><Skeleton className={'h-[15px] w-[100px]'} /></h1>
                    <p><Skeleton className={'h-[15px] w-[200px] mt-[16px]'} /></p>
                </div>
                <div className="list-of-category">
                    {[...Array(12)].map((x, i) =>
                        <div key={i} className="items">
                            <h3>
                                <Skeleton className="h-6 lg:w-[250px]" />
                            </h3>
                            <ul>
                                {
                                    [...Array(12)].map((x, n) =>
                                        <li key={n}>
                                            <Skeleton className="h-6 lg:w-[200px]" />
                                        </li>
                                    )
                                }
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
