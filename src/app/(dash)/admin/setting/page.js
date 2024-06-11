"use client"
import { useState, useEffect, useRef } from "react";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useCookies } from "react-cookie";
import axios from "axios";

import { urlAPI } from "../../../../lib/constant";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

const Category = () => {
    const [cookies] = useCookies(["token"])
    const [dataFetch, setDataFetch] = useState([]);
    const [dataPagination, setDataPagination] = useState([]);
    const [selectForm , setSelectedForm] = useState();
    const [selectedFormTransaction, setSelectedFormTransaction] = useState();
    const [filterUser, setFilterUser] = useState({
        q: "",
        cursorEnabled: null,
        cursor: "",
        page: "1",
        perPage: "50",
        sortBy: "created_at",
        sortDirection: "desc"
    });

    const transaction = ['transactions.approval', 'transactions.min_withdrawal', 'transactions.balance_enabled']
    const router = useRouter();
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
                    const foundObject = data.data.filter(element => transaction.includes(element.key))
                    setDataFetch(data.data);
                    setSelectedFormTransaction(foundObject);
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
        if (!hasFetchedData.current) {
            getData();
            hasFetchedData.current = true;
        }
    }, [])

    return (
        <div className="admin-home">
            <Card>
                <CardContent>
                    <Tabs defaultValue="account" className="w-full">
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
                                    <div className="space-y-1">
                                        <Label htmlFor="name">Price Of Approve</Label>
                                        <Input id="name" defaultValue="Pedro Duarte" />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="username"></Label>
                                        <Input id="username" defaultValue="@peduarte" />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="username"></Label>
                                        <Input id="username" defaultValue="@peduarte" />
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="home">
                            <Card>
                                <CardContent className="space-y-2">
                                    <div className="space-y-1">
                                        <Label htmlFor="current">Current password</Label>
                                        <Input id="current" type="password" />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="new">New password</Label>
                                        <Input id="new" type="password" />
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="category">
                            <Card>
                                <CardContent className="space-y-2">
                                    <div className="space-y-1">
                                        <Label htmlFor="current">Current password</Label>
                                        <Input id="current" type="password" />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="new">New password</Label>
                                        <Input id="new" type="password" />
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="subcategory">
                            <Card>
                                <CardContent className="space-y-2">
                                    <div className="space-y-1">
                                        <Label htmlFor="current">Current password</Label>
                                        <Input id="current" type="password" />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="new">New password</Label>
                                        <Input id="new" type="password" />
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="about">
                            <Card>
                                <CardContent className="space-y-2">
                                    <div className="space-y-1">
                                        <Label htmlFor="current">Current password</Label>
                                        <Input id="current" type="password" />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="new">New password</Label>
                                        <Input id="new" type="password" />
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                         <TabsContent value="term">
                            <Card>
                                <CardContent className="space-y-2">
                                    <div className="space-y-1">
                                        <Label htmlFor="current">Current password</Label>
                                        <Input id="current" type="password" />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="new">New password</Label>
                                        <Input id="new" type="password" />
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="privacy">
                            <Card>
                                <CardContent className="space-y-2">
                                    <div className="space-y-1">
                                        <Label htmlFor="current">Current password</Label>
                                        <Input id="current" type="password" />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="new">New password</Label>
                                        <Input id="new" type="password" />
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}

export default Category;