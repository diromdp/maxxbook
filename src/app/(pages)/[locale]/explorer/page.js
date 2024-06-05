import Image from "next/image";
import imgBanner1 from "@/app/assets/images/img-banner-1.svg";
import imgBanner2 from "@/app/assets/images/img-banner-2.svg";

import SliderCardItem from "@/app/component/sliderCardItem";
import Link from "next/link";

const ExplorerPages = ({ }) => {
    return (
        <div className="explorer-pages">
            <div className="banner-explorer">
                <div className="banner-1">
                    <Image alt="banner-1" src={imgBanner1} width={300} height={225} />
                </div>
                <div className="screen-layer relative top-[160px]">
                    <h1>Read anytime. Anywhere.</h1>
                    <p>All you can read is free! Get millions of documents you need here</p>
                </div>
                <div className="banner-2">
                    <Image alt="banner-2" src={imgBanner2} width={300} height={225} />
                </div>
            </div>
            <div className="screen-layer">
                <div className="item-view">
                    <h2>Most favorites documents</h2>
                    <SliderCardItem />
                </div>
                <div className="item-view">
                    <h2>Most downloaded documents</h2>
                    <SliderCardItem />
                </div>
                <div className="item-view">
                    <h2>Saved documents</h2>
                    <SliderCardItem />
                </div>
                <div className="item-view">
                    <div className="flex justify-between items-center">
                        <h2>Saved documents</h2>
                        <Link href={'/'} className="view-more">View more</Link>
                    </div>
                    <SliderCardItem />
                </div>
                <div className="item-view">
                    <div className="flex justify-between items-center">
                        <h2>Latest documents</h2>
                        <Link href={'/'}>View more</Link>
                    </div>
                    <SliderCardItem />
                </div>
            </div>
        </div>
    );
}

export default ExplorerPages;