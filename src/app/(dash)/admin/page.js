"use client"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { kFormatter } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { useCookies } from "react-cookie"
import { urlAPI } from "../../../lib/constant";

const AdmninDashboard = () => {
    const [loading, setLoading] = useState(false);
    const [cookies] = useCookies(["token"])

    const [data, setData]= useState({});

    const getDataDashboard = async() =>{
        await axios.get(`${urlAPI}backend/admin/dashboard/summaries`,{
            headers: {
                'Content-Type': 'application/json',
                'Accept': "application/json",
                "Authorization": `Bearer ${cookies.token}`
            }
        })
        .then((data) => {
            setLoading(true);
            if(data.status === 200) {
                setData(data.data)
            }
        })
        .catch(function (error) {
          if (error.response) {
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

    useEffect(() => {
        getDataDashboard();
    }, [])
    console.log(data && data);
    return (
        <div className="admin-home">
            <div className="content-item">
                <div className="total-users">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Users</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {
                                !loading ? <Skeleton className="h-6 w-[150px]" /> :
                                    <span className="text-3xl font-semibold tracking-tight text-gray-950 dark:text-white">{kFormatter(data.total_users)}</span>
                            }
                        </CardContent>
                    </Card>
                </div>
                <div className="total-documents">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Documents</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {
                                !loading ? <Skeleton className="h-6 w-[150px]" /> :
                                    <span className="text-3xl font-semibold tracking-tight text-gray-950 dark:text-white">{kFormatter(data.total_documents)}</span>

                            }
                        </CardContent>
                    </Card>
                </div>
                <div className="total visitor">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Visitor</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {
                                !loading ? <Skeleton className="h-6 w-[150px]" /> :
                                    <span className="text-3xl font-semibold tracking-tight text-gray-950 dark:text-white">{kFormatter(data.total_visitors)}</span>

                            }
                        </CardContent>
                    </Card>
                </div>
                <div className="total download">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Download</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {
                                !loading ? <Skeleton className="h-6 w-[150px]" /> :
                                    <span className="text-3xl font-semibold tracking-tight text-gray-950 dark:text-white">{kFormatter(data.total_visitors)}</span>

                            }
                        </CardContent>
                    </Card>
                </div>
            </div>

        </div>
    );
}

export default AdmninDashboard;