"use client";
import {
    Form,
    FormField,
    FormLabel,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import {
    Input,
    Select,
    notification,
    Upload,
    Image
} from 'antd';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import { i18nChangeLanguage } from '@wangeditor/editor';
import axios from "axios";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { urlAPI } from "../../../../../../lib/constant";
import { useAppSelector, useAppDispatch } from "../../../../../store";
import { setUploadId } from "../../../../../store/reducer/categoryFilterSlice";

i18nChangeLanguage('en')
const { TextArea } = Input;

const editUploadFile = ({ params }) => {
    const dispatch = useAppDispatch();
    const { slug } = params;
    const [editor, setEditor] = useState(null);
    const [html, setHtml] = useState('');
    const [categories, setCategories] = useState([]);
    const [idCategory, setIdCategory] = useState();
    const [subCategories, setSubCategories] = useState([]);
    const [documentOwn, setDocumentOwn] = useState();
    const [disabled, setDisabled] = useState(true);
    const [isLoading, setLoading] = useState(true);
    const getToken = useAppSelector((state) => state.authUserStorage.authUser);
    const getUplaodID = useAppSelector((state) => state.documents.upload_id);

    const [api, contextHolder] = notification.useNotification();
    const token = getToken.access_token;
    const hasFetchedData = useRef(false);
    const toolbarConfig = {};
    const router = useRouter();
    const locale = useLocale();
    toolbarConfig.excludeKeys = [
        'headerSelect',
        'italic',
        'group-more-style',
        'group-image',
        'group-video'
    ]
    const editorConfig = {
        placeholder: 'Type here...',
    }

    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
    const formSchema = z.object({
        title: z.string().min(2, 'Title document is required'),
        category: z.string().optional(),
        subcategory: z.string().optional(),
        title_seo: z.string().min(2, 'Title Seo document is required'),
        description_seo: z.string().min(2, 'Description Seo document is required'),
    });
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            category: "",
            subcategory: "",
            title_seo: "",
            description_seo: "",
        },
    });

    const props = {
        name: 'file',
        accept: '.pdf,doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        multiple: false,
        maxCount: 1,
        data: {
            document_id: documentOwn && documentOwn.id
        },
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

    const onChange = () => {
        const values = form.getValues()
        getSubCategories(values && values.category)
    };

    const onSubmit = async (values) => {
        let formData = {
            "id": documentOwn && documentOwn.id,
            "slug": documentOwn && documentOwn.slug,
            "title": values.title,
            "description": html,
            "title_seo": values.title_seo,
            "description_seo": values.description_seo,
            "category_id": idCategory ? idCategory : documentOwn.category_id,
            "sub_category_id": values.subcategory ? values.subcategory : documentOwn.sub_category_id,
            "upload_id": getUplaodID,
            "lang": locale
        }
        await axios.put(`${urlAPI}backend/customer/documents`, formData, {
            headers: {
                "Content-Type": "application/json",
                'Accept': "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
            .then((data) => {
                if (data.status === 200) {
                    api.success({
                        message: "Successfully Created Document",
                        description: "Congratulations you have successfully created a new Document"
                    })
                    router.push(`/${locale}/user/document-own`)
                }
            })
            .catch(function (error) {
                if (error.response) {
                    api.error({
                        message: "Error Submitted Document",
                        description: error.response.data.message
                    })
                    console.log(error.response.data);
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
    const getSubCategories = async (slug) => {
        await axios.get(`${urlAPI}backend/customer/categories/detail/${slug}`, {
            headers: {
                "Content-Type": "application/json",
                'Accept': "application/json",
            }
        })
            .then((data) => {
                if (data.status === 200) {
                    const dataJson = data.data;
                    setIdCategory(dataJson[0].id);
                    let extractData = []
                    dataJson[0].sub_categories.map((item) => {
                        const items = {
                            value: item.id,
                            label: item.name
                        }
                        extractData.push(items);
                    })
                    setSubCategories(extractData);
                    setDisabled(false);
                }
            })
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response.data);
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
    const getCategories = async () => {
        await axios.get(`${urlAPI}backend/customer/categories`, {
            headers: {
                "Content-Type": "application/json",
                'Accept': "application/json",
            }
        })
            .then((data) => {
                if (data.status === 200) {
                    const dataJson = data.data;
                    let extractData = []
                    dataJson.map((item) => {
                        const items = {
                            value: item.slug,
                            label: item.name
                        }
                        extractData.push(items);
                    })
                    setCategories(extractData);
                }
            })
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response.data);
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

    const getDetailDocumentOwn = async () => {
        await axios.get(`${urlAPI}backend/customer/documents/detail/${slug}`, {
            headers: {
                "Content-Type": "application/json",
                'Accept': "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
            .then((data) => {
                if (data.status === 200) {
                    const dataJson = data.data;
                    setLoading(false);
                    setDocumentOwn(dataJson);
                    form.setValue("title", dataJson && dataJson.title);
                    form.setValue("title_seo", dataJson && dataJson.title_seo);
                    form.setValue("description_seo", dataJson && dataJson.description_seo);
                    setHtml(dataJson && dataJson.description)
                    if (dataJson && dataJson.category_id) {
                        setDisabled(false);
                        getSubCategories(dataJson && dataJson.category_id);
                    }
                }
            })
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response.data);
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

    useEffect(() => {
        if (!hasFetchedData.current) {
            getDetailDocumentOwn();
            getCategories();
            hasFetchedData.current = true;
        }
    }, [])
    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])

    return (
        <>
            <div className="upload-document--form">
                <div className="screen-layer">
                    {contextHolder}
                    <Card>
                        <CardContent>
                            {
                                isLoading ? <></> :
                                    <Form {...form} >
                                        <form className="form-group" onSubmit={form.handleSubmit(onSubmit)}>
                                            <FormField
                                                control={form.control}
                                                name="title"
                                                render={({ field }) => (
                                                    <div className="form-item">
                                                        <FormLabel>Title Document</FormLabel>
                                                        <FormItem>
                                                            <Input
                                                                placeholder="Title Document"
                                                                {...field}
                                                            />
                                                            <FormMessage />
                                                        </FormItem>
                                                    </div>

                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="description"
                                                render={({ field }) => (
                                                    <div className="pt-[16px] form-item">
                                                        <FormLabel>Description</FormLabel>
                                                        <div className="border border-slate-700 rounded-[8px]">
                                                            <Toolbar
                                                                editor={editor}
                                                                defaultConfig={toolbarConfig}
                                                                mode="default"
                                                                className="border-b mt-[5px] border-slate-700 rounded-tl-[10px] rounded-tr-[8px] "
                                                            />
                                                            <Editor
                                                                defaultConfig={editorConfig}
                                                                value={html}
                                                                onCreated={setEditor}
                                                                onChange={editor => setHtml(editor.getHtml())}
                                                                mode="default"
                                                                className="mb-[5px]"
                                                                style={{ height: '500px', overflowY: 'hidden' }}
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="category"
                                                render={({ field }) => (
                                                    <div className="pt-[16px] form-item">
                                                        <FormLabel>Category</FormLabel>
                                                        <FormItem>
                                                            <Select
                                                                showSearch
                                                                placeholder="Select a category"
                                                                optionFilterProp="children"
                                                                onSelect={onChange}
                                                                filterOption={filterOption}
                                                                options={categories}
                                                                className="form-select"
                                                                {...field}
                                                            />
                                                            <FormMessage />
                                                        </FormItem>
                                                    </div>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="subcategory"
                                                render={({ field }) => (
                                                    <div className="pt-[16px] form-item">
                                                        <FormLabel>Sub Category</FormLabel>
                                                        <FormItem>
                                                            <Select
                                                                showSearch
                                                                placeholder="Select a sub category"
                                                                optionFilterProp="children"
                                                                filterOption={filterOption}
                                                                disabled={disabled}
                                                                options={subCategories}
                                                                className="form-select"
                                                                {...field}
                                                            />
                                                            <FormMessage />
                                                        </FormItem>
                                                    </div>
                                                )}
                                            />
                                            <Separator className="my-[32px]" />
                                            <FormField
                                                control={form.control}
                                                name="title_seo"
                                                render={({ field }) => (
                                                    <div className="form-item">
                                                        <FormLabel>Title Page SEO</FormLabel>
                                                        <FormItem>
                                                            <Input
                                                                placeholder="Title SEO"
                                                                {...field}
                                                            />
                                                        </FormItem>
                                                    </div>

                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="description_seo"
                                                render={({ field }) => (
                                                    <div className="form-item mt-[16px]">
                                                        <FormLabel>Title Description SEO</FormLabel>
                                                        <FormItem>
                                                            <TextArea
                                                                className="!min-h-[200px]"
                                                                rows={5}
                                                                {...field}
                                                            />
                                                        </FormItem>
                                                    </div>

                                                )}
                                            />

                                            <div className="mt-[32px] flex flex-col gap-[32px]">
                                                <Upload {...props}>
                                                    <Button type="button" icon={<Upload />}>Click to Upload</Button>
                                                </Upload>
                                            </div>
                                            <div className="flex items-center gap-[16px]">
                                                <Button className="mt-[32px] w-[150px] bg-blue-700 hover:bg-blue-800" type="submit">Submit</Button>
                                            </div>
                                        </form>
                                    </Form>
                            }

                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

export default editUploadFile;