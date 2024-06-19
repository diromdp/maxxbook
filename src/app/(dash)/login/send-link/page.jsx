"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from 'next/navigation';
import { Loader2 } from "lucide-react";
import { notification } from "antd";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { urlAPI } from "../../../../lib/constant";

const SendLink = () => {
    const [isDisabled, setIsdisabled] = useState(false);
    const [isLoading, setIsloading] = useState(false);
    const router = useRouter();
    const [api, contextHolder] = notification.useNotification();
    const formSchema = z.object({
        email: z.string().email("Please provide a valid email").min(2, {
            message: 'minimal email required 2 characters',
        })
    });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(formSchema)
    });

    const onSubmit = async (data) => {
        setIsdisabled(true);
        setIsloading(true);
        try {
            await axios.post(`${urlAPI}backend/forgot-password/send`, {
                "email": data.email,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json"
                }
            })
                .then(function (response) {
                    if (response.status == 200) {
                        api.success({
                            message: "Send Email Reset Success",
                            description: "Congratulations you have sent your email"
                        })
                        setTimeout(() => {
                            router.push('/')
                        }, 1000)
                    }
                })
                .catch(function (error) {
                    const errors = error.response.data;
                    console.log(errors);
                    setIsdisabled(false);
                    setIsloading(false);
                    api.error({
                        message: 'Failed to send email',
                        description: errors.message,
                    });
                });
        } catch (error) {
            console.log(error)
        }
    };
    return (
        <main id="content" role="main" className="w-full h-screen flex flex-col justify-center max-w-md mx-auto p-6">
            {contextHolder}
            <div className="mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 border-2 border-blue-300">
                <div className="p-4 sm:p-7">
                    <div className="text-center">
                        <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Forgot password?</h1>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            Remember your password? &nbsp;
                            <a className="text-blue-600 decoration-2 hover:underline font-medium" href="/login">
                                Login here
                            </a>
                        </p>
                    </div>
                    <div className="mt-5">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid gap-y-4">
                                <div>
                                    <label for="email" className="block text-sm font-bold ml-1 mb-2 dark:text-white">Email address</label>
                                    <div className="relative">
                                        <input type="email" {...register("email")} name="email" className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm" required aria-describedby="email-error" />
                                        {errors.email && <p className="text-red-500 text-[16px]">{errors.email.message}</p>}
                                    </div>
                                    <p className="hidden text-xs text-red-600 mt-2" id="email-error">Please include a valid email address so we can get back to you</p>
                                </div>
                                <button type="submit" disabled={isDisabled} className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                                    {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                                    Reset password
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default SendLink;