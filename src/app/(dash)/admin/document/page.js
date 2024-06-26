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
import { Badge } from "@/components/ui/badge";
import { FiEdit, FiTrash2, FiFilePlus, FiFeather } from "react-icons/fi";
import { Input } from 'antd';
import { useCookies } from "react-cookie";
import Link from "next/link";
import axios from "axios";
import { Table, Tooltip } from 'antd';
import Image from "next/image";

import { urlAPI } from "../../../../lib/constant";

const { Search } = Input;


const Document = () => {
    const [cookies] = useCookies(["token"])
    const [dataFetch, setDataFetch] = useState([]);
    const [dataPagination, setDataPagination] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [filterData, setFilterData] = useState({
        q: "",
        cursor: "",
        perPage: "50",
        sortBy: "title",
        sortDirection: "asc",
        user_id: "",
        category_id: "",
        sub_category_id: "",
        approval_status: ""
    });
    const columns = [
        {
            title: 'Title Document',
            dataIndex: 'title',
            responsive: ["sm"]
        },
        {
            title: 'Image Thumbnail',
            dataIndex: 'thumb_url',
            responsive: ["sm"],
            render: (val) => {
                return (
                    <>
                        {
                            val && <Image src={val} height={200} width={150} />
                        }
                    </>
                )
            }
        },
        {
            title: 'Category',
            dataIndex: 'category',
            responsive: ["sm"],
            render: (val) => {
                return (
                    <>
                        {
                            val && <Badge variant="secondary">{val.name}</Badge>
                        }
                    </>
                )
            }
        },
        {
            title: 'Sub Category',
            dataIndex: 'sub_category',
            responsive: ["sm"],
            render: (val) => {
                return (
                    <>
                        <Badge variant="secondary">{val && val.name}</Badge>
                    </>
                )
            }
        },
        {
            title: 'Upload By User',
            dataIndex: 'user',
            responsive: ["sm"],
            render: (val) => {
                return (
                    <>
                        {
                            val && <span className="text-md font-medium text-black">{val.name}</span>
                        }
                    </>
                )
            }
        },
        {
            title: 'View Document',
            dataIndex: 'url',
            responsive: ["sm"],
            render: (url) => {
                return (
                    <>
                        {
                            url && <Link href={url} target="_blank" className="text-md font-medium text-black underline">{'Click Here'}</Link>
                        }
                    </>
                )
            }
        },
        {
            title: 'Status',
            dataIndex: 'approval',
            responsive: ["sm"],
            render: (val) => {
                return (
                    <>
                        {
                            val && <span className="text-md font-medium text-black">{val.approval_status}</span>
                        }
                    </>
                )
            }
        },
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            responsive: ["sm"],
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
                        <Tooltip title="Approval">
                            <Button disabled={val.approval.approval_status === "APPROVED" ? true : false} onClick={() => approvalDataSingle(val)} className="focus:outline-none text-white font-medium rounded-lg text-sm">
                                <FiFeather />
                            </Button>
                        </Tooltip>
                    </div>
                )
            }
            ,
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
    const router = useRouter();
    const hasFetchedData = useRef(false);

    const getData = async () => {
        await axios.get(`${urlAPI}backend/admin/documents?q=${filterData.q}&cursor=${filterData.cursor}&perPage=${filterData.perPage}&sortBy=${filterData.sortBy}&sortDirection=${filterData.sortDirection}&user_id=${filterData.user_id}&category_id=${filterData.category_id}&sub_category_id=${filterData.sub_category_id}&approval_status=${filterData.approval_status}`, {
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
                    console.log(error.response.headers);
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
            await axios.get(`${urlAPI}backend/admin/documents?q=${filterData.q}&cursor=${filterData.cursor}&perPage=${filterData.perPage}&sortBy=${filterData.sortBy}&sortDirection=${filterData.sortDirection}&user_id=${filterData.user_id}&category_id=${filterData.category_id}&sub_category_id=${filterData.sub_category_id}&approval_status=${filterData.approval_status}`, {
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
                        console.log(error.response.headers);
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
        setFilterData({ ...filterData, q: value });
        await axios.get(`${urlAPI}backend/admin/documents?q=${value}&cursor=${filterData.cursor}&perPage=${filterData.perPage}&sortBy=${filterData.sortBy}&sortDirection=${filterData.sortDirection}&user_id=${filterData.user_id}&category_id=${filterData.category_id}&sub_category_id=${filterData.sub_category_id}&approval_status=${filterData.approval_status}`, {
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
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
            });
    }

    const removeItems = (array, itemToRemove) => {
        return array.filter(v => {
            return !itemToRemove.includes(v.id);
        });
    }

    const editData = (data) => {

        router.push(`/admin/document/${data.id}?id=${data.id}&title=${data.title}&description=${data.description}&category_id=${data.category_id ? data.category_id : ''}&upload_id=${data.upload ? data.upload.id : ''}&sub_category_id=${data.sub_category_id ? data.sub_category_id : ''}`);
    }

    const deleteData = async () => {
        await axios.delete(`${urlAPI}backend/admin/documents`, {
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
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });
    }

    const deleteDataSingle = async (val) => {
        await axios.delete(`${urlAPI}backend/admin/documents/${val}`, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${cookies.token}`
            },
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
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });
    }

    const approvalDataSingle = async (val) => {
        await axios.put(`${urlAPI}backend/admin/documents/${val.id}/approval`, {
            "approval_status": "APPROVED",
            "notes": "APPROVED",
        }, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${cookies.token}`
            },
        })
            .then((data) => {
                if (data.status === 200) {
                    const updateDocument = dataFetch.map(document =>
                        document.id === val.id ? {
                            ...document, approval: {
                                approval_status: "APPROVED"
                            }
                        } : document
                    );
                    setDataFetch(updateDocument);
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

    const approvalData = async () => {
        await axios.put(`${urlAPI}backend/admin/documents/approval`, {
            "approval_status": "APPROVED",
            "notes": "APPROVED",
            ids: selectedRowKeys
        }, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${cookies.token}`
            },
        })
            .then((data) => {
                if (data.status === 200) {
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
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <Search
                            className="w-[250px]"
                            onSearch={searchItems}
                            allowClear
                            placeholder="Search..."
                            loading={isLoading} />
                        <Tooltip title="Create">
                            <Button onClick={() => router.push('/admin/document/add')}><FiFilePlus /></Button>
                        </Tooltip>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-start mb-4 gap-[8px] items-center">
                        <Tooltip title="Multiple Delete">
                            <Button variant="destructive" disabled={selectedRowKeys.length < 1} className="focus:outline-none text-white font-medium rounded-lg text-sm" onClick={deleteData}>
                                <FiTrash2 />
                            </Button>
                        </Tooltip>
                        <Tooltip title="Multiple Approve">
                        <Button disabled={selectedRowKeys.length < 1} onClick={approvalData} className="focus:outline-none text-white font-medium rounded-lg text-sm" >
                            <FiFeather />
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

export default Document;