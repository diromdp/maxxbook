
"use client";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";

const Card = async({ colorImage, imagePath, title, description, className, slug, priority }) => {
    const locale = useLocale();
    
    return (
        <Link href={`/${locale}/document/${slug}`} target="_blank" className={`result-show-item ${className ? className : ""}`}>
            <div className={`image-cover relative aspect-[1/1] w-full overflow-hidden`} style={{backgroundColor: `${colorImage}`}}>
                <Image 
                    alt={slug} 
                    fill
                    className="object-cover max-w-[132px] max-h-[174px] m-auto"
                    priority={priority}
                    sizes="10vw"
                    src={imagePath ? imagePath : 'https://imgv2-1-f.scribdassets.com/img/document/698827662/298x396/91da6ea0cc/0?v=1'} />
            </div>
            <div className="description">
                <h6>{title}</h6>
                <div dangerouslySetInnerHTML={{__html: description}} />
            </div>
        </Link>
    );
}

export default Card;