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
import { useRouter } from 'next/navigation';

import { FiEdit, FiTrash2, FiFilePlus } from "react-icons/fi";
import { Input, Tooltip } from 'antd';
import { useCookies } from "react-cookie";

import axios from "axios";
import { Table } from 'antd';
import dayjs from "dayjs";
import { urlAPI } from "@/lib/constant";

const { Search } = Input;


const Category = () => {
    const [cookies] = useCookies(["token"])
    const [dataFetch, setDataFetch] = useState([]);
    const [dataPagination, setDataPagination] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filterUser, setFilterUser] = useState({
        q: "",
        cursorEnabled: null,
        cursor: "",
        page: "1",
        perPage: "50",
        sortBy: "id",
        sortDirection: "desc"
    });
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'Code Bank',
            dataIndex: 'code',
        },
        {
            title: 'Created At',
            dataIndex: 'created_at',
            render: (val) => {
                const format = dayjs(val).format("DD MM YYYY HH:mm"); // display
                return (
                    <span>{val ? format : ""}</span>
                )
            }
        },
        {
            title: 'Deleted At',
            dataIndex: 'deleted_at',
            render: (val) => {
                const format = dayjs(val).format("DD MM YYYY HH:mm"); // display
                return (
                    <span>{val ? format : ""}</span>
                )
            }
        },
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 100,
            render: (val) => {
                return (
                    <div className="flex items-center gap-[16px]">
                        <Tooltip title="Delete">
                            <Button variant="destructive" onClick={() => deleteDataSingle(val.id)} className="focus:outline-none text-white font-medium rounded-lg text-sm">
                                <FiTrash2 />
                            </Button>
                        </Tooltip>
                        <Tooltip title="Edit">
                            <Button onClick={() => editData(val)} className="focus:outline-none text-white font-medium rounded-lg text-sm">
                                <FiEdit />
                            </Button>
                        </Tooltip>
                    </div>
                )
            }
            ,
        }
    ];
    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    const router = useRouter();
    const hasFetchedData = useRef(false);


    const getData = async () => {
        await axios.get(`${urlAPI}backend/admin/banks/paginated?q=${filterUser.q}&cursorEnabled=${filterUser.cursorEnabled}&cursor=${filterUser.cursor}&page=${filterUser.page}&perPage=${filterUser.perPage}&sortBy=${filterUser.sortBy}&sortDirection=${filterUser.sortDirection}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': "application/json",
                "Authorization": `Bearer ${cookies.token}`
            }
        })
            .then((data) => {
                if (data.status === 200) {
                    let filtereData = data.data.data;
                    setIsLoading(false)
                    setDataFetch(filtereData)
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
            setFilterUser({ ...filterUser, page: page });
            await axios.get(`${urlAPI}backend/admin/banks/paginated?q=${filterUser.q}&page=${page}&perPage=${filterUser.perPage}&sortBy=${filterUser.sortBy}&sortDirection=${filterUser.sortDirection}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json",
                    "Authorization": `Bearer ${cookies.token}`
                }
            })
                .then((data) => {
                    if (data.status === 200) {
                        let filtereData = data.data.data;
                        setIsLoading(false)
                        setDataFetch(filtereData)
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

    const searchItems = async (value, _e, info) => {
        setFilterUser({ ...filterUser, page: 1, q: value });
        await axios.get(`${urlAPI}backend/admin/banks/paginated?q=${value}&page=${1}&perPage=${filterUser.perPage}&sortBy=${filterUser.sortBy}&sortDirection=${filterUser.sortDirection}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': "application/json",
                "Authorization": `Bearer ${cookies.token}`
            }
        })
            .then((data) => {
                if (data.status === 200) {
                    let filtereData = data.data.data;
                    setIsLoading(false)
                    setDataFetch(filtereData)
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

    const removeItems = (array, itemToRemove) => {
        return array.filter(v => {
            return !itemToRemove.includes(v.id);
        });
    }

    const editData = (next) => {
        router.push(`/admin/bank/${next.id}?id=${next.id}&name=${next.name}&description=${next.description}`);
    }

    const deleteData = async () => {
        await axios.delete(`${urlAPI}backend/admin/banks`, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${cookies.token}`
            },
            data: {
                ids: selectedRowKeys
            }
        })
            .then((data) => {
                if (data.status === 200) {
                    setDataFetch(removeItems(dataFetch, selectedRowKeys))
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

    const deleteDataSingle = async (val) => {
        await axios.delete(`${urlAPI}backend/admin/banks`, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${cookies.token}`
            },
            data: {
                ids: [val]
            }
        })
            .then((data) => {
                if (data.status === 200) {
                    setDataFetch(removeItems(dataFetch, [val]))
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
                        <Tooltip title="Create">
                            <Button onClick={() => router.push('/admin/bank/add', undefined, { shallow: true })}><FiFilePlus /></Button>
                        </Tooltip>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-start mb-4 gap-[8px] items-center">
                        <Tooltip title="Delete">
                            <Button variant="destructive" disabled={selectedRowKeys.length < 1} className="focus:outline-none text-white font-medium rounded-lg text-sm" onClick={deleteData}>
                                <FiTrash2 />
                            </Button>
                        </Tooltip>
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
                                    dataPagination && dataPagination.map((data, index) => {
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