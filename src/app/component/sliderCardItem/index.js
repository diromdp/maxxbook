import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

import Card from "../cartItem";

const SliderCardItem = () => {
    return (
        <Carousel
            opts={{
                align: "start",
            }}
            className="w-full carousel-slide-sub-category"
        >
            <CarouselContent>
                {Array.from({ length: 12 }).map((_, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/6 cursor-pointer">
                        <Card
                            key={index}
                            colorImage={'bg-blue-200'}
                            imagePath={'https://imgv2-1-f.scribdassets.com/img/document/698827662/298x396/91da6ea0cc/0?v=1'}
                            title={'Matimatic with images example'}
                            description={'lorem ipsum dolor sit amet, con'}
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