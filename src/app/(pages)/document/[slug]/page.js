import Card from "@/app/component/cartItem";
import DocumentDesc from "@/app/component/documentDesc";

const documentPage = () => {
    return (
        <div className="document-page">
            <div className="mx-auto w-full max-w-screen-xl">
                <div className="flex flex-row gap-[16px]">
                    <div className="w-[70%]">
                        <DocumentDesc file={'https://media.neliti.com/media/publications/122953-EN-inserting-local-culture-in-english-langu.pdf'} />
                    </div>
                    <div className="w-[30%]">
                        <div className="another-document">
                            <div className="adds">

                            </div>
                            <div className="another-document-content">
                                {[...Array(8)].map((x, i) => {
                                    return (
                                        <Card
                                            className={''}
                                            colorImage={'bg-blue-300'}
                                            imagePath={'https://imgv2-1-f.scribdassets.com/img/document/698827662/298x396/91da6ea0cc/0?v=1'}
                                            title={'Lorem Ipsum'}
                                            description={'Lorem iipsum, consectetur'}
                                        />
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