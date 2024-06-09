"use client";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { useRouter } from 'next/navigation';
import { Loader2 } from "lucide-react";
import { notification } from "antd";

import { urlAPI } from "../../../lib/constant";
import { useAppDispatch, useAppSelector } from "../../store";
import { setAuthSlice } from "../../store/reducer/authSlice";
import Link from "next/link";

const LoginUser = () => {
    const dispatch = useAppDispatch();
    const [isDisabled, setIsdisabled] = useState(false);
    const [isLoading, setIsloading] = useState(false);
    const [remember, setRemember] = useState(false);
    const getToken = useAppSelector((state) => state.authUserStorage.authUser);
    const token = getToken.access_token;
    const router = useRouter();
    const [api, contextHolder] = notification.useNotification();

    const request__error = "This Field cannot be blank.";
    const formSchema = z.object({
        email: z.string().email("Please provide a valid email").min(2, {
            message: request__error,
        }),
        password: z.string().nonempty("Password is required"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(formSchema)
    });

    const checkLogin = () => {
        if(token) {
            router.push('/');
        }
    }

    const checkedRemmber = (val) => {
        console.log(val.target.checked);
        setRemember(val.target.checked);
    }

    const onSubmit = async (data) => {
        setIsdisabled(true);
        setIsloading(true);
        try {
            const response = await axios.post(`${urlAPI}backend/customer/login`, {
                "email": data.email,
                "password": data.password,
                "remember": remember
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json"
                }
            })
                .then(function (response) {
                    console.log(response)
                    if (response.status == 200) {
                        dispatch(setAuthSlice(response.data))
                        router.push('/')
                    }
                })
                .catch(function (error) {
                    const errors = error.response.data;
                    setIsdisabled(false);
                    setIsloading(false);
            
                    api.error({
                        message:errors.message,
                        description: errors.errors.email[0],
                    });
                });
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        checkLogin();
    }, [])

    return (
        <>
            <div className="flex min-h-screen">
                {contextHolder}
                <div className="flex flex-row w-full">
                    <div className="flex flex-1 flex-col items-center justify-center px-[16px] 1xl:px-10 relative">
                        <div className="flex 1xl:flex-1 flex-col max-w-full justify-center 2xl:max-w-md p-[20px] shadow-xl my-[80px] rounded-[8px]">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <h3 className="mb-3 text-2xl 1xl:text-4xl font-extrabold text-dark-slate-900 text-center">Sign In</h3>
                                <p className="mb-4 text-slate-700 text-center">Enter your email and password</p>
                                <Link href={'https://docs.brohim.online/backend/customer/login/google'} className="flex items-center justify-center w-full py-4 mb-6 text-sm font-medium transition duration-300 rounded-2xl text-slate-900 bg-slate-100 hover:bg-slate-200 focus:ring-4 focus:ring-slate-200">
                                    <img
                                        className="h-5 mr-2"
                                        src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png"
                                        alt=""
                                    />
                                    Sign in with Google
                                </Link>
                                <div className="flex items-center mb-3">
                                    <hr className="h-0 border-b border-solid border-slate-500 grow" />
                                    <p className="mx-4 text-slate-600">or</p>
                                    <hr className="h-0 border-b border-solid border-slate-500 grow" />
                                </div>
                                <div className="form-input">
                                    <label htmlFor="email" className="mb-2 text-sm text-start text-slate-900">
                                        Email*
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="mail@maxibook.com"
                                        {...register("email")}
                                        className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-slate-400 mb-7 placeholder:text-slate-700 bg-slate-200 text-dark-slate-900 rounded-2xl"
                                    />
                                    {errors.email && <p className="text-red-500 text-[16px]">{errors.email.message}</p>}
                                </div>
                                <div className="form-input">
                                    <label htmlFor="password" className="mb-2 text-sm text-start text-slate-900">
                                        Password*
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        placeholder="Enter a password"
                                        {...register("password")}
                                        className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-slate-400 placeholder:text-slate-700 bg-slate-200 text-dark-slate-900 rounded-2xl"
                                    />
                                    {errors.password && <p className="text-red-500 text-[16px]">{errors.password.message}</p>}
                                </div>
                                <div className="flex flex-row justify-between mb-8">
                                    <label className="relative inline-flex items-center mr-3 cursor-pointer select-none">
                                        <input
                                            type="checkbox"
                                            defaultValue=""
                                            className="sr-only peer"
                                            onChange={checkedRemmber}
                                        />
                                        <div className="w-5 h-5 bg-white border-2 rounded-sm border-slate-500 peer peer-checked:border-0 peer-checked:bg-sky-500">
                                            <img
                                                className=""
                                                src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/icons/check.png"
                                                alt="tick"
                                            />
                                        </div>
                                        <span className="ml-3 text-sm font-normal text-slate-900">
                                            Keep me logged in
                                        </span>
                                    </label>
                                    <a
                                        href="#"
                                        className="mr-4 text-sm font-medium text-purple-blue-500"
                                    >
                                        Forget password?
                                    </a>
                                </div>

                                <button disabled={isDisabled} className="w-full flex gap-x-[12px] items-center justify-center px-6 py-5 mb-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-sky-600 focus:ring-4 focus:bg-sky-100 bg-sky-300">
                                    Sign In
                                    {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                                </button>
                                <p className="text-sm leading-relaxed text-slate-900 text-center">
                                    Not registered yet?{" "}
                                    <a href="#" className="font-bold  text-slate-700">
                                        Create an Account
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

export default LoginUser;