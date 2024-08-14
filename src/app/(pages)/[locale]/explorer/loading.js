"use client";
import { Skeleton } from "@/components/ui/skeleton";
import CardLoading from "@/components/component/cardLoading";

export default function Loading() {
  return (
    <div className="explorer-pages">
      <div className="banner-explorer">
        <div className="screen-layer relative top-[110px] px-[16px] lg:w-[50%] lg:top-[160px] ">
          <h1><Skeleton className={'h-[15px] w-[100px]'} /></h1>
          <p><Skeleton className={'h-[15px] w-[200px]'} /></p>
        </div>
      </div>
      <div className="screen-layer px-[24px] 3xl:px-0 md:h-screen mt-[32px]">
        <div className="grid grid-cols-4 gap-[16px]">
          {[...Array(4)].map((x, i) =>
            <CardLoading key={i} />
          )}
        </div>
      </div>
    </div>
  );
}
