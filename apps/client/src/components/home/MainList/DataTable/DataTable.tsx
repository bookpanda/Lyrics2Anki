"use client";

import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    Row,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useAppContext, useOpenContext } from "@/contexts";
import { Song } from "@/types/types";
import { Input } from "@components/ui/input";
import clsx from "clsx";
import { useState } from "react";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const { selectedSong, selectSong } = useAppContext();
    const { isEnableLyricsModal, openLyricsModal, isLyricsModalOpen } =
        useOpenContext();
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [selectedRow, setSelectedRow] = useState<string | null>(null);

    const handleClick = (row: Row<TData>) => {
        const data = row.getAllCells()[0].getContext().cell.row
            .original as Song;
        selectSong(data);
        if (isEnableLyricsModal && !isLyricsModalOpen) openLyricsModal();
    };

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
        },
    });

    return (
        <div>
            <div className="flex items-center py-4">
                <Input
                    placeholder="Search by title..."
                    value={
                        (table
                            .getColumn("title")
                            ?.getFilterValue() as string) ?? ""
                    }
                    onChange={(event) =>
                        table
                            .getColumn("title")
                            ?.setFilterValue(event.target.value)
                    }
                    className="z-10 max-w-sm border-transparent bg-gray-60060 text-white"
                />
            </div>
            <Table className="mb-24 md:mb-0">
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow
                            key={headerGroup.id}
                            className="hover:bg-transparent"
                        >
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext()
                                              )}
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => {
                            const data = row.original as Song;
                            return (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                    className="border-0 hover:bg-gray-hl/50"
                                    onMouseEnter={() => {
                                        setSelectedRow(row.id);
                                    }}
                                    onMouseLeave={() => {
                                        setSelectedRow(null);
                                    }}
                                    onClick={() => handleClick(row)}
                                >
                                    {row.getVisibleCells().map((cell, idx) => {
                                        const id = cell.id.split("_")[1];
                                        let className = "";
                                        if (id === "order") {
                                            className = clsx(
                                                "w-1",
                                                data.id === selectedSong?.id
                                                    ? "text-green"
                                                    : "text-gray-text"
                                            );
                                        } else if (id === "title") {
                                            className = clsx(
                                                data.id === selectedSong?.id
                                                    ? "text-green"
                                                    : "text-white"
                                            );
                                        }
                                        if (idx === 1)
                                            return (
                                                <TableCell
                                                    key={cell.id}
                                                    className={clsx(
                                                        className,
                                                        "w-1/3 pt-10"
                                                    )}
                                                >
                                                    {flexRender(
                                                        cell.column.columnDef
                                                            .cell,
                                                        cell.getContext()
                                                    )}
                                                </TableCell>
                                            );

                                        return (
                                            <TableCell
                                                key={cell.id}
                                                className={className}
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })
                    ) : (
                        <TableRow className="hover:bg-transparent">
                            <TableCell
                                colSpan={columns.length}
                                className="h-24 text-center text-gray-text"
                            >
                                No results
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
