"use client";
import { useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { useRouter } from 'next/navigation';
import { urlAPI } from "@/lib/constant";
import { notification } from 'antd';
import { Eye, EyeOff, Loader2 } from "lucide-react";


const RegisterUser = () => {
    const [isDisbaled, setIsdisabled] = useState(false);
    const [isLoading, setIsloading] = useState(false);
    const router = useRouter();
    const [isEye, setIseye] = useState(false);
    const [isEyeConfirm, setEyeConfirm] = useState(false);

    const passwordValidation = new RegExp(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    );

    const formSchema = z.object({
        name: z.string().min(2, {
            message: "Full Name must be at least 2 characters.",
        }),
        email: z.string().min(2, {
            message: "Email must be at least 2 characters.",
        }).email({
            message: 'Must be a valid email',
        }),
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
        setError,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(formSchema)
    });

    const onSubmit = async (value) => {
        setIsdisabled(true);
        setIsloading(true);
        try {
            const response = await axios.post(`${urlAPI}backend/customer/register`, {
                "name": value.name,
                "email": value.email,
                "password": value.password,
                "password_confirmation": value.cpassword
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json"
                }
            })
                .then(function (response) {
                    console.log(response)
                    if (response.status == 200) {
                        router.push('/login')
                    }
                })
                .catch(function (error) {
                    const errors = error && error.response.data && error.response.data;
                    setIsdisabled(false);
                    setIsloading(false);
                    setError('email', {
                        message: errors.errors.email[0],
                    });
                });
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <>
            <div className="flex min-h-screen">
                <div className="flex flex-row w-full">
                    <div className="flex flex-1 flex-col items-center justify-center px-[16px] 1xl:px-10 relative">
                        <div className="flex 1xl:flex-1 flex-col max-w-full justify-center 2xl:max-w-md p-[20px] shadow-xl my-[80px] rounded-[8px]">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <h1 className="mb-3 text-2xl 1xl:text-4xl font-extrabold text-dark-slate-900 text-center">Create your account</h1>
                                <p className="mb-4 text-slate-700 text-center">Enter your email and password</p>
                                <Link href={`${urlAPI}backend/customer/login/google`} className="flex items-center justify-center w-full py-4 mb-6 text-sm font-medium transition duration-300 rounded-2xl text-slate-900 bg-slate-100 hover:bg-slate-200 focus:ring-4 focus:ring-slate-200">
                                    <img
                                        className="h-5 mr-2"
                                        src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png"
                                        alt=""
                                    />
                                    Sign Up with Google
                                </Link>
                                <div className="flex items-center mb-3">
                                    <hr className="h-0 border-b border-solid border-slate-500 grow" />
                                    <p className="mx-4 text-slate-600">or</p>
                                    <hr className="h-0 border-b border-solid border-slate-500 grow" />
                                </div>
                                <div className="mb-5">
                                    <label htmlFor="name" className="mb-2 text-sm text-start text-slate-900">
                                        Name<span className="text-red-800 font-bold">*</span>
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        placeholder="name"
                                        className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-slate-400 placeholder:text-slate-700 bg-slate-200 text-dark-slate-900 rounded-2xl"
                                        {...register("name")}
                                    />
                                    {errors.name && <p className="text-red-500 text-[16px] mt-2">{errors.name.message}</p>}

                                </div>
                                <div className="mb-5">
                                    <label htmlFor="email" className="mb-2 text-sm text-start text-slate-900">
                                        Email<span className="text-red-800 font-bold">*</span>
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="mail@maxibook.com"
                                        className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-slate-400 placeholder:text-slate-700 bg-slate-200 text-dark-slate-900 rounded-2xl"
                                        {...register("email")}
                                    />
                                    {errors.email && <p className="text-red-500 text-[16px] mt-2">{errors.email.message}</p>}

                                </div>
                                <div className="mb-5">
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
                                    {errors.password && <p className="text-red-500 text-[16px] mt-2">{errors.password.message}</p>}
                                </div>
                                <div className="mb-7">
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
                                <button type="submit" disabled={isDisbaled} className="w-full flex flex-row justify-center items-center gap-[8px] px-6 py-5 mb-7 text-sm font-bold leading-none text-white transition duration-300 rounded-2xl hover:bg-sky-600 focus:ring-4 focus:bg-sky-100 bg-sky-300">
                                    {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}

                                    Continue
                                </button>
                                <p className="text-sm leading-relaxed text-slate-900 text-left">
                                    Already have an account to maxibook? Use your maxibook username and password?{" "}
                                    <a href="/login" className="font-bold underline text-blue-700">
                                        Sign In
                                    </a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RegisterUser;