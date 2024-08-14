"use client"
import { useState, useEffect, useRef } from "react";
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { notification } from 'antd';
import { FiEdit } from "react-icons/fi";
import { Input } from 'antd';
import { useCookies } from "react-cookie";
import axios from "axios";
import { Table } from 'antd';
import dayjs from "dayjs";
import { urlAPI } from "@/lib/constant";
import 'dayjs/locale/id';
import localeData from 'dayjs/plugin/localeData';
import { formatRupiah } from "@/lib/utils";


const { Search } = Input;

dayjs.extend(localeData);
dayjs.locale('id');

const Category = () => {
    const [cookies] = useCookies(["token"])
    const [dataFetch, setDataFetch] = useState([]);
    const [dataPagination, setDataPagination] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filterData, setFilterData] = useState({
        q: "",
        cursorEnabled: null,
        cursor: "",
        page: "1",
        perPage: "50",
        sortBy: "status",
        status: "",
        sortDirection: "desc"
    });
    const [api] = notification.useNotification();
    const hasFetchedData = useRef(false);

    const columns = [
        {
            title: 'Username',
            dataIndex: 'user_name',
        },
        {
            title: 'Status',
            dataIndex: 'status',
        },
        {
            title: 'balance',
            dataIndex: 'balance',
            render: (val) => {
                return (
                    <span>{formatRupiah(val)}</span>
                )
            }
        },
        {
            title: "Bank Account Number",
            dataIndex: "user",
            render: (val) => {
                return (
                    <span> {val ? val.bank_account.account_number : ""}</span>
                )
            }
        },
        {
            title: "Bank Account Number",
            dataIndex: "user",
            render: (val) => {
                return (
                    <span> {val ? val.bank_account.account_name : ""}</span>
                )
            }
        },
        {
            title: "Email Address",
            dataIndex: "user",
            render: (val) => {
                return (
                    <span> {val ? val.email : ""}</span>
                )
            }
        },
        {
            title: 'Transaction Date',
            dataIndex: 'transaction_date',
            render: (val) => {
                const format = dayjs(val).format("D MMMM YYYY"); // display
                return (
                    <span>{val ? format : ""}</span>
                )
            }
        },
        {
            title: 'Approval',
            key: 'operation',
            fixed: 'right',
            width: 100,
            render: (val) => {
                return (
                    <div className="flex items-center gap-[16px]">
                        <Button onClick={() => approvalUser(val)} className="focus:outline-none text-white font-medium rounded-lg text-sm">
                            <FiEdit />
                        </Button>
                    </div>
                )
            }
        }
    ];
    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    const getData = async () => {
        await axios.get(`${urlAPI}backend/admin/transactions/withdrawals?q=${filterData.q}&cursorEnabled=${filterData.cursorEnabled}&cursor=${filterData.cursor}&page=${filterData.page}&perPage=${filterData.perPage}&status=${filterData.status}&sortBy=${filterData.sortBy}&sortDirection=${filterData.sortDirection}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': "application/json",
                "Authorization": `Bearer ${cookies.token}`
            }
        })
            .then((data) => {
                if (data.status === 200) {
                    setIsLoading(false)
                    setDataFetch(data.data.data)
                    setDataPagination(data.data.links)
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

    const updatePagination = async (val) => {
        var url_string = val;

        if (url_string) {
            var url = new URL(url_string);
            var page = url.searchParams.get("page");
            setFilterData({ ...filterData, page: page });

            await axios.get(`${urlAPI}backend/admin/transactions/withdrawals?q=${filterData.q}&page=${page}&perPage=${filterData.perPage}&status=${filterData.status}&sortBy=${filterData.sortBy}&sortDirection=${filterData.sortDirection}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json",
                    "Authorization": `Bearer ${cookies.token}`
                }
            })
                .then((data) => {
                    if (data.status === 200) {
                        setIsLoading(false)
                        setDataFetch(data.data.data)
                        setDataPagination(data.data.links)
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

    }

    const searchItems = async (value, _e) => {
        setFilterData({ ...filterData, page: 1, q: value });
        await axios.get(`${urlAPI}backend/admin/transactions/withdrawals?q=${value}&page=${1}&perPage=${filterData.perPage}&status=${filterData.status}&sortBy=${filterData.sortBy}&sortDirection=${filterData.sortDirection}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': "application/json",
                "Authorization": `Bearer ${cookies.token}`
            }
        })
            .then((data) => {
                if (data.status === 200) {
                    setIsLoading(false)
                    setDataFetch(data.data.data)
                    setDataPagination(data.data.links)
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

    const approvalUser = async (next) => {
        const formData = {
            action: "TRANSFERRED"
        }
        await axios.post(`${urlAPI}backend/admin/transactions/${next.id}/withdrawals`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                'Accept': "application/json",
                "Authorization": `Bearer ${cookies.token}`
            }
        })
            .then((data) => {
                if (data.status === 200) {
                    api.success({
                        message: 'Approved transaction',
                        description: "Withdrawal transaction is successfully"
                    })
                    setTimeout(() => { getData() }, 200);
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

    const multipleApproval = async () => {
        const selectedRowChanges = selectedRowKeys.map(item => {
            return {
                id: item,
                action: "TRANSFERRED"
            };
        });
        const formdata = {
            transactions: selectedRowChanges
        }

        await axios.put(`${urlAPI}backend/admin/transactions/withdrawals`, formdata, {
            headers: {
                "Content-Type": "application/json",
                'Accept': "application/json",
                "Authorization": `Bearer ${cookies.token}`
            }
        })
            .then((data) => {
                if (data.status === 200) {
                    api.success({
                        message: 'Approved transaction',
                        description: "Withdrawal transaction is successfully"
                    })
                    setSelectedRowKeys([]);
                    setTimeout(() => { getData() }, 200);
                }
            })
            .catch(function (error) {
                if (error.response) {
                    
                    console.log(error.response.status);
                    
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
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <Search
                            className="w-[250px]"
                            onSearch={searchItems}
                            allowClear
                            placeholder="Search..."
                            loading={isLoading} />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-start mb-4 gap-[8px] items-center">
                        <Button disabled={selectedRowKeys.length < 1} className="focus:outline-none text-white font-medium rounded-lg text-sm" onClick={multipleApproval}>
                            <FiEdit />
                        </Button>
                        <span className="text-sm">
                            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                        </span>
                    </div>
                    <Table
                        columns={columns}
                        dataSource={dataFetch}
                        pagination={false}
                        loading={isLoading}
                        rowSelection={rowSelection}
                        rowKey='id'
                    />
                    <div className="mt-[32px] flex justify-between">
                        <Pagination>
                            <PaginationContent>
                                {
                                    dataPagination && dataPagination.map((data,index) => {
                                        if (data.label === "&laquo; Previous") {
                                            return (
                                                <PaginationItem key={index}>
                                                    <PaginationPrevious disabled={data.url != null ? false : true} className="cursor-pointer" data-url={data.url} onClick={() => updatePagination(data.url)} />
                                                </PaginationItem>

                                            )
                                        } else if (data.label === "Next &raquo;") {
                                            return (
                                                <PaginationItem key={index}>
                                                    <PaginationNext disabled={data.url != null ? false : true} className="cursor-pointer" data-url={data.url} onClick={() => updatePagination(data.url)} />
                                                </PaginationItem>
                                            )
                                        } else {
                                            return (
                                                <PaginationItem key={index}>
                                                    <PaginationLink className="cursor-pointer" data-url={data.url} isActive={data.active} onClick={() => updatePagination(data.url)}>
                                                        {data.label}
                                                    </PaginationLink>
                                                </PaginationItem>
                                            )
                                        }
                                    })
                                }

                            </PaginationContent>
                        </Pagination>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default Category;