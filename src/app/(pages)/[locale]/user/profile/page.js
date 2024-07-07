"use client";
import { useState } from 'react';
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Image, Input, notification, Spin } from 'antd';
import { BadgeCheck } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from 'next-intl';
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import {
    Avatar,
    AvatarImage,
    AvatarFallback
} from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from "../../../../store";
import { urlAPI } from "../../../../../lib/constant";
import { setAuthSlice } from "../../../../store/reducer/authSlice";

import { setAuthInfoSlice } from '../../../../store/reducer/authSlice';
import { getInitials } from "../../../../../lib/utils";

const ProfileUser = () => {
    const dispatch = useAppDispatch();
    const [isloading, setIsLoading] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const [cpasswordVisible, setCPasswordVisible] = useState(false);
    const [editInput, setEditInput] = useState(false);
    const [changeName, setChangeName] = useState('');
    const getAuth = useAppSelector((state) => state.authUserStorage.authUser);
    const getInfoUser = useAppSelector((state) => state.authUserStorage.authInfoUser);
    const getToken = getAuth ? getAuth.access_token : null;
    const router = useRouter();
    const t = useTranslations("User");
    const formSchema = z.object({
        password: z.string().min(8, 'Password must be at least 8 characters long')
            .regex(/[a-z]/, 'Password must include at least one lowercase character')
            .regex(/[A-Z]/, 'Password must include at least one uppercase character')
            .regex(/[0-9]/, 'Password must include at least one number')
            .regex(/[@$!%*?&]/, 'Password must include at least one special character (@, $, !, %, *, ?, &)'),
        confirmPassword: z.string().min(8, 'Password must be at least 8 characters long'),
        current_password: z.string().min(8, 'Password must be at least 8 characters long'),
    }).refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'Passwords does not match'
    });

    const logoutUser = () => {
        dispatch(setAuthSlice({ ...getToken, access_token: null, expires_at: null }))
        router.push('/');
    }

    const openNotification = (val) => {
        api.info({
            message: 'Warning Information',
            description: val,
        });
    };

    const openNotificationSuccess = () => {
        api.success({
            message: 'Success',
            description: 'Success change your name',
        });
    };
    const notificationUploadfile = () => {
        api.success({
            message: 'Upload File Successfully',
            description: "Successfully uploaded  file to database"
        });
    }
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
            current_password: "",
        },
    });

    const handleChangeName = () => {
        setEditInput(!editInput);
    }
    const handleSubmitChangeName = async () => {
        let formData = {
            name: changeName
        }
        if (changeName) {
            await axios.post(`${urlAPI}backend/customer/user/profile`, formData, {
                headers: {
                    "Content-Type": "application/json",
                    'Accept': "application/json",
                    "Authorization": `Bearer ${getToken}`
                }
            })
                .then((data) => {
                    if (data.status === 200) {
                        dispatch(setAuthInfoSlice({ ...getInfoUser, name: changeName }))
                        openNotificationSuccess();
                    } setEditInput(false);
                })
                .catch(function (error) {
                    if (error.response) {
                        openNotification(error.response.data.message)
                        if(error.response.status === 401) {
                            logoutUser();
                        }
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
    };

    const verifyEmail = async() => {
        await axios.post(`${urlAPI}backend/customer/verification/email`, {}, {
            headers: {
                "Content-Type": "application/json",
                'Accept': "application/json",
                "Authorization": `Bearer ${getToken}`
            }
        })
            .then((data) => {
                if (data.status === 200) {
                    api.success({
                        message: `Successfully send verification`,
                        description: 'Kindly check your email account, we have send email verification'
                    })
                } 
            })
            .catch(function (error) {
                if (error.response) {
                    openNotification(error.response.data.message);
                    if(error.response.status === 401) {
                        logoutUser();
                    }
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

    const onSubmit = async (values) => {
        let formData = {
            password: values.current_password,
            new_password: values.password
        }
        await axios.post(`${urlAPI}backend/customer/user/reset-password`, formData, {
            headers: {
                "Content-Type": "application/json",
                'Accept': "application/json",
                "Authorization": `Bearer ${getToken}`
            }
        })
            .then((data) => {
                if (data.status === 200) {
                    dispatch(setAuthInfoSlice({ ...getInfoUser, name: changeName }))
                    api.success({
                        message: `Successfully change passwod`,
                        description: 'Congratulations you have been successfully changed your passwod'
                    })
                } setEditInput(false);
            })
            .catch(function (error) {
                if (error.response) {
                    openNotification(error.response.data.message);
                    if(error.response.status === 401) {
                        logoutUser();
                    }
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

    const uploadImage = async (e) => {
        let inputData = e.target.files[0];
        let formData = new FormData();
        formData.append("file", inputData);
        setIsLoading(true);
        await axios.post(`${urlAPI}backend/customer/user/avatar`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                'Accept': "application/json",
                "Authorization": `Bearer ${getToken}`
            }
        })
            .then((data) => {
                if (data.status === 200 || data.status === 201) {
                    const dataJSOn = data.data.avatar;
                    dispatch(setAuthInfoSlice({...getInfoUser, avatar: dataJSOn}));
                    setIsLoading(false);
                    notificationUploadfile();
                }
            })
            .catch(function (error) {
                if (error.response) {
                    if(error.response.status === 401) {
                        logoutUser();
                    }
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

    return (
        <div className="profile">
            {contextHolder}
            <div className="screen-layer">
                <Card>
                    <CardContent className={"p-0"}>
                        <div className="banner-profile-card">
                            <img className="rounded-tr-xl rounded-tl-xl" src="/image/profile-banner.png" />
                        </div>
                        <div className="image-profile-card p-4">
                            <div className="image-user">
                                <Avatar className="cursor-pointer img-avatar w-[120px] h-[120px] rounded-md">
                                    <AvatarImage src={getInfoUser && getInfoUser.avatar ? getInfoUser.avatar.url : 'https://github.com/shadcn.png'} />
                                    <AvatarFallback>{getInitials(getInfoUser && getInfoUser.name)}</AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="description-user">
                                <h2>{getInfoUser && getInfoUser.name}</h2>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Tabs defaultValue="account" className="w-full mt-[32px]">
                    <TabsList>
                        <TabsTrigger value="account">{t("Account")}</TabsTrigger>
                        <TabsTrigger value="changeUser">{t("Change Password")}</TabsTrigger>
                        <TabsTrigger value="uploadProfile">{t("Change Image Profile")}</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account">
                        <Card className="mt-[30px]">
                            <CardContent className={"p-4"}>
                                <div className="content-user">
                                    <h4>{t("Account Information")}</h4>
                                    <div className="info-user">
                                        <div className="item">
                                            <label>{t('Full Name')}</label>
                                            <div className="flex gap-[8px] items-center">
                                                {
                                                    editInput ? <Input className='w-[300px]' defaultValue={getInfoUser && getInfoUser.name} onChange={(e) => setChangeName(e.target.value)} /> : <span>{getInfoUser && getInfoUser.name} </span>
                                                }
                                                {
                                                    editInput ? <Button onClick={handleSubmitChangeName} variant="secondary">Save</Button> : <Button onClick={handleChangeName} variant="secondary">Edit</Button>

                                                }

                                            </div>
                                        </div>
                                        <div className="item">
                                            <label>Email</label>
                                            <div className="flex gap-[6px] items-center">
                                                <span>{getInfoUser && getInfoUser.email}</span>
                                                {
                                                    getInfoUser && getInfoUser.email_verified_at ?
                                                    <BadgeCheck className="text-green-900" /> :
                                                    <Button variant="secondary" className=""  onClick={verifyEmail}>Verify</Button>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="changeUser">
                        <Card className="mt-[30px]">
                            <CardContent className={"p-4"}>
                                <div className="content-user">
                                    <h4>{t('Change Password')}</h4>
                                    <div className="form-user w-[300px]">
                                        <Form {...form} >
                                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                                <FormField
                                                    control={form.control}
                                                    name="current_password"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>{t('Current Password')}</FormLabel>
                                                            <FormControl>
                                                                <Input.Password
                                                                    placeholder={t('Current Password')}
                                                                    {...field}
                                                                    visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
                                                                />
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
                                                            <FormLabel>{t('New Password')}</FormLabel>
                                                            <FormControl>
                                                                <Input.Password
                                                                    placeholder={t('New Password')}
                                                                    {...field}
                                                                    visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
                                                                />
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
                                                            <FormLabel>{t('Confirm Password')}</FormLabel>
                                                            <FormControl>
                                                                <Input.Password
                                                                    placeholder={t('Confirm Password')}
                                                                    {...field}
                                                                    visibilityToggle={{ visible: cpasswordVisible, onVisibleChange: setCPasswordVisible }}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <div className="flex items-center gap-[16px]">
                                                    <Button className="mt-[16px]" type="submit">{t('Update')}</Button>
                                                </div>
                                            </form>

                                        </Form>
                                    </div>
                                </div>

                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="uploadProfile">
                        <Card className="mt-[30px]">
                            <CardContent className={"p-4"}>
                                <div className="content-user">
                                    <h4>{t('Upload Avatar')}</h4>
                                    <div className="info-user flex gap-[30px]">
                                        <Image
                                            alt="Avatar"
                                            width={200}
                                            height={200}
                                            placeholder={
                                                <Image
                                                    preview={false}
                                                    src={getInfoUser && getInfoUser.avatar && getInfoUser.avatar.url}
                                                    width={200}
                                                />
                                            }
                                            src={getInfoUser && getInfoUser.avatar && getInfoUser.avatar.url}
                                            fallback="data:image/png;base64,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"
                                        />
                                        <div className="flex flex-col gap-[20px]">
                                            <Label htmlFor="picture">Picture</Label>
                                            <Spin spinning={isloading} delay={500}>
                                                <Input id="picture" type="file" accept='.jpg,.jpeg,.png,.svg,.webp' onChange={(e) => uploadImage(e)} />

                                            </Spin>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

            </div>
        </div>
    );
}

export default ProfileUser;