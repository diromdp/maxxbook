"use client"
import { FilePlus, Upload, CircleCheckBig } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../../../store';
import { setTabFormatDocument } from '../../../../store/reducer/categoryFilterSlice';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import Steps from 'antd/es/steps';

const FormUploadDOcument = dynamic(() => import("../../../../component/FormUploadDocument"), {
    ssr: false
});
const FormUploadFile = dynamic(() => import("../../../../component/FormUploadFIle"), {
    ssr: false
});
const FormUrlShare = dynamic(() => import("../../../../component/FormUrlShare"), {
    ssr: false
});



const UploadDocument = () => {
    const dispatch = useAppDispatch();
    const tabFormDocument = useAppSelector((state) => state.documents.tabFormDocuments);
    const upload_id = useAppSelector((state) => state.documents.upload_id);
    const hasFetchedData = useRef(false);
    const t = useTranslations('Global');
    
    const checkPositionTabs = () => {
        if(tabFormDocument == 2) {
            dispatch(setTabFormatDocument(0))
        } else if(tabFormDocument == 1) {
            if(upload_id == null) {
                dispatch(setTabFormatDocument(0))
            }
        }
    }

    const onChangeTabs = () => {
        if(tabFormDocument == 1) {
            dispatch(setTabFormatDocument(0))
        }
    }
    
    useEffect(() => {
        if (!hasFetchedData.current) {
            checkPositionTabs();
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
                            onChange={onChangeTabs}
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
                                    icon: <CircleCheckBig />,
                                    disabled: true,
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