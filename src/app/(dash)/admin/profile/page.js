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

import {
    Card,
    CardContent,
} from "@/components/ui/card";

const ProfileForm = () => {
    const [cookies] = useCookies(["token"])
    const [dataFetch, setDataFetch] = useState({});
    const request__error = "This Field cannot be blank.";
    const MAX_FILE_SIZE = 500000;
    const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    const formSchema = z.object({
        name: z.string().min(5, { message: "Must be 5 or more characters long" }),
        email: z.string().email("Please provide a valid email").min(2, {
            message: request__error,
        }),
        uploadImage: z.any().refine((files) => files?.length == 1, "Image is required.").refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`).refine(
            (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
            ".jpg, .jpeg, .png and .webp files are accepted."
        )
    });
    const {
        register,
        handleSubmit,
        setError,
        setValue,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(formSchema),
        reValidateMode: 'onChange',
    });

    const getProfile = async () => {
        await axios.get(`${urlAPI}backend/admin/user`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': "application/json",
                "Authorization": `Bearer ${cookies.token}`
            }
        })
            .then((data) => {
                if (data.status === 200) {
                    setDataFetch(data.data)
                    setValue("name", data.data.name);
                    setValue("email", data.data.email);
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
        console.log(data);
    }

    useEffect(() => {
        getProfile();
    }, [])

    return (
        <div className="admin-home">
            <Card className="w-[60%]">
                <CardContent>
                    <form className="flex items-center justify-between gap-[20px]" onSubmit={handleSubmit(onSubmit)}>
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
                            <Button className="bg-sky-500 hover:bg-sky-700" type="submit">      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Update Profile</Button>
                        </div>
                        <div className="w-[200px] h-[200px] rounded-[10px] relative -top-[10px]">
                            <Image
                                width={200}
                                src={dataFetch.avatar ? dataFetch.avatar : "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"}
                            />
                        </div>

                    </form>
                </CardContent>
            </Card>

        </div>
    );
}

export default ProfileForm;