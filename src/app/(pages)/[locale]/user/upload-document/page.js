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

const UploadDocument = () => {
    const dispatch = useAppDispatch();
    const tabFormDocument = useAppSelector((state) => state.documents.tabFormDocuments);
    const hasFetchedData = useRef(false);
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
                <div className="screen-layer">
                    <Steps
                        current={tabFormDocument}
                        size="small"
                        items={[
                            {
                                title: 'Upload File Document',
                                icon: <Upload />,
                            },
                            {
                                title: 'Form Document',
                                icon: <FilePlus />,
                            },
                            {
                                title: 'Upload Finished',
                                icon: <CircleCheckBig />
                            }
                        ]}
                    />
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