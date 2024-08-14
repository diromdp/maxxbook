"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { useState } from "react";
import { useRouter } from 'next/navigation';

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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

import axios from "axios";
import { urlAPI } from "@/lib/constant";
import { formatDateToDatabaseString } from "@/lib/utils";
import { useCookies } from "react-cookie";

import { notification, Image } from 'antd';


const AddPages = () => {
    const [cookies] = useCookies(["token"])
    const [api, contextHolder] = notification.useNotification();
    const [disabled, setDisabled] = useState(true);
    const [idCategory, setIdCategory] = useState(null);
    const [urlPathIcon, setUrlPathIcon] = useState('');
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
            description: "Successfully saved to database"
        })
    }
    const notifUploadSuccess = () => {
        api.success({
            message: 'Upload Successfully',
            description: "Successfully uploaded to database"
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
        select_homepage: z.boolean()
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            name_id: "",
            description_text: "",
            description_text_id: "",
            select_homepage: false
        },
    });

    const onSubmit = async (values) => {
        let formData = {
            id: idCategory,
            name: values.name,
            description: values.description_text,
            name_id: values.name_id,
            description_id: values.description_text_id,
            icon: null,
            published: isPublish ? isPublish : false,
            is_home: values.select_homepage
        }

        await axios.put(`${urlAPI}backend/admin/categories`, formData, {
            headers: {
                "Content-Type": "application/json",
                'Accept': "application/json",
                "Authorization": `Bearer ${cookies.token}`
            }
        })
            .then((data) => {
                if (data.status === 200) {
                    setDisabled(false);
                    setIdCategory(data.data.id);
                    notificationSuccess();
                }
            })
            .catch(function (error) {
                if (error.response) {
                    openNotification(error.response.data.message)
                    
                    console.log(error.response.status);
                    
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

        formData.append("file", inputData);
        await axios.post(`${urlAPI}backend/admin/categories/${idCategory}/icon`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                'Accept': "application/json",
                "Authorization": `Bearer ${cookies.token}`
            }
        })
            .then((data) => {
                if (data.status === 200) {
                    notifUploadSuccess()
                    setUrlPathIcon(data.data.avatar)
                }
            })
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response.data.data);
                    console.log(error.response.status);
                    
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
        setPublish(e);
    }

    return (
        <div className="admin-home">
            {contextHolder}
            <h1 className="title-page">
                Create New Category
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
                                        name="select_homepage"
                                        render={({ field }) => (
                                            <FormItem className="mb-[8px] gap-[16px] flex items-center">
                                                <FormLabel>Show in homepage</FormLabel>
                                                <FormControl>
                                                    <Switch
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                        aria-readonly
                                                        className="!mt-0"
                                                    />
                                                </FormControl>
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
                                        <Button className="mt-[16px]" type="button" onClick={() => router.push('/admin/category')} variant="secondary">Cancel</Button>
                                    </div>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardContent>
                        <Image
                            width={300}
                            src={`${urlPathIcon}`}
                            fallback="data:image/png;base64,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"
                            placeholder={
                                <Image
                                    preview={false}
                                    src={`${urlPathIcon}`}
                                    width={200}
                                />
                            }
                        />
                        <div className="grid w-full max-w-sm items-center gap-1.5 mt-4">
                            <label htmlFor="picture" className="mb-2 font-bold text-md">Image Icon</label>
                            <Input id="picture" type="file" disabled={disabled} onChange={(e) => uploadImage(e)} />
                        </div>
                    </CardContent>
                </Card>
            </div>

        </div>
    );
}

export default AddPages;