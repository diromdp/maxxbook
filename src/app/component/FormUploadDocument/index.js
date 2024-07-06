"use client";
import {
    Form,
    FormField,
    FormLabel,
    FormItem,
    FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { urlAPI } from "../../../lib/constant";
import { useLocale } from "next-intl";
import { useAppDispatch, useAppSelector } from "../../store";
import { setTabFormatDocument, setDocumentUpload } from "../../store/reducer/categoryFilterSlice";
import { useTranslations } from "next-intl";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import {
    Input,
    Select,
    notification
} from 'antd';

const { TextArea } = Input;


const FormUploadDOcument = () => {
    const dispatch = useAppDispatch();
    const [api] = notification.useNotification();
    const [editor, setEditor] = useState(null);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [idCategory, setIdCategory] = useState();
    const [disabled, setDisabled] = useState(true);
    const hasFetchedData = useRef(false);
    const getToken = useAppSelector((state) => state.authUserStorage.authUser);
    const getUplaodID = useAppSelector((state) => state.documents.upload_id);
    const t = useTranslations("Documents");
    const token = getToken.access_token;
    const toolbarConfig = {};
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
        title: z.string().min(10, 'Title minumum 10 characters').max(70, 'Title maximal 70 characters'),
        category: z.string().nonempty({ message: 'Categories are required' }),
        subcategory: z.string().optional(),
        description_seo: z.string().min(160, 'Description document minimum Characters is 160').max(300, 'Description document maximum Characters is 300'),
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

    const onSubmit = async (values) => {
        let formData = {
            "id": null,
            "slug": null,
            "title": values.title,
            "description": values.description_seo,
            "title_seo": values.title,
            "description_seo": values.description_seo,
            "category_id": idCategory,
            "sub_category_id": values.subcategory,
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
                    dispatch(setTabFormatDocument(2));
                    dispatch(setDocumentUpload(data.data.data));
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
                    console.log(dataJson);
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

    const onChange = () => {
        const values = form.getValues()
        form.resetField('subcategory');
        getSubCategories(values && values.category)
    };

    useEffect(() => {
        if (!hasFetchedData.current) {
            getCategories();
            hasFetchedData.current = true;
        }
    });

    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])
    return (
        <>
            <Card>
                <CardContent>
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
                                                maxLength={71}
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
                                        <FormLabel>{t('Title Description')}</FormLabel>
                                        <FormItem>
                                            <TextArea
                                                className="!min-h-[200px]"
                                                maxLength={300}
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
                                        <FormLabel>{t('Sub Category')}</FormLabel>
                                        <FormItem>
                                            <Select
                                                showSearch
                                                placeholder={t('Select a sub category')}
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
                            <div className="flex items-center gap-[16px]">
                                <Button className="mt-[32px] w-[150px] bg-blue-700 hover:bg-blue-800" type="submit">{t('Submit')}</Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </>

    );
}

export default FormUploadDOcument;