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
import { urlAPI } from "../../../../lib/constant";
import { Image } from 'antd';
import { useMapContext } from "../adminContex";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

const ProfileForm = () => {
    const [cookies] = useCookies(["token"])
    const [pathname, setPathname] = useState('');
    const { profile, setProfile } = useMapContext();

    const [isLoading, setIsLoading] = useState(false);
    const request__error = "This Field cannot be blank.";
    const MAX_FILE_SIZE = 500000;
    const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/svg"];

    const formSchema = z.object({
        name: z.string().min(5, { message: "Must be 5 or more characters long" }),
        email: z.string().email("Please provide a valid email").min(2, {
            message: request__error,
        }),
        uploadImage: z.any().refine((files) => {
            return files?.[0]?.size <= MAX_FILE_SIZE;
        }, `Max image size is 5MB.`)
        .refine(
            (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
            "Only .jpg, .jpeg, .png and .webp .svg formats are supported."
        ),
    });

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(formSchema),
        reValidateMode: 'onChange',
    });

    const onSubmitToServer = async (data) => {
        const inputData = {
            name: data.name,
            email: data.email,
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
                }
            })
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response.data.data);
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
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });
    }

    useEffect(() => {
        if(profile) {
            setValue("name", profile.name);
            setValue("email", profile.email);
        }

    }, [])

    return (
        <div className="admin-home">
            <Card className="w-[60%]">
                <CardContent>
                    <form className="flex items-center justify-between gap-[20px]" onSubmit={handleSubmit(onSubmit)}>
                        <div className="w-[200px] h-[250px] rounded-[10px] relative -top-[10px]">
                            <Image
                                width={200}
                                src={pathname ? pathname : profile.avatar ? profile.avatar.url : "https://github.com/shadcn.png"}
                            />
                        </div>
                        <div className="w-[70%]">
                            <div className="mb-[8px]">
                                <Label htmlFor="Name">Name</Label>
                                <Input type="text" id="Name" placeholder="Please type here.." {...register("name")} />
                                {errors.name && <p className="text-red-500 text-[16px]">{errors.name.message}</p>}

                            </div>
                            <div className="mb-[8px]">
                                <Label htmlFor="Email">Email</Label>
                                <Input type="email" id="Email" placeholder="Please type here.." {...register("email",)} />
                                {errors.email && <p className="text-red-500 text-[16px]">{errors.email.message}</p>}

                            </div>
                            <div className="mb-[16px]">
                                <Label htmlFor="upload">Upload Avatar</Label>
                                <Input id="upload" type="file" {...register("uploadImage")} />
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