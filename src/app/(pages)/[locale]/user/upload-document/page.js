"use client"
import {
    Steps
} from 'antd';
import { FilePlus, Upload, CircleCheckBig } from 'lucide-react';
import FormUploadDOcument from '../../../../component/FormUploadDocument';
import FormUploadFile from '../../../../component/FormUploadFIle';
import FormUrlShare from '../../../../component/FormUrlShare';
import { useAppSelector, useAppDispatch } from '../../../../store';
import { setTabFormatDocument } from '../../../../store/reducer/categoryFilterSlice';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';

const UploadDocument = () => {
    const dispatch = useAppDispatch();
    const tabFormDocument = useAppSelector((state) => state.documents.tabFormDocuments);
    const hasFetchedData = useRef(false);
    const t = useTranslations('Global');
    
    useEffect(() => {
        if (!hasFetchedData.current) {
            if(tabFormDocument == 2) {
                dispatch(setTabFormatDocument(0));
            }
            hasFetchedData.current = true;
        }
    }, [])
    return (
        <>
            <div className="upload-document--form">
                <div className="screen-layer min-h-dvh">
                    <div className="px-[16px] lg:px-0">
                        <Steps
                            current={tabFormDocument}
                            size="small"
                            items={[
                                {
                                    title: t('Upload File Document'),
                                    icon: <Upload />,
                                },
                                {
                                    title: t('Form Document'),
                                    icon: <FilePlus />,
                                },
                                {
                                    title: t('Upload Finished'),
                                    icon: <CircleCheckBig />
                                }
                            ]}
                        />
                    </div>
                    
                    <div className="tabs-content">
                        {
                            tabFormDocument == 0 ?
                                <FormUploadFile /> : tabFormDocument == 1 ? <FormUploadDOcument /> : tabFormDocument == 2 ? <FormUrlShare/> : <></>
                        }

                    </div>
                </div>
            </div>
        </>
    );
}

export default UploadDocument;