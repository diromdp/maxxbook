"use client";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect } from "react";

import Card from "../cartItem";

const SliderCardItem = ({data}) => {
    return (
        <Carousel
            opts={{
                align: "start",
            }}
            className="w-full"
        >
            <CarouselContent>
                {data && data.map((item, index) => (
                    <CarouselItem key={index} className="first:ml-0 basis-1/2 lg:basis-1/6 cursor-pointer">
                        <Card
                            key={index}
                            colorImage={item.color}
                            imagePath={item.thumb_url}
                            title={item.title}
                            className="!w-full md:!w-[200px]"
                            description={item.description}
                            slug={item.slug}
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <div className="flex flex-row items-center justify-center mt-[40px]">
                <CarouselPrevious className="relative -left-[5px] sm:-left-[20px] lg:-left-[3.0rem] lg:absolute" />
                <CarouselNext className="relative -right-[5px] sm:-right-[20px] lg:-right-[3.0rem] lg:absolute" />
            </div>
        </Carousel>
    );
}

export default SliderCardItem;