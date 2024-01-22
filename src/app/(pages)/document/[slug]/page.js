import Image from "next/image";
import Link from "next/link";
import DocumentDesc from "@/app/component/documentDesc";
import PlaceAdsance from "@/app/component/placeAdsence";

const documentPage = () => {
    return (
        <div className="document-page">
            <div className="mx-auto w-full max-w-screen-xl">
                <div className="flex flex-row gap-[16px]">
                    <div className="w-[70%] flex flex-col items-center relative">
                        <DocumentDesc file={'https://media.neliti.com/media/publications/122953-EN-inserting-local-culture-in-english-langu.pdf'} />
                        <PlaceAdsance className="mt-[16px] absolute bottom-0" type={'Leaderboard'} />
                    </div>
                    <div className="w-[30%]">
                        <div className="another-document">
                            <div className="adds flex flex-col items-center">
                                <PlaceAdsance type={'Large rectangle'} />
                            </div>
                            <div className="another-document-content">
                                <div className="title-document-content">
                                    <h2>Anda mungkin juga menyukai</h2>
                                </div>
                                {[...Array(6)].map((x, i) => {
                                    return (
                                        <Link href={'/'} key={i} className="item-content">
                                            <div className="img">
                                                <Image width={132} height={174} src={'https://imgv2-1-f.scribdassets.com/img/document/632331178/149x198/91cac954d5/1679274200?v=1'} />
                                            </div>
                                            <div className="description">
                                                <div className="type-totals">
                                                    <span className="title">Document</span>
                                                    <span className="separator">.</span>
                                                    <span className="title">37 Halaman</span>
                                                </div>
                                                <div className="title-document">
                                                    <h4>Makro Kel 4 Prekonomian</h4>
                                                    <span className="people-name">Arif Kurniawan</span>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                })}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default documentPage;