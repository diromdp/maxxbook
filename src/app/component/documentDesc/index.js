'use client';
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton"
import dayjs from "dayjs";
import {
    FacebookIcon,
    FacebookShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton,
    XIcon,
} from "react-share";
import { useLocale } from "next-intl";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { urlAPI } from "../../../lib/constant";
import axios from "axios";
import 'dayjs/locale/id';
import localeData from 'dayjs/plugin/localeData';
import { saveAs } from 'file-saver';
import { formatNumber } from "../../../lib/utils";
import { useTranslations } from "next-intl";
import PDFViewer from "../pdfViewer";
import {
    Bookmark
} from "lucide-react";
import { notification } from 'antd';

import { useAppSelector, useAppDispatch } from "../../store";
import { setOwnerOfUpload } from "../../store/reducer/categoryFilterSlice";

dayjs.extend(localeData);
dayjs.locale('id');

const DocumentDesc = ({ slug }) => {
    const dispatch = useAppDispatch();
    const [documentData, setDocumentData] = useState();
    const [isLoading, setLoading] = useState(true);
    const [bookmark, setBookmark] = useState(false);
    const hasFetchedData = useRef(false);
    const getToken = useAppSelector((state) => state.authUserStorage.authUser);
    const token = getToken.access_token;
    const [api, contextHolder] = notification.useNotification();
    const locale = useLocale();
    const t = useTranslations('Documents');
    const urlShare = window.location.href;
    const router = useRouter();

    const fileDocument = [
        { uri: documentData ? documentData.url : '' }
    ]

    const getDocumentbySlugToken = async () => {
        await axios.get(`${urlAPI}backend/customer/documents/detail/${slug}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
            .then((data) => {
                if (data.status === 200) {
                    setLoading(false)
                    const dataDocument = data.data;
                    setDocumentData(data.data)
                    setBookmark(dataDocument.is_saved)
                }
            })
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response.data.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });
    };

    const getDocumentbySlug = async () => {

        await axios.get(`${urlAPI}backend/documents/detail/${slug}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': "application/json",
            }
        })
            .then((data) => {
                if (data.status === 200) {
                    setLoading(false)
                    const dataDocument = data.data;
                    setDocumentData(data.data)
                    setBookmark(dataDocument.is_saved)
                }
            })
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response.data.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });
    };

    const downloadFile = async (fileUrl, fileName) => {
        try {
            const response = await fetch(fileUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const blob = await response.blob();
            saveAs(blob, fileName);
        } catch (error) {
            console.error('Error downloading the file:', error);
        }
    };

    const bookmarkSaved = async () => {
        await axios.put(`${urlAPI}backend/customer/documents/${documentData.id}/statistics/saved`, {}, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
            .then((data) => {
                if (data.status === 200) {
                    setBookmark(!bookmark);
                    api.info({
                        message: "Saved your Document",
                        description: "Your document has been saved"
                    })
                }
            })
            .catch(function (error) {
                if (error.response) {
                    router.push('/login');
                    console.log(error.response.data.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });
    }

    const getInfoUserUpload = () => {
        const dataUser = documentData.user;
        dispatch(setOwnerOfUpload(dataUser));
    }

    useEffect(() => {
        if (!hasFetchedData.current) {
            if(token) {
                getDocumentbySlugToken();
            } else {
                getDocumentbySlug();
            }
            hasFetchedData.current = true;
        }
    }, 100);

    return (
        <div className="document-Desc h-full min-h-[100vh] w-full">
            {contextHolder}
            <div className="views-total-pages">
                <div className="item">
                    {
                        isLoading ?
                            <Skeleton className="h-4 w-[200px]" /> :
                            <>
                                <span className="title">{formatNumber(documentData && documentData.statistics ? documentData.statistics.views : 0)} {t('views')}</span><span className="separator">.</span>
                            </>
                    }
                </div>
                <div className="item">
                    {
                        isLoading ?
                            <Skeleton className="h-4 w-[120px]" /> :
                            <span className="title">{documentData && documentData.page_count ? documentData.page_count : 0} {t('pages')}</span>

                    }
                </div>
            </div>
            <div className="title-document">
                {
                    isLoading ?
                        <Skeleton className="h-5 w-[250px] mt-[16px]" /> :
                        <h1>{documentData && documentData.title}</h1>
                }
            </div>
            <div className="uploadBy">
                {
                    isLoading ?
                        <Skeleton className="h-4 w-[350px]" /> :

                        <p>{t('uploads')} &nbsp;
                            <>
                                {
                                    documentData && documentData.user_id == null ? <Link href={'#'}>Admin Maxibook</Link> : <Link href={`/${locale}/look/${documentData.user_id}`} onClick={() => getInfoUserUpload()}>{documentData.user.name}</Link>
                                }
                            </>
                            , {documentData && dayjs(documentData.upload.created_at).format("D MMMM YYYY")}
                        </p>
                }
            </div>
            <div className="content-description">
                {
                    isLoading ?
                        <>
                            <Skeleton className="h-8 mb-[10px] w-[80%]" />
                            <Skeleton className="h-8 mb-[10px] w-[80%]" />
                            <Skeleton className="h-8 mb-[10px] w-[80%]" />
                            <Skeleton className="h-8 mb-[10px] w-[80%]" />
                        </> :
                        <>
                            <div dangerouslySetInnerHTML={{ __html: documentData && documentData.description }}>
                            </div>
                        </>
                }

            </div>
            <div className="share-link">
                <div className="bookmark-container">
                    <button type="button" onClick={() => bookmarkSaved()}>
                        <Bookmark fill={`${bookmark ? '#000' : '#fff'}`} />
                    </button>
                </div>
                <div className="sosmed">
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

                </div>
            </div>
            <div className="download">
                <button className="button-download" onClick={() => downloadFile(documentData && documentData.url, documentData && documentData.upload.file_name)}>Download Document</button>
            </div>
            {/* <div className="pdf-viewer">
                {
                    documentData &&
                    <DocViewer
                        documents={fileDocument}
                        className="!h-[1086px]"
                        config={{
                            header: {
                                disableHeader: false,
                                disableFileName: false,
                                retainURLParams: false
                            }
                        }} 
                        pluginRenderers={DocViewerRenderers} />
                }
            </div> */}
        </div>
    );
}

export default DocumentDesc;
