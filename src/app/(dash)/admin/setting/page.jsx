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
            key: 'seo.title_home_id',
            label: "Seo Title home (ID)",
            type: 'string',
            value: '',
        },
        {
            key: 'seo.description_home_id',
            label: "Seo Description Home(ID)",
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
            key: 'seo.title_category_id',
            label: "Seo Title category (ID)",
            type: 'string',
            value: '',
        },
        {
            key: 'seo.description_category_id',
            label: "Seo Description category (ID)",
            type: 'string',
            mode: 'long',
            value: '',
        },
        {
            key: 'seo.title_result',
            label: "Seo Title result",
            type: 'string',
            value: '',
        },
        {
            key: 'seo.description_seo_result',
            label: "Seo Description result",
            type: 'string',
            mode: 'long',
            value: '',
        },
        {
            key: 'seo.title_result_id',
            label: "Seo Title result (ID)",
            type: 'string',
            value: '',
        },
        {
            key: 'seo.description_seo_result_id',
            label: "Seo Description result (ID)",
            type: 'string',
            mode: 'long',
            value: '',
        },
        {
            key: 'seo.title_explorer',
            label: "Seo Title explorer",
            type: 'string',
            value: '',
        },
        {
            key: 'seo.description_explorer',
            label: "Seo Description explorer",
            type: 'string',
            mode: 'long',
            value: '',
        },
        {
            key: 'seo.title_explorer_id',
            label: "Seo Title explorer (ID)",
            type: 'string',
            value: '',
        },
        {
            key: 'seo.description_explorer_id',
            label: "Seo Description explorer (ID)",
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
            key: 'seo.title_about_id',
            label: "Seo Title about (ID)",
            type: 'string',
            value: '',
        },
        {
            key: 'seo.description_about_id',
            label: "Seo Description about (ID)",
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
            key: 'page.description_about_id',
            label: "Page Description About (ID)",
            type: 'string',
            mode: 'editor_id',
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
            key: 'page.title_term_id',
            label: "Page Title term (ID)",
            type: 'string',
            value: '',
        },
        {
            key: 'page.description_seo_term_id',
            label: "Page Description seo term (ID)",
            type: 'string',
            mode: 'long',
            value: '',
        },
        {
            key: 'page.description_term_id',
            label: "Page Description term (ID)",
            type: 'string',
            mode: 'editor_id',
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
        {
            key: 'page.title_privacy_id',
            label: "Page Title privacy (ID)",
            type: 'string',
            value: '',
        },
        {
            key: 'page.description_seo_privacy_id',
            label: "Page Description seo privacy (ID)",
            type: 'string',
            mode: 'long',
            value: '',
        },
        {
            key: 'page.description_privacy_id',
            label: "Page Description privacy (ID)",
            type: 'string',
            mode: 'editor_id',
            value: '',
        },
        {
            key: 'page.title_contact',
            label: "Page Title contact",
            type: 'string',
            value: '',
        },
        {
            key: 'page.description_seo_contact',
            label: "Page Description seo contact",
            type: 'string',
            mode: 'long',
            value: '',
        },
        {
            key: 'page.description_contact',
            label: "Page Description contact",
            type: 'string',
            mode: 'editor',
            value: '',
        },
        {
            key: 'page.title_contact_id',
            label: "Page Title contact (ID)",
            type: 'string',
            value: '',
        },
        {
            key: 'page.description_seo_contact_id',
            label: "Page Description seo contact (ID)",
            type: 'string',
            mode: 'long',
            value: '',
        },
        {
            key: 'page.description_contact_id',
            label: "Page Description contact (ID)",
            type: 'string',
            mode: 'editor_id',
            value: '',
        },
    ]);
    const [htmlAbout, setHtmlAbout] = useState();
    const [htmlAboutID, setHtmlAboutID] = useState();

    const [htmlTerms, setHtmlTerm] = useState();
    const [htmlTermsID, setHtmlTermID] = useState();

    const [htmlPrivacy, setHtmlPrivacy] = useState();
    const [htmlPrivacyId, setHtmlPrivacyID] = useState();
    const [htmlContactID, setHtmlContactID] = useState();

    const [htmlContact, setHtmlContact] = useState();
    const [selectForm, setSelectedForm] = useState('transaction');
    const [selectedFormTransaction, setSelectedFormTransaction] = useState();
    const [selectedFormSeoHome, setSelectedFormSeoHome] = useState();
    const [selectedFormSeoCategory, setSelectedFormSeoCategory] = useState();
    const [selectedFormSeoExproler, setSelectedFormSeoExproler] = useState();
    const [selectedFormSeoAbout, setSelectedFormSeoAbout] = useState();
    const [selectedFormPageTerm, setSelectedFormPageTerm] = useState();
    const [selectedFormPagePrivacy, setSelectedFormPagePrivacy] = useState();
    const [selectedFormPageResult, setSelectedFormPageResult] = useState();
    const [selectedFormPageContact, setSelectedFormPageContact] = useState();

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
    const seoHome = ['seo.title_home', 'seo.description_home', 'seo.title_home_id', 'seo.description_home_id'];
    const seoCategory = ['seo.title_category', 'seo.description_category', 'seo.title_category_id', 'seo.description_category_id'];
    const seoExplorer = ['seo.title_explorer', 'seo.description_explorer', 'seo.title_explorer_id', 'seo.description_explorer_id'];
    const seoAbout = ['seo.title_about', 'seo.description_about', 'page.description_about', 'seo.title_about_id', 'seo.description_about_id', 'page.description_about_id'];
    const termTerm = ['page.title_term', 'page.description_seo_term', 'page.description_term', 'page.title_term_id', 'page.description_seo_term_id', 'page.description_term_id'];
    const privacy = ['page.title_privacy', 'page.description_seo_privacy', 'page.description_privacy', 'page.title_privacy_id', 'page.description_seo_privacy_id', 'page.description_privacy_id']
    const seoResult = ['seo.title_result', 'seo.description_seo_result', 'seo.title_result_id', 'seo.description_seo_result_id']
    const contact = ['page.title_contact', 'page.description_seo_contact', 'page.description_contact', 'page.title_contact_id', 'page.description_seo_contact_id', 'page.description_contact_id']
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
                        const foundObjectSeoResult = join.filter(element => seoResult.includes(element.key));
                        const foundObjectSeoCategory = join.filter(element => seoCategory.includes(element.key));
                        const foundObjectSeoExplorer = join.filter(element => seoExplorer.includes(element.key));
                        const foundObjectSeoAbout = join.filter(element => seoAbout.includes(element.key));
                        const foundEditorAbout = foundObjectSeoAbout.find(element => element.key === 'page.description_about');
                        const foundEditorAboutID = foundObjectSeoAbout.find(element => element.key === 'page.description_about_id');

                        const foundObjectPageTerm = join.filter(element => termTerm.includes(element.key));
                        const foundEditorTerm = foundObjectPageTerm.find(element => element.key === 'page.description_term');
                        const foundEditorTermID = foundObjectPageTerm.find(element => element.key === 'page.description_term_id');

                        const foundObjectPagePrivacy = join.filter(element => privacy.includes(element.key));
                        const foundEditorPrivacy = foundObjectPagePrivacy.find(element => element.key === 'page.description_privacy');
                        const foundEditorPrivacyID = foundObjectPagePrivacy.find(element => element.key === 'page.description_privacy_id');

                        const foundObjectContact = join.filter(element => contact.includes(element.key));
                        const foundEditorContact = foundObjectContact.find(element => element.key === 'page.description_contact');
                        const foundEditorContactID = foundObjectContact.find(element => element.key === 'page.description_contact_id');
                        setHtmlAbout(foundEditorAbout.value);
                        setHtmlAboutID(foundEditorAboutID.value);
                        setHtmlTerm(foundEditorTerm.value);
                        setHtmlTermID(foundEditorTermID.value);
                        setHtmlPrivacy(foundEditorPrivacy.value);
                        setHtmlPrivacyID(foundEditorPrivacyID.value);
                        setHtmlContact(foundEditorContact.value);
                        setHtmlContactID(foundEditorContactID.value);
                        setSelectedFormSeoCategory(foundObjectSeoCategory);
                        setSelectedFormSeoExproler(foundObjectSeoExplorer);
                        setSelectedFormSeoHome(foundObjectSeoHome);
                        setSelectedFormSeoAbout(foundObjectSeoAbout);
                        setSelectedFormTransaction(foundObject);
                        setSelectedFormPagePrivacy(foundObjectPagePrivacy);
                        setSelectedFormPageTerm(foundObjectPageTerm);
                        setSelectedFormPageResult(foundObjectSeoResult);
                        setSelectedFormPageContact(foundObjectContact);
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
                "seo.description_home": data.seo.description_home,
                "seo.title_home_id": data.seo.title_home_id,
                "seo.description_home_id": data.seo.description_home_id
            }
        } else if (selectForm == 'category') {
            formData = {
                "seo.title_category": data.seo.title_category,
                "seo.description_category": data.seo.description_category,
                "seo.title_category_id": data.seo.title_category_id,
                "seo.description_category_id": data.seo.description_category_id
            }
        } else if (selectForm == 'explorer') {
            formData = {
                "seo.title_explorer": data.seo.title_explorer,
                "seo.description_explorer": data.seo.description_explorer,
                "seo.title_explorer_id": data.seo.title_explorer_id,
                "seo.description_explorer_id": data.seo.description_explorer_id
            }
        } else if (selectForm == 'about') {
            formData = {
                "seo.title_about": data.seo.title_about,
                "seo.description_about": data.seo.description_about,
                "page.description_about": htmlAbout,
                "seo.title_about_id": data.seo.title_about_id,
                "seo.description_about_id": data.seo.description_about_id,
                "page.description_about_id": htmlAboutID,
            }
        } else if (selectForm == 'term') {
            formData = {
                "page.title_term": data.page.title_term,
                "page.description_seo_term": data.page.description_seo_term,
                "page.description_term": htmlTerms,
                "page.title_term_id": data.page.title_term_id,
                "page.description_seo_term_id": data.page.description_seo_term_id,
                "page.description_term_id": htmlTermsID,

            }
        } else if (selectForm == 'privacy') {
            formData = {
                "page.title_privacy": data.page.title_privacy,
                "page.description_seo_privacy": data.page.description_seo_privacy,
                "page.description_privacy": htmlPrivacy,
                "page.title_privacy_id": data.page.title_privacy_id,
                "page.description_seo_privacy_id": data.page.description_seo_privacy_id,
                "page.description_privacy_id": htmlPrivacyId,
            }
        } else if (selectForm == 'result') {
            formData = {
                "seo.title_result": data.seo.title_result,
                "seo.description_seo_result": data.seo.description_seo_result,
                "seo.title_result_id": data.seo.title_result_id,
                "seo.description_seo_result_id": data.seo.description_seo_result_id,
            }
        } else if (selectForm == 'contact') {
            formData = {
                "page.title_contact": data.page.title_contact,
                "page.description_seo_contact": data.page.description_seo_contact,
                "page.description_contact": htmlContact,
                "page.title_contact_id": data.page.title_contact_id,
                "page.description_seo_contact_id": data.page.description_seo_contact_id,
                "page.description_contact_id": htmlContactID,
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
                        <TabsList className="grid w-full grid-cols-9">
                            <TabsTrigger value="transaction" onClick={() => setSelectedForm('transaction')}>Transaction</TabsTrigger>
                            <TabsTrigger value="home" onClick={() => setSelectedForm('home')}>Home</TabsTrigger>
                            <TabsTrigger value="result" onClick={() => setSelectedForm('result')}>Result</TabsTrigger>
                            <TabsTrigger value="category" onClick={() => setSelectedForm('category')}>Categories</TabsTrigger>
                            <TabsTrigger value="explorer" onClick={() => setSelectedForm('explorer')}>Explorer</TabsTrigger>
                            <TabsTrigger value="about" onClick={() => setSelectedForm('about')}>About</TabsTrigger>
                            <TabsTrigger value="term" onClick={() => setSelectedForm('term')}>Term Condition</TabsTrigger>
                            <TabsTrigger value="privacy" onClick={() => setSelectedForm('privacy')}>Privacy</TabsTrigger>
                            <TabsTrigger value="contact" onClick={() => setSelectedForm('contact')}>Contact Us</TabsTrigger>
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
                        <TabsContent value="result">
                            <Card>
                                <CardContent className="space-y-2">
                                    <form className="flex flex-col gap-[8px]" onSubmit={handleSubmit(onSubmit)}>
                                        {
                                            selectedFormPageResult && selectedFormPageResult.map((item, index) => {
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
                        <TabsContent value="explorer">
                            <Card>
                                <CardContent className="space-y-2">
                                    <form className="flex flex-col gap-[8px]" onSubmit={handleSubmit(onSubmit)}>
                                        {
                                            selectedFormSeoExproler && selectedFormSeoExproler.map((item, index) => {
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
                                                } else if (item.mode === "editor_id") {
                                                    return (
                                                        <div key={index} className="space-y-1">
                                                            <Label htmlFor={item.key}>{item.label}</Label>
                                                            <div className="border border-input rounded-[8px]">
                                                                <JoditEditor
                                                                    ref={editor}
                                                                    className="rounded-[8px]"
                                                                    value={htmlAboutID ? htmlAboutID : ''}
                                                                    config={config}
                                                                    tabIndex={1} // tabIndex of textarea
                                                                    onBlur={(newContent) => setHtmlAboutID(newContent)} // preferred to use only this option to update the content for performance reasons
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
                                                } else if (item.mode === "editor_id") {
                                                    return (
                                                        <div key={index} className="space-y-1">
                                                            <Label htmlFor={item.key}>{item.label}</Label>
                                                            <div className="border border-input rounded-[8px]">
                                                                <JoditEditor
                                                                    ref={editor}
                                                                    className="rounded-[8px]"
                                                                    value={htmlTermsID ? htmlTermsID : ''}
                                                                    config={config}
                                                                    tabIndex={1} // tabIndex of textarea
                                                                    onBlur={(newContent) => setHtmlTermID(newContent)} // preferred to use only this option to update the content for performance reasons
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
                                                } else if (item.mode === "editor_id") {
                                                    return (
                                                        <div key={index} className="space-y-1">
                                                            <Label htmlFor={item.key}>{item.label}</Label>
                                                            <div className="border border-input rounded-[8px]">
                                                                <JoditEditor
                                                                    ref={editor}
                                                                    className="rounded-[8px]"
                                                                    value={htmlPrivacyId ? htmlPrivacyId : ''}
                                                                    config={config}
                                                                    tabIndex={1} // tabIndex of textarea
                                                                    onBlur={(newContent) => setHtmlPrivacyID(newContent)} // preferred to use only this option to update the content for performance reasons
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
                        <TabsContent value="contact">
                            <Card>
                                <CardContent className="space-y-2">
                                    <form className="flex flex-col gap-[8px]" onSubmit={handleSubmit(onSubmit)}>
                                        {
                                            selectedFormPageContact && selectedFormPageContact.map((item, index) => {
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
                                                                    value={htmlContact ? htmlContact : ''}
                                                                    config={config}
                                                                    tabIndex={1}
                                                                    onBlur={(newContent) => setHtmlContact(newContent)} // preferred to use only this option to update the content for performance reasons
                                                                />
                                                            </div>
                                                        </div>
                                                    )
                                                } else if (item.mode === "editor_id") {
                                                    return (
                                                        <div key={index} className="space-y-1">
                                                            <Label htmlFor={item.key}>{item.label}</Label>
                                                            <div className="border border-input rounded-[8px]">
                                                                <JoditEditor
                                                                    ref={editor}
                                                                    className="rounded-[8px]"
                                                                    value={htmlContactID ? htmlContactID : ''}
                                                                    config={config}
                                                                    tabIndex={1}
                                                                    onBlur={(newContent) => setHtmlContactID(newContent)} // preferred to use only this option to update the content for performance reasons
                                                                />
                                                            </div>
                                                        </div>
                                                    )
                                                }  else {
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