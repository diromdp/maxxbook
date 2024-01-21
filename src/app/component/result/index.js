import { useState } from "react";
import Card from "../cartItem";
import CardLoading from "../cardLoading";

const ResultShow = ({ isLoading }) => {
    const dummys = [
        {
            title: 'Matimatic with images example',
            description: 'lorem ipsum dolor sit amet, con',
            images: {
                cover_bacground: 'bg-slate-300',
                urlPath: 'https://imgv2-1-f.scribdassets.com/img/document/698827662/298x396/91da6ea0cc/0?v=1'
            }
        },
        {
            title: 'Matimatic with images example',
            description: 'lorem ipsum dolor sit amet, con',
            images: {
                cover_bacground: 'bg-red-300',
                urlPath: 'https://imgv2-1-f.scribdassets.com/img/document/698827662/298x396/91da6ea0cc/0?v=1'
            }
        },
        {
            title: 'Matimatic with images example',
            description: 'lorem ipsum dolor sit amet, con',
            images: {
                cover_bacground: 'bg-green-300',
                urlPath: 'https://imgv2-1-f.scribdassets.com/img/document/698827662/298x396/91da6ea0cc/0?v=1'
            }
        },
        {
            title: 'Matimatic with images example',
            description: 'lorem ipsum dolor sit amet, con',
            images: {
                cover_bacground: 'bg-yellow-300',
                urlPath: 'https://imgv2-1-f.scribdassets.com/img/document/698827662/298x396/91da6ea0cc/0?v=1'
            }
        }, {
            title: 'Matimatic with images example',
            description: 'lorem ipsum dolor sit amet, con',
            images: {
                cover_bacground: 'bg-green-300',
                urlPath: 'https://imgv2-1-f.scribdassets.com/img/document/698827662/298x396/91da6ea0cc/0?v=1'
            }
        }, {
            title: 'Matimatic with images example',
            description: 'lorem ipsum dolor sit amet, con',
            images: {
                cover_bacground: 'bg-black',
                urlPath: 'https://imgv2-1-f.scribdassets.com/img/document/698827662/298x396/91da6ea0cc/0?v=1'
            }
        }, {
            title: 'Matimatic with images example',
            description: 'lorem ipsum dolor sit amet, con',
            images: {
                cover_bacground: 'bg-black',
                urlPath: 'https://imgv2-1-f.scribdassets.com/img/document/698827662/298x396/91da6ea0cc/0?v=1'
            }
        }, {
            title: 'Matimatic with images example',
            description: 'lorem ipsum dolor sit amet, con',
            images: {
                cover_bacground: 'bg-black',
                urlPath: 'https://imgv2-1-f.scribdassets.com/img/document/698827662/298x396/91da6ea0cc/0?v=1'
            }
        }
    ]
    return (
        <div className="result-show">
            {
                !isLoading ? dummys && dummys.map((item, index) => {
                    return (
                        <Card
                            key={index}
                            colorImage={item.images.cover_bacground}
                            imagePath={item.images.urlPath}
                            title={item.title}
                            description={item.description} />
                    )
                }) :
                    <>
                        {[...Array(8)].map((x, i) =>
                            <CardLoading key={i} />
                        )}
                    </>
            }

        </div>
    );
}

export default ResultShow;