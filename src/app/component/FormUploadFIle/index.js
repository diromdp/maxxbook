import { Upload } from 'antd';
import { CloudUpload } from 'lucide-react';
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { urlAPI } from "../../../lib/constant";
import { useAppDispatch, useAppSelector } from "../../store";
import { setUploadId, setTabFormatDocument} from '../../store/reducer/categoryFilterSlice';
import { notification } from 'antd';

const { Dragger } = Upload;

const FormUploadFile = () => {

    const getToken = useAppSelector((state) => state.authUserStorage.authUser);
    const token = getToken.access_token;
    const [api, contextHolder] = notification.useNotification();
    const dispatch = useAppDispatch();

    const props = {
        name: 'file',
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
                dispatch(setTabFormatDocument(1));
                dispatch(setUploadId(info.file.response.upload_id));
                api.success({
                    message: `Successfully uploaded`,
                    description: `${info.file.name} has been uploaded to our server.`
                });
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
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">
                            Support for a single upload. Strictly prohibited from uploading company data or other
                            banned files.
                        </p>
                    </Dragger>
                </CardContent>
            </Card>
        </>

    );
}

export default FormUploadFile;