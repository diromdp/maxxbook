import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"

import Image from "next/image";

const SlideSubCategories = ({ isLoading }) => {
    return (
        <Carousel
            opts={{
                align: "start",
            }}
            className="w-full carousel-slide-sub-category"
        >
            <CarouselContent>
                {
                    !isLoading ?
                        <>
                            {Array.from({ length: 12 }).map((_, index) => (
                                <CarouselItem key={index} className="first:ml-0 ml-[32px] md:basis-1/2 lg:basis-1/5 cursor-pointer">
                                    <Card className="p-1 w-[280px] h-[90px]">
                                        <CardContent className="flex card-content aspect-square items-center relative p-6 w-[280px] h-[90px] z-10">
                                            <h3 className="title"> Biology</h3>
                                            <Image height={76} width={76} src={'https://s-f.scribdassets.com/webpack/assets/images/explore/doc_thumbnails/doc_loaf_thumb_7.1ee2b181.jpg'} />
                                        </CardContent>
                                    </Card>
                                </CarouselItem>
                            ))}
                        </> :
                        <>
                            {Array.from({ length: 12 }).map((_, index) => (
                                <CarouselItem key={index} className="first:ml-0 ml-[32px] md:basis-1/2 lg:basis-1/5 cursor-pointer">
                                    <Card className="p-1 w-[280px] h-[90px]">
                                        <CardContent className="flex card-content aspect-square items-center relative p-6 w-[280px] h-[90px] z-10">
                                            <Skeleton className={"w-[120px] h-[20px] absolute top-[10px] left-[16px]"} />
                                            <Skeleton className={"w-[76px] h-[76px] absolute right-[32px] top-[4px]"} />
                                        </CardContent>
                                    </Card>
                                </CarouselItem>
                            ))}
                        </>
                }

            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
}

export default SlideSubCategories;