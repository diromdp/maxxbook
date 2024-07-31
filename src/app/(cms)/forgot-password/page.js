"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from 'next/navigation';
import { Loader2, Eye, EyeOff } from "lucide-react";
import { notification } from "antd";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { urlAPI } from "../../../lib/constant";
import { useSearchParams } from 'next/navigation'

const ForgotPassword = ({params}) => {
    const[isDisabled, setIsdisabled] = useState(false);
    const [isLoading, setIsloading] = useState(false);
    const [isEye, setIseye] = useState(false);
    const [isEyeConfirm, setEyeConfirm] = useState(false);
    const passwordValidation = new RegExp(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    );
    const searchParams = useSearchParams()
    const token = searchParams.get('token')
    const router = useRouter();
    const [api, contextHolder] = notification.useNotification();

    const formSchema = z.object({
        password: z.string().min(8, { message: 'Password must be at least 8 characters' }).regex(passwordValidation, {
            message: 'Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character',
        }),
        cpassword: z.string().min(6, { message: 'Password must be at least 6 characters' })
    }).refine((data) => data.password === data.cpassword, {
        path: ['cpassword'],
        message: 'Passwords does not match'
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
            await axios.post(`${urlAPI}backend/forgot-password/reset`, {
                "token": token,
                "password": data.password,
                "password_confirmation": data.cpassword
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json"
                }
            })
                .then(function (response) {
                    if (response.status == 200) {
                        api.success({
                            message: "Change Password",
                            description: "Congratulations you have change your password",
                        })
                        setTimeout(() => {
                            router.push('/')
                        }, 2000)
                    }
                })
                .catch(function (error) {
                    const errors = error.response.data;
                    setIsdisabled(false);
                    setIsloading(false);

                    api.error({
                        message: errors.message,
                        description: errors.errors.email[0],
                    });
                });
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <>
            <div className="flex min-h-screen">
                {contextHolder}
                <div className="flex flex-row w-full">
                    <div className="flex flex-1 flex-col items-center justify-center px-[16px] 1xl:px-10 relative">
                        <div className="flex 1xl:flex-1 flex-col max-w-full justify-center 2xl:max-w-md p-[20px] shadow-xl my-[80px] rounded-[8px]">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <h3 className="mb-3 text-2xl 1xl:text-4xl font-extrabold text-dark-slate-900 text-center">Forgot Password</h3>
                                <p className="mb-4 text-slate-700 text-center">Enter your new Password and Confirm Password</p>
                               
                                <div className="form-input mb-[16px]">
                                    <label htmlFor="password" className="mb-2 text-sm text-start text-slate-900">
                                        Password<span className="text-red-800 font-bold">*</span>
                                    </label>
                                    <div className="relative eye-password">
                                        <input
                                            id="password"
                                            type={isEye ? "text" : "password"}
                                            placeholder="Enter a password"
                                            className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-slate-400 placeholder:text-slate-700 bg-slate-200 text-dark-slate-900 rounded-2xl"
                                            {...register("password")}
                                        />
                                        {
                                            isEye ? <EyeOff className="pointer" onClick={() => setIseye(!isEye)} /> : <Eye className="pointer" onClick={() => setIseye(!isEye)} />
                                        }
                                    </div>
                                    {errors.password && <p className="text-red-500 text-[16px]">{errors.password.message}</p>}
                                </div>
                                <div className="form-input mb-[16px]">
                                    <label htmlFor="cpassword" className="mb-2 text-sm text-start text-slate-900">
                                        Confirm Password<span className="text-red-800 font-bold">*</span>
                                    </label>
                                    <div className="relative eye-password">
                                        <input
                                            id="cpassword"
                                            type={isEyeConfirm ? "text" : "password"}
                                            placeholder="Enter a confirm password"
                                            className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-slate-400 placeholder:text-slate-700 bg-slate-200 text-dark-slate-900 rounded-2xl"
                                            {...register("cpassword")}
                                        />
                                        {
                                            isEyeConfirm ? <EyeOff className="pointer" onClick={() => setEyeConfirm(!isEyeConfirm)} /> : <Eye className="pointer" onClick={() => setEyeConfirm(!isEyeConfirm)} />
                                        }
                                    </div>
                                    {errors.cpassword && <p className="text-red-500 text-[16px] mt-2">{errors.cpassword.message}</p>}
                                </div>
                                <button disabled={isDisabled} className="w-full flex gap-x-[12px] items-center justify-center px-6 py-5 mb-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-sky-600 focus:ring-4 focus:bg-sky-100 bg-sky-300">
                                    Change Password
                                    {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ForgotPassword;