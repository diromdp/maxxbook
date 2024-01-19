
import Image from "next/image";
import Link from "next/link";

const Card = ({ colorImage, imagePath, title, description }) => {
    return (
        <Link href={'/'} className="result-show-item">
            <div className={`image-cover ${colorImage}`}>
                <Image width={132} height={174} src={imagePath} />
            </div>
            <div className="description">
                <h6>{title}</h6>
                <p>{description}</p>
            </div>
        </Link>
    );
}

export default Card;