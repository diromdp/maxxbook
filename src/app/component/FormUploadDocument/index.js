"use client";
import {
    Form,
    FormField,
    FormLabel,
    FormItem
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import { i18nChangeLanguage } from '@wangeditor/editor'
import axios from "axios";
import { urlAPI } from "../../../lib/constant";
import { Separator } from "@/components/ui/separator"

import {
    Card,
    CardContent,
} from "@/components/ui/card";
import {
    Input,
    Select,
} from 'antd';

i18nChangeLanguage('en')
const { TextArea } = Input;


const FormUploadDOcument = () => {
    const [editor, setEditor] = useState(null);
    const [html, setHtml] = useState('')
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [disabled, setDisabled] = useState(true);
    const hasFetchedData = useRef(false);
    const toolbarConfig = {}
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
    const onChange = (value) => {
        console.log(`selected ${value}`);
    };
    const onSearch = (value) => {
        console.log('search:', value);
    };
    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
    const formSchema = z.object({
        title: z.string().min(2, 'Title document is required'),
        category: z.string().nonempty({message: 'Categories are required'}),
        subcategory: z.string().nonempty({message: 'Subcategories are required'}),
        title_seo:z.string().min(2, 'Title Seo document is required'),
        description_seo:z.string().min(2, 'Description Seo document is required'),
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

    const onSubmit = async (values) => {
        let formData = {
            "id": null,
            "slug": null,
            "title": values.title,
            "description": html,
            "title_seo": values.title_seo,
            "description_seo": values.description_seo,
            "category_id": values.category,
            "sub_category_id": values.subcategory,
            "upload_id": null,
            "lang": "id"

        }
        await axios.post(`${urlAPI}backend/customer/user/reset-password`, formData, {
            headers: {
                "Content-Type": "application/json",
                'Accept': "application/json",
                "Authorization": `Bearer ${getToken}`
            }
        })
            .then((data) => {
                if (data.status === 200) {
                    dispatch(setAuthInfoSlice({ ...getInfoUser, name: changeName }))
                    api.success({
                        message: `Successfully change passwod`,
                        description: 'Congratulations you have been successfully changed your passwod'
                    })
                    setEditInput(false);
                }
            })
            .catch(function (error) {
                if (error.response) {
                    openNotification(error.response.data.message)
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
    const getSubCategories = async () => {
        await axios.get(`${urlAPI}backend/customer/categories`, {
            headers: {
                "Content-Type": "application/json",
                'Accept': "application/json",
            }
        })
            .then((data) => {
                if (data.status === 200) {
                    const dataJson = data.data;
                    console.log(dataJson);
                    let extractData = []
                    dataJson.map((item) => {
                        const items = {
                            value: item.id,
                            label: item.name
                        }
                        extractData.push(items);
                    })
                    setCategories(extractData);
                    console.log(extractData)
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
                    console.log(dataJson);
                    let extractData = []
                    dataJson.map((item) => {
                        const items = {
                            value: item.id,
                            label: item.name
                        }
                        extractData.push(items);
                    })
                    setCategories(extractData);
                    console.log(extractData)
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
        <Card>
            <CardContent>
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
                                            onSearch={onSearch}
                                            filterOption={filterOption}
                                            options={categories}
                                            className="form-select"
                                            {...field}
                                        />
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
                                            onChange={onChange}
                                            onSearch={onSearch}
                                            filterOption={filterOption}
                                            disabled={disabled}
                                            options={subCategories}
                                            className="form-select"
                                            {...field}
                                        />
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
                        <div className="flex items-center gap-[16px]">
                            <Button className="mt-[32px] w-[150px] bg-blue-700 hover:bg-blue-800" type="submit">Submit</Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}

export default FormUploadDOcument;