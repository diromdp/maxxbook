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
    console.log(data)
    console.log('asdads')

    useEffect(() => {
       console.log('slider') 
    })
    return (
        <Carousel
            opts={{
                align: "start",
            }}
            className="w-full carousel-slide-sub-category"
        >
            <CarouselContent>
                {data && data.map((item, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/6 cursor-pointer">
                        <Card
                            key={index}
                            colorImage={item.color}
                            imagePath={item.thumb_url}
                            title={item.title}
                            description={item.description}
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
}

export default SliderCardItem;