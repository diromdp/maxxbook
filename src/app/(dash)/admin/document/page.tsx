"use client"
import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

import { FiEdit, FiTrash2, FiFilePlus  } from "react-icons/fi";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getSortedRowModel,
    getPaginationRowModel,
    ColumnDef
} from '@tanstack/react-table';
import { Input } from "@/components/ui/input"

type Document = {
    id: number;
    name: string;
    email: string;
    status: string;
};
const columnHelper = createColumnHelper<Document>();
const columns: ColumnDef<Document>[] = [
    columnHelper.accessor('id', {
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('name', {
        cell: info => info.getValue(),
    }),
    columnHelper.accessor(row => row.email, {
        id: 'email',
        cell: info => <i>{info.getValue()}</i>,
        header: () => <span>Email</span>,
    }),
    columnHelper.accessor("status", {
        header: () => "Status",
        cell: info => info.renderValue(),
    }),
    columnHelper.accessor("action", {
        header: () => "Action",
        cell: ({ row }) => {
            const user: any = row.original
            return (
                <div className="flex items-center gap-[16px]">
                    <Button variant="destructive" className="focus:outline-none text-white font-medium rounded-lg text-sm">
                        <FiTrash2 />
                    </Button>
                    <Button className="focus:outline-none text-white font-medium rounded-lg text-sm">
                        <FiEdit />
                    </Button>
                </div>
            )
        },
    })
]

const Documents = () => {
    const [sorting, setSorting] = useState<SortingState>([])
    const [data] = useState([{
        "id": "1",
        "name": "John",
        "email": "john@example.com",
        "status": "verified",
    },
    {
        "id": "2",
        "name": "John 2",
        "email": "john@example.com",
        "status": "verified",
    },
    {
        "id": "3",
        "name": "John 3",
        "email": "john@example.com",
        "status": "non verified",
    },
    {
        "id": "4",
        "name": "John 4",
        "email": "john@example.com",
        "status": "verified",
    },
    {
        "id": "5",
        "name": "John 5",
        "email": "john@example.com",
        "status": "verified",
    },
    {
        "id": "6",
        "name": "John 6",
        "email": "john@example.com",
        "status": "verified",
    }
    ])


    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
        },
        initialState: {
            pagination: {
                pageSize: 2,
            },
        },
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <div className="admin-home">
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <Input className="w-60" type="text" placeholder="Search" />
                        <Button><FiFilePlus/></Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow
                                    key={headerGroup.id}
                                >
                                    {headerGroup.headers.map((header) => (
                                        <TableHead
                                            key={header.id}
                                        >
                                            {header.isPlaceholder ? null : (
                                                <div
                                                    {...{
                                                        className: header.column.getCanSort()
                                                            ? 'cursor-pointer select-none flex min-w-[36px]'
                                                            : '',
                                                        onClick: header.column.getToggleSortingHandler(),
                                                    }}
                                                >
                                                    {flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                                    {{
                                                        asc: <span className="pl-2">↑</span>,
                                                        desc: <span className="pl-2">↓</span>,
                                                    }[header.column.getIsSorted() as string] ?? null}
                                                </div>
                                            )}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (

                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <div className="mt-[32px]">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious href="#" />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#">1</PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#" isActive>
                                        2
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#">3</PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationNext href="#" />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default Documents;