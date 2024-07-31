"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BaseUrl } from "../../../lib/constant";
import { useAppSelector } from "@/store";
import { useRouter } from "next/navigation";
import {
    FacebookIcon,
    FacebookMessengerIcon,
    FacebookMessengerShareButton,
    FacebookShareButton,
    LineIcon,
    LineShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    TelegramIcon,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton,
    XIcon,
} from "react-share";
import { useTranslations } from "next-intl";
const FormUrlShare = () => {
    const getDocumentUpload = useAppSelector((state) => state.documents.documentUpload);
    const Router = useRouter();
    const urlShare = `${BaseUrl}/${getDocumentUpload.lang}/document/${getDocumentUpload.slug}`;
    const t = useTranslations("Documents");
    return (
        <>
            <div className="max-w-[500px] m-auto share-it">
                <h3 className="font-[600] text-[24px]">{t('Share It')}</h3>
                <div className="flex gap-[16px] mt-[10px]">
                    <Input type={"text"} defaultValue={urlShare} />
                    <Button onClick={() => Router.push(`${urlShare}`, undefined, { shallow: true })} className="bg-sky-700 hover:bg-sky-800 border-sky-700">{t('View')}</Button>
                </div>
                <div className="flex gap-[16px] mt-[16px] flex-wrap justify-center mt-[10px]">
                    <FacebookShareButton
                        url={urlShare}
                    >
                        <FacebookIcon size={32} round />
                    </FacebookShareButton>
                    <WhatsappShareButton
                        url={urlShare}
                    >
                        <WhatsappIcon size={32} round />
                    </WhatsappShareButton>
                    <TwitterShareButton
                        url={urlShare}
                    >
                        <XIcon size={32} round />
                    </TwitterShareButton>
                    <LinkedinShareButton
                        url={urlShare}
                    >
                        <LinkedinIcon size={32} round />
                    </LinkedinShareButton>
                    <TelegramShareButton
                        url={urlShare}
                    >
                        <TelegramIcon size={32} round />
                    </TelegramShareButton>
                    <LineShareButton
                        url={urlShare}
                    >
                        <LineIcon size={32} round />
                    </LineShareButton>
                    <FacebookMessengerShareButton
                        url={urlShare}
                    >
                        <FacebookMessengerIcon size={32} round />
                    </FacebookMessengerShareButton>
                </div>
            </div>
        </>
    );
}

export default FormUrlShare;