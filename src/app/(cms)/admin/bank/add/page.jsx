"use client"
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
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
import { urlAPI } from "@/lib/constant";
import { useCookies } from "react-cookie";
import { useRouter } from 'next/navigation'

import { notification } from 'antd';


const AddPages = () => {
    const [cookies] = useCookies(["token"])
    const [api, contextHolder] = notification.useNotification();
    const route = useRouter();

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
        description: z.string().min(6, {
            message: "Description must be at least 6 characters.",
        }),
        code: z.string().min(3, {
            message: "Code must be at least 3 characters.",
        }),
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            code: "",
        },
    });

    const onSubmit = async (values) => {
        let formData = {
            id: null,
            name: values.name,
            description: values.description,
            code: values.code,
        }

        await axios.put(`${urlAPI}backend/admin/banks`, formData, {
            headers: {
                "Content-Type": "application/json",
                'Accept': "application/json",
                "Authorization": `Bearer ${cookies.token}`
            }
        })
            .then((data) => {
                if (data.status === 200) {
                    notificationSuccess();
                    route.push('/admin/bank')
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

    return (
        <div className="admin-home">
            {contextHolder}
            <h1 className="title-page">
                Create Bank
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
                                                <FormLabel>Bank Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Bank Name" {...field} />
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
                                                    <Input placeholder="Description" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="code"
                                        render={({ field }) => (
                                            <FormItem className="mb-[8px]">
                                                <FormLabel>Bank Code</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Bank Code" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="flex items-center gap-[16px]">
                                        <Button className="mt-[16px]" type="submit">Create</Button>
                                        <Button className="mt-[16px]" type="button" onClick={() => route.push('/admin/bank')} variant="secondary">Cancel</Button>
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