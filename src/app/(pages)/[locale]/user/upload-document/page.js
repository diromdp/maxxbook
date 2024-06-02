"use client"
import {
    Steps
} from 'antd';
import { FilePlus, Upload, CircleCheckBig } from 'lucide-react';
import { useState } from 'react';
import FormUploadDOcument from '../../../../component/FormUploadDocument';
import FormUploadFile from '../../../../component/FormUploadFIle';
import { useAppSelector } from '../../../../store';
import { notification } from 'antd';

const UploadDocument = () => {
    const tabFormDocument = useAppSelector((state) => state.documents.tabFormDocuments);

    return (
        <>
            <div className="upload-document--form">
                <div className="mx-auto w-full max-w-screen-xl">
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
                                <FormUploadFile /> : tabFormDocument == 1 ? <FormUploadDOcument /> : tabFormDocument == 2 ? <></> : <></>
                        }

                    </div>
                </div>
            </div>
        </>
    );
}

export default UploadDocument;