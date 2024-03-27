"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { urlAPI } from "../../../lib/constant";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useRouter } from 'next/navigation'
import { Checkbox } from "@/components/ui/checkbox"


const login = () => {
    const router = useRouter()
    const [cookies, setCookie] = useCookies(['token']);
    const [isDisbaled, setIsdisabled] = useState(false);

    const request__error = "This Field cannot be blank.";
    const formSchema = z.object({
        email: z.string().email("Please provide a valid email").min(2, {
            message: request__error,
        }),
        password: z.string().min(6, 'Password is to short')
    });
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(formSchema)
    });

    const onSubmit = async (data) => {
        console.log(data);
        setIsdisabled(true);
        try {
            const response = await axios.post(`${urlAPI}backend/admin/login`, {
                "email": data.email,
                "password": data.password,
                "remember": false
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json"
                }
            })
                .then(function (response) {
                    let dataFetch = response.data;
                    if (response.status == 200) {
                        setCookie('token', dataFetch.access_token, { path: '/', expires: new Date(Date.now()+2592000)})
                        router.push('/admin')
                    }
                })
                .catch(function (error) {
                    const errors = error.response.data;
                    setError('email', {
                        message: errors.errors.email[0],
                    });
                    setError('password', {
                        message: errors.message,
                    });
                });
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <>
            <div className="flex items-center h-screen w-full">
                <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
                    <span className="block w-full text-2xl uppercase font-bold mb-4">Login Admin</span>
                    <form className="mb-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4 md:w-full">
                            <label htmlFor="email" className="block text-lg mb-1">Email</label>
                            <input className="w-full border rounded p-2 outline-none focus:shadow-outline" type="email" placeholder="Username or Email" {...register("email")} />
                            {errors.email && <p className="text-red-500 text-[16px]">{errors.email.message}</p>}

                        </div>
                        <div className="mb-6 md:w-full">
                            <label htmlFor="password" className="block text-lg mb-1">Password</label>
                            <input className="w-full border rounded p-2 outline-none focus:shadow-outline" type="password" {...register("password")} placeholder="Password" />
                            {errors.password && <p className="text-red-500 text-[16px]">{errors.password.message}</p>}
                            <div className="flex items-center space-x-2 pt-[16px]">
                                <Checkbox id="terms" />
                                <label
                                    htmlFor="terms"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Remember
                                </label>
                            </div>
                        </div>

                        <button type="submit" disabled={isDisbaled} className="bg-sky-500 hover:bg-sky-700 text-white uppercase w-full text-sm font-semibold px-4 py-2 rounded">Login</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default login;