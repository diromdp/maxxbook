"use client"
import {
    Button,
    Form,
    Input,
    Select,
} from 'antd';
import { useRef, useState, useEffect} from "react";


const UploadDocument = () => {
    return (
        <div className="upload-document--form">
            <div className="container">
                <Form
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 14,
                    }}
                    layout="horizontal"
                    initialValues={{
                        size: 'large',
                    }}
                    size={'large'}
                    style={{
                        maxWidth: 600,
                    }}
                >
                    <div className="form-item">
                        <label>
                            Title Of Document
                        </label>
                        <Input />
                    </div>
                    <div className="form-item">
                        <label>
                            Description
                        </label>
                      
                    </div>
                    <Form.Item label="Select">
                        <Select>
                            <Select.Option value="demo">Demo</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Button">
                        <Button>Upload Document</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default UploadDocument;