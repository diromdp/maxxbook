"use client"
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
import axios from "axios";
import { urlAPI } from "../../../../../lib/constant";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

import { notification } from 'antd';


const AddPages = () => {
    const [cookies] = useCookies(["token"])
    const [api, contextHolder] = notification.useNotification();
    const router = useRouter();
    const openNotification = (val) => {
        api.info({
            message: 'Warning Information',
            description: val,
        });
    };
    const openNotificationSuccess = () => {
        api.info({
            message: 'Create Notification',
            description: 'Create user has been successfully created',
        });
    };
    const formSchema = z.object({
        fullname: z.string().min(2, {
            message: "Full Name must be at least 2 characters.",
        }),
        email: z.string().min(2, {
            message: "Email must be at least 2 characters.",
        }),
        password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
        confirmPassword: z.string().min(6, { message: 'Password must be at least 6 characters' })
    }).refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'Passwords does not match'
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullname: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (values) => {
        let formData = {
            name: values.fullname,
            email: values.email,
            password: values.password,
            password_confirmation: values.confirmPassword
        }

        await axios.post(`${urlAPI}backend/admin/users`, formData, {
            headers: {
                "Content-Type": "application/json",
                'Accept': "application/json",
                "Authorization": `Bearer ${cookies.token}`
            }
        })
            .then((data) => {
                if (data.status === 200) {
                    form.reset();
                    openNotificationSuccess();
                    router.push('/admin/user');
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

    return (
        <div className="admin-home">
            {contextHolder}
            <h1 className="title-page">
                Create New User
            </h1>
            <Card>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="fullname"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Full Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem
                                        className="pt-[16px]"
                                    >
                                        <FormLabel>Email Address</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="Email Address" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (

                                    <FormItem
                                        className="pt-[16px]"
                                    >
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (

                                    <FormItem
                                        className="pt-[16px]"
                                    >
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Confirm Password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex items-center gap-[16px]">
                                <Button className="mt-[16px]" type="submit">Create</Button>
                                <Button className="mt-[16px]" type="button" onClick={() => form.reset()} variant="secondary">Cancel</Button>

                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}

export default AddPages;