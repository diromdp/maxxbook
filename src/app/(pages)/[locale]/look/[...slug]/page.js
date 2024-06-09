"use client";
import Card from "@/app/component/cartItem";
import CardLoading from "@/app/component/cardLoading";
import { useState, useEffect } from "react";


const LookUserDetail = ({ params }) => {
    const [isLoading, setIsloading] = useState(true);
    const [dataDocument, setDataDocument] = useState([]);
    
    return (
        <>
            <div className="look-user-detail">
                <div className="bg-sky-700 py-[50px] min-h-[130px]">
                    <div className="screen-layer user-info">
                        <div className="circle">
                            DP
                        </div>
                        <div className="name">
                            Dirom Purbowiseno
                        </div>
                    </div>
                </div>
                <div className="list-document">
                    <div className="screen-layer">
                        <div className="result-show">
                            {
                                !isLoading ? dataDocument && dataDocument.map((item, index) => {
                                    return (
                                        <Card
                                            key={index}
                                            colorImage={item.color}
                                            imagePath={item.thumb_url}
                                            title={item.title}
                                            description={item.description}
                                            slug={`${item.slug}`} />
                                    )
                                }) :
                                    <>
                                        {[...Array(12)].map((x, i) =>
                                            <CardLoading key={i} />
                                        )}
                                    </>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LookUserDetail;