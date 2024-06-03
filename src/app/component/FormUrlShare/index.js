import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BaseUrl } from "../../../lib/constant";
import { useAppSelector } from "../../store";
import { useRouter } from "next/navigation";
import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookMessengerIcon,
    FacebookMessengerShareButton,
    FacebookShareButton,
    LineIcon,
    LineShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    MailruIcon,
    MailruShareButton,
    TelegramIcon,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton,
    XIcon,
} from "react-share";
const FormUrlShare = () => {
    const getDocumentUpload = useAppSelector((state) => state.documents.documentUpload);
    const Router = useRouter();
    const urlShare = `${BaseUrl}/${getDocumentUpload.lang}/document/${getDocumentUpload.slug}`;
    return (
        <>
            <div className="max-w-[500px] m-auto share-it">
                <h3 className="font-[600] text-[24px]">Share It</h3>
                <div className="flex gap-[16px] mt-[10px]">
                    <Input type={"text"} defaultValue={urlShare} />
                    <Button onClick={() => Router.push(`${urlShare}`, undefined, { shallow: true })} className="bg-sky-700 hover:bg-sky-800 border-sky-700">View</Button>
                </div>
                <div className="flex gap-[16px] mt-[10px]">
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
                    <MailruShareButton
                        url={urlShare}
                    >
                        <MailruIcon size={32} round />
                    </MailruShareButton>
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
                    <EmailShareButton
                        url={urlShare}
                    >
                        <EmailIcon size={32} round />
                    </EmailShareButton>
                </div>
            </div>
        </>
    );
}

export default FormUrlShare;