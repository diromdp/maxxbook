"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import dynamic from "next/dynamic";
import { useEffect, useState, useRef, useMemo } from "react";
import { z } from "zod";
import {
    Card,
    CardContent,
} from "@/components/ui/card";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import axios from "axios";
import { urlAPI } from "../../../../../lib/constant";
import { useCookies } from "react-cookie";

import { notification, Spin } from 'antd';
import { useSearchParams, useRouter } from 'next/navigation'

const JoditEditor = dynamic(() => import("jodit-react"), {
    ssr: false,
});


const EditPages = () => {
    const editor = useRef(null);
    const [cookies] = useCookies(["token"])
    const [api, contextHolder] = notification.useNotification();
    const [idCategory, setIdCategory] = useState(null);
    const [getDetail, setGetDetail] = useState();
    const [getCategoryData, setGetCategoryData] = useState([]);
    const [getSubCategoryData, setSubCategoryData] = useState([]);
    const [disabled, setDisabled] = useState(true);
    const [disabledUploadButton, setDisabledUploadButton] = useState(true);
    const [htmlEditor, setHtmlEditor] = useState();
    const [isloading, setIsLoading] = useState(false);
    const [uploadId, setUploadId] = useState(null);
    const searchParams = useSearchParams();
    const router = useRouter();
    const config = useMemo(
        () => ({
            readonly: false,
        }),
    );

    const openNotification = (val) => {
        api.info({
            message: 'Warning Information',
            description: val,
        });
    };
    const notificationSuccess = () => {
        api.success({
            message: 'Save Successfully',
            description: "Successfully saved to database"
        })
    }
    const notificationUploadfile = () => {
        api.success({
            message: 'Upload File Successfully',
            description: "Successfully uploaded  file to database"
        });
    }
    const formSchema = z.object({
        title: z.string().min(2, {
            message: "Title must be at least 2 characters.",
        }),
        title_seo: z.string().min(2, {
            message: "Title must be at least 2 characters.",
        }),
        description: z.string().min(6, {
            message: "Description must be at least 6 characters.",
        }),
        category_id: z.string().trim().nonempty({ message: "Category is required" }),
        sub_category_id: z.string().trim().nonempty({ message: "Category is required" })
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: searchParams.get('title') ? searchParams.get('title') : "",
            title_seo: getDetail && getDetail.title_seo,
            description: searchParams.get('description') ? searchParams.get('description') : "",
            category_id: searchParams.get('category_id') ? searchParams.get('category_id') : "",
            sub_category_id: getDetail && getDetail.sub_category_id,
        },
    });

    const onSubmit = async (values) => {
        let formData = {
            id: searchParams.get('id'),
            title: values.title,
            title_seo: values.title_seo,
            description: values.description,
            description_seo: htmlEditor,
            category_id: values.category_id,
            sub_category_id: values.sub_category_id,
            upload_id: uploadId ? uploadId : searchParams.get('upload_id') ? searchParams.get('upload_id') : null,
            lang: 'id'
        }

        await axios.put(`${urlAPI}backend/admin/documents`, formData, {
            headers: {
                "Content-Type": "application/json",
                'Accept': "application/json",
                "Authorization": `Bearer ${cookies.token}`
            }
        })
            .then((data) => {
                if (data.status === 200) {
                    setIdCategory(data.data.id);
                    notificationSuccess()
                    router.push("/admin/document");
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

    const uploadImage = async (e) => {
        let inputData = e.target.files[0];
        let formData = new FormData();
        setIsLoading(true);
        formData.append("file", inputData);
        await axios.post(`${urlAPI}backend/admin/documents`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                'Accept': "application/json",
                "Authorization": `Bearer ${cookies.token}`
            }
        })
            .then((data) => {
                if (data.status === 200 || data.status === 201) {
                    setIsLoading(false);
                    setUploadId(data.data.upload_id);
                    notificationUploadfile()
                    setDisabledUploadButton(false);
                }
            })
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response.data.data);
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

    const getCategory = async () => {
        await axios.get(`${urlAPI}backend/admin/categories`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': "application/json",
                "Authorization": `Bearer ${cookies.token}`
            }
        })
            .then((data) => {
                if (data.status === 200) {
                    let result = [];
                    data.data.map((item, index) => {
                        var filterData = {
                            id: item.id,
                            name: item.name,
                        }
                        result.push(filterData)
                    })
                    setGetCategoryData(result)
                }
            })
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response.data.data);
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

    const getDetailDoc = async () => {
        await axios.get(`${urlAPI}backend/admin/documents/${searchParams.get('id')}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': "application/json",
                "Authorization": `Bearer ${cookies.token}`
            }
        })
            .then((data) => {
                if (data.status === 200) {
                    setGetDetail(data.data);
                    setHtmlEditor(data.data.description_seo);
                    form.setValue('sub_category_id', data.data.sub_category_id);
                    form.setValue('title_seo', data.data.title_seo);
                }
            })
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response.data.data);
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

    const getSubCategory = async (val) => {
        await axios.get(`${urlAPI}backend/admin/sub-categories?category_id=${val}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': "application/json",
                "Authorization": `Bearer ${cookies.token}`
            }
        })
            .then((data) => {
                if (data.status === 200) {
                    let result = [];
                    data.data.map((item) => {
                        var filterData = {
                            id: item.id,
                            name: item.name,
                        }
                        result.push(filterData)
                    })
                    setSubCategoryData(result)
                    setDisabled(false);
                }
            })
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response.data.data);
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
        getCategory();
        if (searchParams.get('category_id') || searchParams.get('id')) {
            getSubCategory(searchParams.get('category_id'));
            getDetailDoc();
        }
    }, [])
    return (
        <div className="admin-home">
            {contextHolder}
            <h1 className="title-page">
                Update Document
            </h1>
            <div className="flex gap-[16px]">
                <div style={{ width: "50%" }}>
                    <Card>
                        <CardContent>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem className="mb-[8px]">
                                                <FormLabel>Title</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Title Document" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="title_seo"
                                        render={({ field }) => (
                                            <FormItem className="mb-[8px]">
                                                <FormLabel>Title SEO</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Title Document SEO" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem className="mb-[8px]">
                                                <FormLabel>Description</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="Description" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="">
                                        <FormLabel>Description SEO</FormLabel>
                                        <div className="border border-input rounded-[8px] mt-[8px]">
                                            <JoditEditor
                                                ref={editor}
                                                className="rounded-[8px]"
                                                value={htmlEditor ? htmlEditor : ''}
                                                config={config}
                                                tabIndex={1} // tabIndex of textarea
                                                onBlur={(newContent) => setHtmlEditor(newContent)} // preferred to use only this option to update the content for performance reasons
                                            />
                                        </div>
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name="category_id"
                                        render={({ field }) => (
                                            <FormItem className="mb-[8px]">
                                                <FormLabel>Select Category</FormLabel>
                                                <Select onValueChange={(e) => {
                                                    getSubCategory(e);
                                                    field.onChange(e);
                                                }} defaultValue={field.value} >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select Category" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {
                                                            getCategoryData && getCategoryData.map((category, index) => {
                                                                return <SelectItem key={index} value={category.id}>{category.name}</SelectItem>

                                                            })
                                                        }
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="sub_category_id"
                                        render={({ field }) => (
                                            <FormItem className="mb-[8px]">
                                                <FormLabel>Select Sub Category</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={disabled}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select Subcategory" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {
                                                            getSubCategoryData && getSubCategoryData.map((category, index) => {
                                                                return <SelectItem key={index} value={category.id}>{category.name}</SelectItem>

                                                            })
                                                        }
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="flex items-center gap-[16px]">
                                        <Button className="mt-[16px]" type="submit">Create</Button>
                                        <Button className="mt-[16px]" type="button" onClick={() => router.push("/admin/document")} variant="secondary">Cancel</Button>
                                    </div>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardContent>
                        <Spin spinning={isloading} delay={500}>
                            <div className="grid w-full max-w-sm items-center gap-1.5 mt-4">
                                <label htmlFor="picture" className="mb-2 font-bold text-md">File Document</label>
                                <Input id="picture" type="file" accept=".pdf,.doc,.docx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" onChange={(e) => uploadImage(e)} />
                            </div>
                        </Spin>
                    </CardContent>
                </Card>
            </div>

        </div>
    );
}

export default EditPages;