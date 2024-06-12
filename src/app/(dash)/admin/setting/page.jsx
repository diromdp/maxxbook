"use client"
import { useState, useEffect, useRef, useMemo } from "react";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCookies } from "react-cookie";
import axios from "axios";
import { notification } from 'antd';
import { urlAPI } from "../../../../lib/constant";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";

const JoditEditor = dynamic(() => import("jodit-react"), {
    ssr: false,
});


const Settings = () => {
    const editor = useRef(null);
    const [cookies] = useCookies(["token"])
    const [initForm, setInitForm] = useState([
        {
            key: 'transactions.approval',
            label: "Transactions Approval",
            type: "integer",
            value: 0
        },
        {
            key: 'transactions.min_withdrawal',
            label: "Transactions Min Withdrawal",
            type: "integer",
            value: 0
        },
        {
            key: 'transactions.balance_enabled',
            label: "Transactions Balance Enabled",
            type: "boolean",
            value: 0
        },
        {
            key: 'seo.title_home',
            label: "Seo Title home",
            type: 'string',
            value: '',
        },
        {
            key: 'seo.description_home',
            label: "Seo Description Home",
            type: 'string',
            mode: 'long',
            value: '',
        },
        {
            key: 'seo.title_category',
            label: "Seo Title category",
            type: 'string',
            value: '',
        },
        {
            key: 'seo.description_category',
            label: "Seo Description category",
            type: 'string',
            mode: 'long',
            value: '',
        },
        {
            key: 'seo.title_subcategory',
            label: "Seo Title subcategory",
            type: 'string',
            value: '',
        },
        {
            key: 'seo.description_subcategory',
            label: "Seo Description subcategory",
            type: 'string',
            mode: 'long',
            value: '',
        },
        {
            key: 'seo.title_about',
            label: "Seo Title about",
            type: 'string',
            value: '',
        },
        {
            key: 'seo.description_about',
            label: "Seo Description about",
            type: 'string',
            mode: 'long',
            value: '',
        },
        {
            key: 'page.description_about',
            label: "Page Description about",
            type: 'string',
            mode: 'editor',
            value: '',
        },
        {
            key: 'page.title_term',
            label: "Page Title term",
            type: 'string',
            value: '',
        },
        {
            key: 'page.description_seo_term',
            label: "Page Description seo term",
            type: 'string',
            mode: 'long',
            value: '',
        },
        {
            key: 'page.description_term',
            label: "Page Description term",
            type: 'string',
            mode: 'editor',
            value: '',
        },
        {
            key: 'page.title_privacy',
            label: "Page Title privacy",
            type: 'string',
            value: '',
        },
        {
            key: 'page.description_seo_privacy',
            label: "Page Description seo privacy",
            type: 'string',
            mode: 'long',
            value: '',
        },
        {
            key: 'page.description_privacy',
            label: "Page Description privacy",
            type: 'string',
            mode: 'editor',
            value: '',
        },
    ]);
    const [htmlAbout, setHtmlAbout] = useState();
    const [htmlTerms, setHtmlTerm] = useState();
    const [htmlPrivacy, setHtmlPrivacy] = useState();
    const [selectForm, setSelectedForm] = useState('transaction');
    const [selectedFormTransaction, setSelectedFormTransaction] = useState();
    const [selectedFormSeoHome, setSelectedFormSeoHome] = useState();
    const [selectedFormSeoCategory, setSelectedFormSeoCategory] = useState();
    const [selectedFormSeoSubCategory, setSelectedFormSeoSubCategory] = useState();
    const [selectedFormSeoAbout, setSelectedFormSeoAbout] = useState();
    const [selectedFormPageTerm, setSelectedFormPageTerm] = useState();
    const [selectedFormPagePrivacy, setSelectedFormPagePrivacy] = useState();
    const [filterUser, setFilterUser] = useState({
        q: "",
        cursorEnabled: null,
        cursor: "",
        page: "1",
        perPage: "50",
        sortBy: "created_at",
        sortDirection: "desc"
    });
    const {
        register,
        handleSubmit,
    } = useForm();
    const config = useMemo(
        () => ({
            readonly: false,
        }),
    );

    const transaction = ['transactions.approval', 'transactions.min_withdrawal', 'transactions.balance_enabled'];
    const seoHome = ['seo.title_home', 'seo.description_home'];
    const seoCategory = ['seo.title_category', 'seo.description_category'];
    const seoSubCategory = ['seo.title_subcategory', 'seo.description_subcategory'];
    const seoAbout = ['seo.title_about', 'seo.description_about', 'page.description_about'];
    const termTerm = ['page.title_term', 'page.description_seo_term', 'page.description_term'];
    const privacy = ['page.title_privacy', 'page.description_seo_privacy', 'page.description_privacy']


    const [api, contextHolder] = notification.useNotification();

    const hasFetchedData = useRef(false);

    const getData = async () => {
        await axios.get(`${urlAPI}backend/admin/settings?q=${filterUser.q}&cursorEnabled=${filterUser.cursorEnabled}&cursor=${filterUser.cursor}&page=${filterUser.page}&perPage=${filterUser.perPage}&sortBy=${filterUser.sortBy}&sortDirection=${filterUser.sortDirection}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': "application/json",
                "Authorization": `Bearer ${cookies.token}`
            }
        })
            .then((data) => {
                if (data.status === 200) {
                    const updateForm = initForm.map(item1 => {
                        const item2 = data.data.find(item => item.key === item1.key);
                        return item2 ? { ...item1, ...item2 } : item1;
                    });
                    const newItems = data.data.filter(item2 => !initForm.some(item1 => item1.key === item2.key));
                    const join = [...updateForm, ...newItems];

                    setInitForm(join)
                    setTimeout(() => {
                        const foundObject = join.filter(element => transaction.includes(element.key))
                        const foundObjectSeoHome = join.filter(element => seoHome.includes(element.key));
                        const foundObjectSeoCategory = join.filter(element => seoCategory.includes(element.key));
                        const foundObjectSeoSubcategory = join.filter(element => seoSubCategory.includes(element.key));
                        const foundObjectSeoAbout = join.filter(element => seoAbout.includes(element.key));
                        const foundEditorAbout = foundObjectSeoAbout.find(element => element.key === 'page.description_about');
                        const foundObjectPageTerm = join.filter(element => termTerm.includes(element.key));
                        const foundEditorTerm = foundObjectPageTerm.find(element => element.key === 'page.description_term');
                        const foundObjectPagePrivacy = join.filter(element => privacy.includes(element.key));
                        const foundEditorPrivacy = foundObjectPagePrivacy.find(element => element.key === 'page.description_privacy');
                        setHtmlAbout(foundEditorAbout.value);
                        setHtmlTerm(foundEditorTerm.value);
                        setHtmlPrivacy(foundEditorPrivacy.value);
                        setSelectedFormSeoCategory(foundObjectSeoCategory);
                        setSelectedFormSeoSubCategory(foundObjectSeoSubcategory);
                        setSelectedFormSeoHome(foundObjectSeoHome);
                        setSelectedFormSeoAbout(foundObjectSeoAbout);
                        setSelectedFormTransaction(foundObject);
                        setSelectedFormPagePrivacy(foundObjectPagePrivacy);
                        setSelectedFormPageTerm(foundObjectPageTerm);
                    }, 500);
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

    const submitToServer = async (data) => {
        await axios.put(`${urlAPI}backend/admin/settings`, data, {
            headers: {
                "Content-Type": "application/json",
                'Accept': "application/json",
                "Authorization": `Bearer ${cookies.token}`
            }
        })
            .then((data) => {
                if (data.status === 200) {
                    api.success({
                        message: "Save Config Success",
                        description: "Config saved successfully"
                    })
                }
            })
            .catch(function (error) {
                if (error.response) {
                    api.warning({
                        message: "Failed to save Config",
                        description: error.response.message
                    });
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

    const onSubmit = (data) => {
        let formData = {};
        if (selectForm == 'transaction') {
            formData = {
                "transactions.approval": data.transactions.approval,
                "transactions.min_withdrawal": data.transactions.min_withdrawal,
                "transactions.balance_enabled": data.transactions.balance_enabled == 1 ? true : false,
            }
        } else if (selectForm == 'home') {
            formData = {
                "seo.title_home": data.seo.title_home,
                "seo.description_home": data.seo.description_home
            }
        } else if (selectForm == 'category') {
            formData = {
                "seo.title_category": data.seo.title_category,
                "seo.description_category": data.seo.description_category
            }
        } else if (selectForm == 'subcategory') {
            formData = {
                "seo.title_subcategory": data.seo.title_subcategory,
                "seo.description_subcategory": data.seo.description_subcategory
            }
        } else if (selectForm == 'about') {
            formData = {
                "seo.title_about": data.seo.title_about,
                "seo.description_about": data.seo.description_about,
                "page.description_about": htmlAbout,
            }
        } else if (selectForm == 'term') {
            formData = {
                "page.title_term": data.page.title_term,
                "page.description_seo_term": data.page.description_seo_term,
                "page.description_term": htmlTerms,
            }
        } else if (selectForm == 'privacy') {
            formData = {
                "page.title_privacy": data.page.title_privacy,
                "page.description_seo_privacy": data.page.description_seo_privacy,
                "page.description_privacy": htmlPrivacy,
            }
        }
        submitToServer(formData);
    }

    useEffect(() => {
        if (!hasFetchedData.current) {
            getData();
            hasFetchedData.current = true;
        }
    }, [])

    return (
        <div className="admin-home">
            {contextHolder}
            <Card>
                <CardContent>
                    <Tabs defaultValue="transaction" className="w-full">
                        <TabsList className="grid w-full grid-cols-7">
                            <TabsTrigger value="transaction" onClick={() => setSelectedForm('transaction')}>Transaction</TabsTrigger>
                            <TabsTrigger value="home" onClick={() => setSelectedForm('home')}>Home</TabsTrigger>
                            <TabsTrigger value="category" onClick={() => setSelectedForm('category')}>Categories</TabsTrigger>
                            <TabsTrigger value="subcategory" onClick={() => setSelectedForm('subcategory')}>Sub Categories</TabsTrigger>
                            <TabsTrigger value="about" onClick={() => setSelectedForm('about')}>About</TabsTrigger>
                            <TabsTrigger value="term" onClick={() => setSelectedForm('term')}>Term and Condition</TabsTrigger>
                            <TabsTrigger value="privacy" onClick={() => setSelectedForm('privacy')}>Privacy</TabsTrigger>
                        </TabsList>
                        <TabsContent value="transaction">
                            <Card>
                                <CardContent className="space-y-2">
                                    <form className="flex flex-col gap-[8px]" onSubmit={handleSubmit(onSubmit)}>
                                        {
                                            selectedFormTransaction && selectedFormTransaction.map((item, index) => {
                                                if (item.type === "boolean") {
                                                    return (
                                                        <div key={index} className="space-y-1">
                                                            <Label htmlFor={item.key}>{item.label} ( 0 or 1)</Label>
                                                            <Input type="number"
                                                                maxLength="1"
                                                                id={item.key}
                                                                {...register(`${item.key}`)}
                                                                defaultValue={item.value} />
                                                        </div>
                                                    )
                                                } else {
                                                    return (
                                                        <div key={index} className="space-y-1">
                                                            <Label htmlFor={item.key}>{item.label}</Label>
                                                            <Input
                                                                id={item.key}
                                                                defaultValue={item.value}
                                                                {...register(`${item.key}`)}
                                                            />
                                                        </div>
                                                    )
                                                }

                                            })
                                        }
                                        <Button className="mt-[16px]" type="submit">Save</Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="home">
                            <Card>
                                <CardContent className="space-y-2">
                                    <form className="flex flex-col gap-[8px]" onSubmit={handleSubmit(onSubmit)}>
                                        {
                                            selectedFormSeoHome && selectedFormSeoHome.map((item, index) => {
                                                if (item.mode === "long") {
                                                    return (
                                                        <div key={index} className="space-y-1">
                                                            <Label htmlFor={item.key}>{item.label}</Label>
                                                            <Textarea
                                                                {...register(`${item.key}`)}
                                                                defaultValue={item.value} />
                                                        </div>
                                                    )
                                                } else {
                                                    return (
                                                        <div key={index} className="space-y-1">
                                                            <Label htmlFor={item.key}>{item.label}</Label>
                                                            <Input
                                                                id={item.key}
                                                                defaultValue={item.value}
                                                                {...register(`${item.key}`)}
                                                            />
                                                        </div>
                                                    )
                                                }

                                            })
                                        }
                                        <Button className="mt-[16px]" type="submit">Save</Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="category">
                            <Card>
                                <CardContent className="space-y-2">
                                    <form className="flex flex-col gap-[8px]" onSubmit={handleSubmit(onSubmit)}>
                                        {
                                            selectedFormSeoCategory && selectedFormSeoCategory.map((item, index) => {
                                                if (item.mode === "long") {
                                                    return (
                                                        <div key={index} className="space-y-1">
                                                            <Label htmlFor={item.key}>{item.label}</Label>
                                                            <Textarea
                                                                {...register(`${item.key}`)}
                                                                defaultValue={item.value} />
                                                        </div>
                                                    )
                                                } else {
                                                    return (
                                                        <div key={index} className="space-y-1">
                                                            <Label htmlFor={item.key}>{item.label}</Label>
                                                            <Input
                                                                id={item.key}
                                                                defaultValue={item.value}
                                                                {...register(`${item.key}`)}
                                                            />
                                                        </div>
                                                    )
                                                }

                                            })
                                        }
                                        <Button className="mt-[16px]" type="submit">Save</Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="subcategory">
                            <Card>
                                <CardContent className="space-y-2">
                                    <form className="flex flex-col gap-[8px]" onSubmit={handleSubmit(onSubmit)}>
                                        {
                                            selectedFormSeoSubCategory && selectedFormSeoSubCategory.map((item, index) => {
                                                if (item.mode === "long") {
                                                    return (
                                                        <div key={index} className="space-y-1">
                                                            <Label htmlFor={item.key}>{item.label}</Label>
                                                            <Textarea
                                                                {...register(`${item.key}`)}
                                                                defaultValue={item.value} />
                                                        </div>
                                                    )
                                                } else {
                                                    return (
                                                        <div key={index} className="space-y-1">
                                                            <Label htmlFor={item.key}>{item.label}</Label>
                                                            <Input
                                                                id={item.key}
                                                                defaultValue={item.value}
                                                                {...register(`${item.key}`)}
                                                            />
                                                        </div>
                                                    )
                                                }

                                            })
                                        }
                                        <Button className="mt-[16px]" type="submit">Save</Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="about">
                            <Card>
                                <CardContent className="space-y-2">
                                    <form className="flex flex-col gap-[8px]" onSubmit={handleSubmit(onSubmit)}>
                                        {
                                            selectedFormSeoAbout && selectedFormSeoAbout.map((item, index) => {
                                                if (item.mode === "long") {
                                                    return (
                                                        <div key={index} className="space-y-1">
                                                            <Label htmlFor={item.key}>{item.label}</Label>
                                                            <Textarea
                                                                {...register(`${item.key}`)}
                                                                defaultValue={item.value} />
                                                        </div>
                                                    )
                                                } else if (item.mode === "editor") {
                                                    return (
                                                        <div key={index} className="space-y-1">
                                                            <Label htmlFor={item.key}>{item.label}</Label>
                                                            <div className="border border-input rounded-[8px]">
                                                                <JoditEditor
                                                                    ref={editor}
                                                                    className="rounded-[8px]"
                                                                    value={htmlAbout ? htmlAbout : ''}
                                                                    config={config}
                                                                    tabIndex={1} // tabIndex of textarea
                                                                    onBlur={(newContent) => setHtmlAbout(newContent)} // preferred to use only this option to update the content for performance reasons
                                                                />
                                                            </div>
                                                        </div>
                                                    )
                                                } else {
                                                    return (
                                                        <div key={index} className="space-y-1">
                                                            <Label htmlFor={item.key}>{item.label}</Label>
                                                            <Input
                                                                id={item.key}
                                                                defaultValue={item.value}
                                                                {...register(`${item.key}`)}
                                                            />
                                                        </div>
                                                    )
                                                }
                                            })
                                        }
                                        <Button className="mt-[16px]" type="submit">Save</Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="term">
                            <Card>
                                <CardContent className="space-y-2">
                                    <form className="flex flex-col gap-[8px]" onSubmit={handleSubmit(onSubmit)}>
                                        {
                                            selectedFormPageTerm && selectedFormPageTerm.map((item, index) => {
                                                if (item.mode === "long") {
                                                    return (
                                                        <div key={index} className="space-y-1">
                                                            <Label htmlFor={item.key}>{item.label}</Label>
                                                            <Textarea
                                                                {...register(`${item.key}`)}
                                                                defaultValue={item.value} />
                                                        </div>
                                                    )
                                                } else if (item.mode === "editor") {
                                                    return (
                                                        <div key={index} className="space-y-1">
                                                            <Label htmlFor={item.key}>{item.label}</Label>
                                                            <div className="border border-input rounded-[8px]">
                                                                <JoditEditor
                                                                    ref={editor}
                                                                    className="rounded-[8px]"
                                                                    value={htmlTerms ? htmlTerms : ''}
                                                                    config={config}
                                                                    tabIndex={1} // tabIndex of textarea
                                                                    onBlur={(newContent) => setHtmlTerm(newContent)} // preferred to use only this option to update the content for performance reasons
                                                                />
                                                            </div>
                                                        </div>
                                                    )
                                                } else {
                                                    return (
                                                        <div key={index} className="space-y-1">
                                                            <Label htmlFor={item.key}>{item.label}</Label>
                                                            <Input
                                                                id={item.key}
                                                                defaultValue={item.value}
                                                                {...register(`${item.key}`)}
                                                            />
                                                        </div>
                                                    )
                                                }
                                            })
                                        }
                                        <Button className="mt-[16px]" type="submit">Save</Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="privacy">
                            <Card>
                                <CardContent className="space-y-2">
                                    <form className="flex flex-col gap-[8px]" onSubmit={handleSubmit(onSubmit)}>
                                        {
                                            selectedFormPagePrivacy && selectedFormPagePrivacy.map((item, index) => {
                                                if (item.mode === "long") {
                                                    return (
                                                        <div key={index} className="space-y-1">
                                                            <Label htmlFor={item.key}>{item.label}</Label>
                                                            <Textarea
                                                                {...register(`${item.key}`)}
                                                                defaultValue={item.value} />
                                                        </div>
                                                    )
                                                } else if (item.mode === "editor") {
                                                    return (
                                                        <div key={index} className="space-y-1">
                                                            <Label htmlFor={item.key}>{item.label}</Label>
                                                            <div className="border border-input rounded-[8px]">
                                                                <JoditEditor
                                                                    ref={editor}
                                                                    className="rounded-[8px]"
                                                                    value={htmlPrivacy ? htmlPrivacy : ''}
                                                                    config={config}
                                                                    tabIndex={1}
                                                                    onBlur={(newContent) => setHtmlPrivacy(newContent)} // preferred to use only this option to update the content for performance reasons
                                                                />
                                                            </div>
                                                        </div>
                                                    )
                                                } else {
                                                    return (
                                                        <div key={index} className="space-y-1">
                                                            <Label htmlFor={item.key}>{item.label}</Label>
                                                            <Input
                                                                id={item.key}
                                                                defaultValue={item.value}
                                                                {...register(`${item.key}`)}
                                                            />
                                                        </div>
                                                    )
                                                }
                                            })
                                        }
                                        <Button className="mt-[16px]" type="submit">Save</Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}

export default Settings;