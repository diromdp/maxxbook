"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import dynamic from "next/dynamic";
import { useEffect, useState, useRef, useMemo } from "react";
import { z } from "zod";
import { useCookies } from "react-cookie";
import { notification, Spin } from 'antd';
import { useRouter } from 'next/navigation';

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
const JoditEditor = dynamic(() => import("jodit-react"), {
    ssr: false,
});


const AddPages = () => {
    const editor = useRef(null);
    const [cookies] = useCookies(["token"])
    const [api, contextHolder] = notification.useNotification();
    const [idCategory, setIdCategory] = useState(null);
    const [getCategoryData, setGetCategoryData] = useState([]);
    const [getSubCategoryData, setSubCategoryData] = useState([]);
    const [htmlEditor, setHtmlEditor] = useState();
    const [disabled, setDisabled] = useState(true);
    const [disabledUploadButton, setDisabledUploadButton] = useState(true);
    const [isloading, setIsLoading] = useState(false);
    const [uploadId, setUploadId] = useState(null);
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
    const notificationErrorMessage = (val) => {
        api.error({ message: "Upload Failed", description: val.message });
    }
    const formSchema = z.object({
        title: z.string().min(10, 'Title minumum 10 characters').max(70, 'Title maximal 70 characters'),
        description_seo: z.string().min(160, 'Description document minimum Characters is 160').max(300, 'Description document maximum Characters is 300'),
        category: z.string().nonempty({ message: 'Categories are required' }),
        subcategory: z.string().optional(),
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
            id: idCategory,
            title: values.title,
            title_seo: values.title,
            description: values.description,
            description_seo: values.description,
            category_id: values.category,
            sub_category_id: values.subcategory,
            upload_id: uploadId,
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
                    notificationSuccess();
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
                    notificationErrorMessage(error.response.data);
                    setIsLoading(false);
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
                    console.log(error)
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
    }, [])
    return (
        <div className="admin-home">
            {contextHolder}
            <h1 className="title-page">
                Create New Document

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
                                        name="description_seo"
                                        render={({ field }) => (
                                            <FormItem className="mb-[8px]">
                                                <FormLabel>Description SEO</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="Description" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="category"
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
                                        name="subcategory"
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
                                        <Button className="mt-[16px]" type="submit" disabled={disabledUploadButton}>Create</Button>
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

export default AddPages;