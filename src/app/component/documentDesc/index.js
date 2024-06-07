'use client';
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton"
import dayjs from "dayjs";

import { useState, useEffect, useRef } from "react";
import { urlAPI } from "../../../lib/constant";
import axios from "axios";
import 'dayjs/locale/id';
import localeData from 'dayjs/plugin/localeData';
import { saveAs } from 'file-saver';
import { formatNumber } from "../../../lib/utils";
import { useTranslations } from "next-intl";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

dayjs.extend(localeData);
dayjs.locale('id');

const DocumentDesc = ({ slug }) => {
    const [documentData, setDocumentData] = useState();
    const [isLoading, setLoading] = useState(true);
    const hasFetchedData = useRef(false);
    const t = useTranslations('Documents');

    const fileDocument = [
        { uri: documentData ? documentData.url : '' }
    ]

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
                    console.log(data.data)
                    setDocumentData(data.data)
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

    useEffect(() => {
        if (!hasFetchedData.current) {
            getDocumentbySlug();
            hasFetchedData.current = true;
        }
    }, 100);

    console.log(documentData && documentData);

    return (
        <div className="document-Desc h-[100vh] w-full">
            <div className="views-total-pages">
                <div className="item">
                    {
                        isLoading ?
                            <Skeleton className="h-4 w-[200px]" /> :
                            <>
                                <span className="title">{formatNumber(documentData && documentData.statistics ? documentData.statistics : 0)} {t('views')}</span><span className="separator">.</span>
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
                                    documentData && documentData.user_id == null ? <Link href={'#'}>Admin Maxibook</Link> : <Link href={'/'}>Shadab Shaikh</Link>
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
                            <div dangerouslySetInnerHTML={{__html: documentData && documentData.description}}>
                            </div>
                        </>
                }

            </div>
            <div className="download">
                <button className="button-download" onClick={() => downloadFile(documentData && documentData.url, documentData && documentData.upload.file_name)}>Download Document</button>
            </div>
            <div className="pdf-viewer">
                {
                    documentData && <DocViewer documents={fileDocument} pluginRenderers={DocViewerRenderers} />
                }
            </div>
        </div>
    );
}

export default DocumentDesc;
