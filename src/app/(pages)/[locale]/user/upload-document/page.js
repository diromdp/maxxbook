"use client"
import {
    Steps
} from 'antd';
import { FilePlus, Upload, CircleCheckBig } from 'lucide-react';
import { useState } from 'react';
import FormUploadDOcument from '../../../../component/FormUploadDocument';
import axios from "axios";
import { urlAPI } from "../../../../../lib/constant";

const UploadDocument = () => {
    const [stepCurrent , setStepCurrent] = useState(0);

    return (
        <div className="upload-document--form">
            <div className="mx-auto w-full max-w-screen-xl">
                <Steps
                    current={stepCurrent}
                    size="small"
                    items={[
                        {
                            title: 'Form Document',
                            icon: <FilePlus />,
                        },
                        {
                            title: 'Upload File Document',
                            icon: <Upload />,
                        },
                        {
                            title: 'Upload Finished',
                            icon: <CircleCheckBig />
                        }
                    ]}
                />
                <div className="tabs-content">
                    {
                        stepCurrent == 0? 
                            <FormUploadDOcument/> : stepCurrent == 1 ? <></> : stepCurrent == 2 ? <></> : <></>
                    }
                    
                </div>
            </div>
        </div>
    );
}

export default UploadDocument;