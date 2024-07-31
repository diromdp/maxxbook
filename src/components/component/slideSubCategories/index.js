import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

import Image from "next/image";

const SlideSubCategories = ({ isLoading, subCategory, locale }) => {
    let newStr = locale && locale.replace(/["]/g, '');  

    return (
        <Carousel
            opts={{
                align: "start",
            }}
            className="w-full pt-[48px] carousel-slide-sub-category"
        >
            <CarouselContent>
                {
                    !isLoading ?
                        <>
                            {subCategory && subCategory.map((item, index) => {
                                return (
                                    <CarouselItem key={index} className="first:ml-0 xl:ml-[32px] sm:basis-1/2 md:basis-80 xl:basis-64 cursor-pointer">
                                        <Link href={`/${newStr}/subcategory/${item.slug}`}>
                                            <Card className="p-1 w-full md:w-[280px] h-[90px]">
                                                <CardContent className="flex card-content aspect-square items-center relative p-6 w-full h-[90px] z-10">
                                                    <h3 className="title"> {newStr == 'en' ? item.name : item.name_id}</h3>
                                                    <Image alt={item.name} height={76} width={76} src={'https://s-f.scribdassets.com/webpack/assets/images/explore/doc_thumbnails/doc_loaf_thumb_7.1ee2b181.jpg'} />
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    </CarouselItem>
                                )
                            })}
                        </> :
                        <>
                            {Array.from({ length: 12 }).map((_, index) => (
                                <CarouselItem key={index} className="first:ml-0 ml-[32px] md:basis-1/2 lg:basis-1/5 cursor-pointer">
                                    <Card className="p-1 w-full md:w-[280px] h-[90px]">
                                        <CardContent className="flex card-content aspect-square items-center relative p-6 w-full h-[90px] z-10">
                                            <Skeleton className={"w-[120px] h-[20px] absolute top-[10px] left-[16px]"} />
                                            <Skeleton className={"w-[76px] h-[76px] absolute right-[32px] top-[4px]"} />
                                        </CardContent>
                                    </Card>
                                </CarouselItem>
                            ))}
                        </>
                }
            </CarouselContent>
            <div className="flex flex-row items-center justify-center mt-[40px]">
                <CarouselPrevious className="relative -left-[5px] sm:-left-[20px] lg:-left-[3.0rem] lg:absolute" />
                <CarouselNext className="relative -right-[5px] sm:-right-[20px] lg:-right-[3.0rem] lg:absolute" />
            </div>
        </Carousel>
    );
}

export default SlideSubCategories;