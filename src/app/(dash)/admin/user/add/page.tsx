"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from 'react-hook-form';
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



const addPages = () => {

    const formSchema = z.object({
        fullname: z.string().min(2, {
            message: "Full Name must be at least 2 characters.",
        }),
        email: z.string().min(2, {
            message: "Email must be at least 2 characters.",
        }),
        phoneNumber: z.string().min(2, {
            message: "Phone Number must be at least 2 characters.",
        }),
        password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
        confirmPassword: z.string().min(6, { message: 'Password must be at least 6 characters' })
    }).refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'Passwords does not match'
    });
    type ValidationSchemaType = z.infer<typeof formSchema>

    const form = useForm<ValidationSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullname: "",
            email: "",
            phoneNumber: "",
            password: "",
            confirmPassword: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <div className="admin-home">
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
                                name="phoneNumber"
                                render={({ field }) => (

                                    <FormItem
                                        className="pt-[16px]"
                                    >
                                        <FormLabel>Phone / Whatsapp</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Email Address" {...field} />
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
                                <Button className="mt-[16px]" type="submit">Create Another</Button>
                                <Button className="mt-[16px]" type="submit" variant="secondary">Cancel</Button>

                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}

export default addPages;