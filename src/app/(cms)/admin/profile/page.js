"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useCookies } from "react-cookie"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { urlAPI } from "@/lib/constant";
import { Image } from 'antd';
import { useMapContext } from "../adminContex";
import { notification } from "antd";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

const ProfileForm = () => {
    const [cookies] = useCookies(["token"])
    const [pathname, setPathname] = useState('');
    const { profile, setProfile } = useMapContext();

    const [isLoading, setIsLoading] = useState(false);
    const [api, contextHolder] = notification.useNotification();

    const request__error = "This Field cannot be blank.";
    const MAX_FILE_SIZE = 500000;
    const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/svg"];

    const formSchema = z.object({
        name: z.string().min(5, { message: "Must be 5 or more characters long" }),
        email: z.string().email("Please provide a valid email").min(2, {
            message: request__error,
        }),
        password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
        cPassword: z.string().min(6, { message: 'Password must be at least 6 characters' }).refine((data) => data.password === data.cPassword, {
            path: ['cPassword'],
            message: 'Passwords does not match'
        }),
        uploadImage: z.any().refine((files) => {
            return files?.[0]?.size <= MAX_FILE_SIZE;
        }, `Max image size is 5MB.`).optional().refine(
                (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
                "Only .jpg, .jpeg, .png and .webp .svg formats are supported."
        ),
    });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(formSchema),
        reValidateMode: 'onChange',
        defaultValues: {
            name: profile.name,
            email: profile.email,
            password: "",
            cPassword: "",
        }
    });

    const onSubmitToServer = async (data) => {
        const inputData = {
            name: data.name,
            email: data.email,
            password: data.password,
            password_confirmation: data.cPassword
        }
        await axios.post(`${urlAPI}backend/admin/user`, inputData, {
            headers: {
                "Content-Type": "application/json",
                'Accept': "application/json",
                "Authorization": `Bearer ${cookies.token}`
            }
        })
            .then((data) => {
                if (data.status === 200) {
                    setIsLoading(false)
                    api.success({
                        message: `Successfully Update profile`,
                        description: 'Has been updated'
                    })
                }
            })
            .catch(function (error) {
                if (error.response) {
                    setIsLoading(false);
                    api.error({
                        message: `Error updating profile`,
                        description:`${error.response.data.message}`
                    })
                    
                    console.log(error.response.status);
                    
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });
    }

    const onSubmit = async (data) => {
        let inputData = data;
        let formData = new FormData();

        formData.append("file", data.uploadImage[0]);
        setIsLoading(true)
        await axios.post(`${urlAPI}backend/admin/user/avatar`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                'Accept': "application/json",
                "Authorization": `Bearer ${cookies.token}`
            }
        })
            .then((data) => {
                if (data.status === 200) {
                    onSubmitToServer(inputData)
                    setPathname(data.data.url);
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
    return (
        <div className="admin-home">
            {contextHolder}
            <Card className="w-[60%]">
                <CardContent>
                    <form className="flex items-center justify-between gap-[20px]" onSubmit={handleSubmit(onSubmit)}>
                        <div className="w-[200px] h-[250px] rounded-[10px] relative -top-[10px]">
                            <Image
                                width={200}
                                fallback="data:image/png;base64,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"
                                src={pathname ? pathname : profile.avatar ? profile.avatar.url : "https://github.com/shadcn.png"}
                            />
                        </div>
                        <div className="w-[70%]">
                            <div className="mb-[8px]">
                                <Label htmlFor="Name">Name</Label>
                                <Input type="text" id="Name" defaultValues={profile.name} placeholder="Please type here.." {...register("name")} />
                                {errors.name && <p className="text-red-500 text-[16px]">{errors.name.message}</p>}
                            </div>
                            <div className="mb-[8px]">
                                <Label htmlFor="Email">Email</Label>
                                <Input type="email" id="Email" defaultValues={profile.email} placeholder="Please type here.." {...register("email",)} />
                                {errors.email && <p className="text-red-500 text-[16px]">{errors.email.message}</p>}
                            </div>
                            <div className="mb-[8px]">
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" placeholder="Please type password here.." {...register("password",)} />
                                {errors.password && <p className="text-red-500 text-[16px]">{errors.password.message}</p>}
                            </div>
                            <div className="mb-[8px]">
                                <Label htmlFor="cPassword">Confrim Password</Label>
                                <Input type="password" id="cPassword" placeholder="Please type password here.." {...register("cPassword",)} />
                                {errors.cPassword && <p className="text-red-500 text-[16px]">{errors.cPassword.message}</p>}
                            </div>
                            <div className="mb-[16px]">
                                <Label htmlFor="upload">Upload Avatar</Label>
                                <Input id="upload" type="file" accept='.jpg,.jpeg,.png,.svg,.webp' {...register("uploadImage")} />
                                {errors.uploadImage && <p className="text-red-500 text-[16px]">{errors.uploadImage.message}</p>}
                            </div>
                            <Button className="bg-sky-500 hover:bg-sky-700" type="submit">
                                {
                                    isLoading &&
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                }
                                Update Profile
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

        </div>
    );
}

export default ProfileForm;