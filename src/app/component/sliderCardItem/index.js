"use client";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

import Card from "../cartItem";

const SliderCardItem = ({ data }) => {
    return (
        <Carousel
            opts={{
                align: "start",
            }}
            className="w-full"
        >
            <CarouselContent>
                {data && data.map((item, index) => {
                    if (item.slug) {
                        return (
                            <CarouselItem key={index} className="first:ml-0 basis-1/2 md:basis-1/4 2xl:basis-1/5 cursor-pointer">
                                <Card
                                    key={index}
                                    colorImage={item.color}
                                    imagePath={item.thumb_url}
                                    title={item.title}
                                    className="w-fit"
                                    description={item.description}
                                    slug={item.slug}
                                />
                            </CarouselItem>
                        )

                    }
                }
                )}
            </CarouselContent>
            <div className="flex flex-row items-center justify-center mt-[40px]">
                <CarouselPrevious className="relative -left-[5px] sm:-left-[20px] xl:-left-[3.0rem] xl:absolute" />
                <CarouselNext className="relative -right-[5px] sm:-right-[20px] xl:-right-[3.0rem] xl:absolute" />
            </div>
        </Carousel>
    );
}

export default SliderCardItem;