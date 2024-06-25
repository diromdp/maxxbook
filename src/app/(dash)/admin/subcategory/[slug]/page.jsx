"use client"
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { useEffect, useState } from "react";
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
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCookies } from "react-cookie";
import { useSearchParams, useRouter } from 'next/navigation';
import { formatDateToDatabaseString } from "../../../../../lib/utils";
import { urlAPI } from "../../../../../lib/constant";
import { notification } from 'antd';


const AddPages = () => {
    const [cookies] = useCookies(["token"])
    const [api, contextHolder] = notification.useNotification();
    const [getCategoryData, setGetCategoryData] = useState([]);
    const searchParams = useSearchParams();
    const [isPublish, setPublish] = useState(null);
    const router = useRouter();
    const openNotification = (val) => {
        api.info({
            message: 'Warning Information',
            description: val,
        });
    };
    const notificationSuccess = () => {
        api.success({
            message: 'Save Successfully',
            description:"Successfully saved to database"
        })
    } 
    const formSchema = z.object({
        name: z.string().min(2, {
            message: "Name must be at least 2 characters.",
        }),
        name_id: z.string().min(2, {
            message: "Name must be at least 2 characters.",
        }),
        description_text: z.string().min(6, {
            message: "Description must be at least 6 characters.",
        }),
        description_text_id: z.string().min(6, {
            message: "Description must be at least 6 characters.",
        }),
        category_id: z.string().trim().nonempty({ message: "Category is required" })
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: searchParams.get('name')? searchParams.get('name') : "",
            name_id: searchParams.get('name_id')? searchParams.get('name_id') : "",
            description_text: searchParams.get('description')? searchParams.get('description'): "",
            description_text_id: searchParams.get('description_id')? searchParams.get('description_id'): "",
            category_id: searchParams.get('category_id')? searchParams.get('category_id'): "",
        },
    });

    const onSubmit = async (values) => {
        let formData = {
            id: searchParams.get('id') ? searchParams.get('id') : null,
            name: values.name,
            description: values.description_text,
            name_id: values.name_id,
            description_id: values.description_text_id,
            category_id: values.category_id,
            published_at: isPublish ? isPublish : null,
        }

        await axios.put(`${urlAPI}backend/admin/sub-categories`, formData, {
            headers: {
                "Content-Type": "application/json",
                'Accept': "application/json",
                "Authorization": `Bearer ${cookies.token}`
            }
        })
            .then((data) => {
                if (data.status === 200) {
                    console.log(data.status);
                    notificationSuccess();
                    router.push("/admin/subcategory");
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

    const onChangePublish = async (e) => {
        let formattedDate = formatDateToDatabaseString();
        if(e === true){
            setPublish(formattedDate);
        } else {
            setPublish(null);
        }
    }

    useEffect(() => {
        getCategory();
        setPublish(searchParams.get('published_at') ? searchParams.get('published_at') : "");
    },[])

    return (
        <div className="admin-home">
            {contextHolder}
            <h1 className="title-page">
                Create New Sub Category
            </h1>
            <div className="flex gap-[16px]">
                <div style={{ width: "50%" }}>
                    <Card>
                        <CardContent>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem className="mb-[8px]">
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="name_id"
                                        render={({ field }) => (
                                            <FormItem className="mb-[8px]">
                                                <FormLabel>Name (ID)</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Name (ID)" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="description_text"
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
                                    <FormField
                                        control={form.control}
                                        name="description_text_id"
                                        render={({ field }) => (
                                            <FormItem className="mb-[8px]">
                                                <FormLabel>Description (ID)</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="Description (ID)" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="category_id"
                                        render={({ field }) => (
                                            <FormItem className="mb-[8px]">
                                                <FormLabel>Select Category</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                                        name="select_publisher"
                                        render={({ field }) => (
                                            <FormItem className="mb-[8px] gap-[16px] flex items-center">
                                                <FormLabel>Publish</FormLabel>
                                                <FormControl>
                                                    <Switch
                                                        checked={isPublish ? true : false}
                                                        onCheckedChange={onChangePublish}
                                                        aria-readonly
                                                        className="!mt-0"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="flex items-center gap-[16px]">
                                        <Button className="mt-[16px]" type="submit">Create</Button>
                                        <Button className="mt-[16px]" type="button" onClick={() => router.push('/admin/subcategory')} variant="secondary">Cancel</Button>
                                    </div>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </div>
            </div>

        </div>
    );
}

export default AddPages;