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
    Upload
} from 'antd';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { urlAPI } from "../../../../../../lib/constant";
import { useAppSelector, useAppDispatch } from "../../../../../store";
import { setUploadId } from "../../../../../store/reducer/categoryFilterSlice";
import { setAuthSlice } from "../../../../../store/reducer/authSlice";
const { TextArea } = Input;

const EditUploadFile = ({ params }) => {
    const dispatch = useAppDispatch();
    const { slug } = params;
    const [categories, setCategories] = useState([]);
    const [idCategory, setIdCategory] = useState();
    const [subCategories, setSubCategories] = useState([]);
    const [documentOwn, setDocumentOwn] = useState();
    const [disabled, setDisabled] = useState(true);
    const [isLoading, setLoading] = useState(true);
    const getToken = useAppSelector((state) => state.authUserStorage.authUser);
    const getUplaodID = useAppSelector((state) => state.documents.upload_id);
    const t = useTranslations("Documents");
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
    const logoutUser = () => {
        dispatch(setAuthSlice({ ...getToken, access_token: null, expires_at: null }))
        router.push('/');
    }
    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
    const formSchema = z.object({
        title: z.string().min(10, 'Title minumum 10 characters'),
        category: z.string().optional(),
        subcategory: z.string().optional(),
        description_seo: z.string().min(160, 'Description document minimum 160 characters'),
    });
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            category: "",
            subcategory: "",
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
            "description": values.description_seo,
            "title_seo": values.title,
            "description_seo": values.description_seo,
            "category_id": idCategory ? idCategory : values.category,
            "sub_category_id": documentOwn.sub_category_id ? documentOwn.sub_category_id : values.subcategory ,
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
                    router.push(`/${locale}/user/document-own`, undefined, { shallow: true })
                }
            })
            .catch(function (error) {
                if (error.response) {
                    if(error.response.status === 401) {
                        logoutUser();
                    }
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
                    if(error.response.status === 401) {
                        logoutUser();
                    }
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
                            label: item.name,
                            id: item.id
                        }
                        extractData.push(items);
                    })
                    setCategories(extractData);
                }
            })
            .catch(function (error) {
                if (error.response) {
                    if(error.response.status === 401) {
                        logoutUser();
                    }
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
                    if (dataJson && dataJson.category_id) {
                        setDisabled(false);
                        getSubCategories(dataJson && dataJson.category_id);
                    }

                    if(categories) {
                        const filterCategory = categories.filter(item => item.id === dataJson.category_id);
                        console.log(filterCategory);
                    }
                    setTimeout(() => {
                        form.setValue("title", dataJson && dataJson.title);
                        form.setValue("title_seo", dataJson && dataJson.title_seo);
                        form.setValue("description_seo", dataJson && dataJson.description_seo);
                        form.setValue("category", dataJson && dataJson.category && dataJson.category.name ); 
                        form.setValue("subcategory", dataJson && dataJson.sub_category && dataJson.sub_category.name); 
                    }, 250);
                }
            })
            .catch(function (error) {
                if (error.response) {
                    if(error.response.status === 401) {
                        logoutUser();
                    }
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

        const fetchData = async () => {
            await getCategories();
            await getDetailDocumentOwn();


        }
        if (!hasFetchedData.current) {
            fetchData();
            hasFetchedData.current = true;
        }
    }, [])
    return (
        <>
            <div className="upload-document--form">
                <div className="screen-layer px-[16px] lg:px-[24px]">
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
                                                        <FormLabel>{t('Title Document')}</FormLabel>
                                                        <FormItem>
                                                            <Input
                                                                placeholder={t('Title Document')}
                                                                {...field}
                                                            />
                                                            <FormMessage />
                                                        </FormItem>
                                                    </div>

                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="description_seo"
                                                render={({ field }) => (
                                                    <div className="form-item mt-[16px]">
                                                        <FormLabel>{t('Title Description SEO')}</FormLabel>
                                                        <FormItem>
                                                            <TextArea
                                                                className="!min-h-[200px]"
                                                                rows={5}
                                                                {...field}
                                                            />
                                                            <FormMessage />
                                                        </FormItem>
                                                    </div>

                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="category"
                                                render={({ field }) => (
                                                    <div className="pt-[16px] form-item">
                                                        <FormLabel>{t('Category')}</FormLabel>
                                                        <FormItem>
                                                            <Select
                                                                showSearch
                                                                placeholder={t('Select a category')}
                                                                optionFilterProp="children"
                                                                onSelect={onChange}
                                                                defaultValue={field.value}
                                                                defaultActiveFirstOption
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
                                                render={({ field }) => {
                                                    return (
                                                        <div className="pt-[16px] form-item">
                                                            <FormLabel>{t('Sub Category')}</FormLabel>
                                                            <FormItem>
                                                                <Select
                                                                    showSearch
                                                                    placeholder={t('Select a sub category')}
                                                                    optionFilterProp="children"
                                                                    filterOption={filterOption}
                                                                    disabled={disabled}
                                                                    defaultValue={field.value}
                                                                    defaultActiveFirstOption
                                                                    options={subCategories}
                                                                    className="form-select"
                                                                    {...field}
                                                                />
                                                                <FormMessage />
                                                            </FormItem>
                                                        </div>
                                                    )
                                                }}
                                            />
                                            <div className="mt-[32px] flex flex-col gap-[32px]">
                                                <Upload {...props}>
                                                    <Button type="button" icon={<Upload />}>{t('Click to Upload')}</Button>
                                                </Upload>
                                            </div>
                                            <div className="flex items-center gap-[16px]">
                                                <Button className="mt-[32px] w-[150px] bg-blue-700 hover:bg-blue-800" type="submit">{t("Submit")}</Button>
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

export default EditUploadFile;