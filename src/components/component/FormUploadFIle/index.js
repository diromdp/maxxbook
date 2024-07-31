"use client";
import { Upload } from 'antd';
import { CloudUpload } from 'lucide-react';
import { notification } from 'antd';
import { useTranslations, useLocale } from 'next-intl';
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { urlAPI } from "../../../lib/constant";
import { useAppDispatch, useAppSelector } from "@/store";
import { setUploadId, setTabFormatDocument} from '@/store/reducer/categoryFilterSlice';


const { Dragger } = Upload;

const FormUploadFile = () => {

    const getToken = useAppSelector((state) => state.authUserStorage.authUser);
    const token = getToken.access_token;
    const [api, contextHolder] = notification.useNotification();
    const dispatch = useAppDispatch();
    const t = useTranslations('Global');
    const locale = useLocale();


    const props = {
        name: 'file',
        accept: '.pdf,doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        multiple: false,
        maxCount: 1,
        action: `${urlAPI}backend/customer/documents`,
        headers: {
            'Accept': "application/json",
            "Authorization": `Bearer ${token}`
        },
        onChange(info) {
            const { status } = info.file;
            if (status === 'done') {
                dispatch(setUploadId(info.file.response.upload_id));
                api.success({
                    message: `Successfully uploaded`,
                    description: `${info.file.name} has been uploaded to our server.`
                });
                dispatch(setTabFormatDocument(1));
            } else if (status === 'error') {
                api.error({
                    message: `Failed uploaded`,
                    description: `${info.file.response.message}`
                });
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };
    
    return (
        <>
            {contextHolder}
            <Card>
                <CardContent>
                    <Dragger {...props}>
                        <p className="flex justify-center">
                            <CloudUpload className='h-[42px] w-[42px] mb-[32px]' />
                        </p>
                        <p className="ant-upload-text">{ locale == 'en' ? 'Click or drag file to this area to upload' : 'Klik atau seret file ke area ini untuk diunggah'}</p>
                        <p className="ant-upload-hint">
                        { locale == 'en' ? 'Support for a single upload. Strictly prohibited from uploading company data or other banned files.' : 'Dukungan untuk satu unggahan. Dilarang keras mengunggah data perusahaan atau lainnya dan file terlarang.'}
                        
                        </p>
                    </Dragger>
                </CardContent>
            </Card>
        </>

    );
}

export default FormUploadFile;