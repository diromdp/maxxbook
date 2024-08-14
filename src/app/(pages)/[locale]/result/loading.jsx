"use client";
import CardLoading from "@/components/component/cardLoading";

export default function Loading() {
    return (
        <div className="screen-layer mt-[122px]">
            <div className="result-show">
                {[...Array(12)].map((x, i) =>
                    <CardLoading key={i} />
                )}
            </div>
        </div>
    );
}
