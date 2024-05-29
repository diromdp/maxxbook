
"use client";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";

const Card = ({ colorImage, imagePath, title, description, className, slug }) => {
    const locale = useLocale();
    return (
        <Link href={`/${locale}/document/${slug}`} className={`result-show-item ${className ? className : ""}`}>
            <div className={`image-cover`} style={{backgroundColor: `${colorImage}`}}>
                <Image width={132} height={174} src={imagePath ? imagePath : 'https://imgv2-1-f.scribdassets.com/img/document/698827662/298x396/91da6ea0cc/0?v=1'} />
            </div>
            <div className="description">
                <h6>{title}</h6>
                <p>{description}</p>
            </div>
        </Link>
    );
}

export default Card;