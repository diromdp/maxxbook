import Link from "next/link";
import Image from 'next/image'
import icDoc from '../../assets/images/ic-doc.png';
import icDoc2 from '../../assets/images/ic-doc-2.png';
import icDoc3 from '../../assets/images/ic-doc-3.png';


const Categories = ({ data }) => {
    return ( 
        <div className="categories">
            <div className="container m-auto">
                <div className="content">
                    <Link href={'/'} className="item">
                        <span>Science & Mathematics</span>
                        <Image className="image" src={icDoc} />
                    </Link>
                     <Link href={'/'} className="item">
                        <span>Fisika</span>
                        <Image className="image" src={icDoc2} />
                    </Link>
                     <Link href={'/'} className="item">
                        <span>Biologi</span>
                        <Image className="image" src={icDoc3} />
                    </Link>
                     <Link href={'/'} className="item">
                        <span>Bahasa</span>
                        <Image className="image" src={icDoc} />
                    </Link>
                     <Link href={'/'} className="item">
                        <span>Ekonomi</span>
                        <Image className="image" src={icDoc2} />
                    </Link>
                     <Link href={'/'} className="item">
                        <span>Hukum</span>
                        <Image className="image" src={icDoc3} />
                    </Link>
                </div>
                <div className="see-more">
                    <Link href={'/'}>See All Categories</Link>
                </div>
            </div>
        </div> 
    );
}
 
export default Categories;