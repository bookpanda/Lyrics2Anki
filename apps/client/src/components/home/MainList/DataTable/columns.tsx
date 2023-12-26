"use client";

import { Text } from "@/components/custom";
import { Song } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { Clock3 } from "lucide-react";
import Image from "next/image";
import { ColHeader } from "./ColHeader";

export const columns: ColumnDef<Song>[] = [
    {
        accessorKey: "order",
        header: ({ column }) => (
            <ColHeader column={column} className="w-12">
                <p className="mx-3 font-light text-gray-text">#</p>
            </ColHeader>
        ),
        cell: ({ row }) => {
            return (
                <div className="w-1">
                    <Text variant="p1" className="mx-3 font-light">
                        <b>{row.getVisibleCells()[0].id.split("_")[0]}</b>
                    </Text>
                </div>
            );
        },
    },
    {
        accessorKey: "title",
        header: ({ column }) => (
            <ColHeader column={column} className="space-x-3">
                <p className="font-light text-gray-text">Title</p>
            </ColHeader>
        ),
        cell: ({ row }) => {
            return (
                <div className="flex items-center space-x-3">
                    <Image
                        src={row.original.albumArt}
                        width={45}
                        height={45}
                        style={{ objectFit: "cover" }}
                        alt={row.original.album}
                        unoptimized
                    />
                    <div>
                        <Text variant="p2" className="truncate">
                            <b>{row.original.title}</b>
                        </Text>
                        <Text variant="p3" className="text-gray-text">
                            {row.original.artists}
                        </Text>
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "album",
        header: ({ column }) => (
            <ColHeader column={column} className="w-16 space-x-1">
                <p className="font-light text-gray-text">Album</p>
            </ColHeader>
        ),
        cell: ({ row }) => {
            return (
                <Text variant="p1" className="text-gray-text truncate">
                    {row.original.album}
                </Text>
            );
        },
    },
    {
        accessorKey: "duration",
        header: ({ column }) => (
            <ColHeader column={column} className="w-16 space-x-1">
                <p className="font-light text-gray-text">
                    <Clock3 className="h-5 w-5 text-gray-text" />
                </p>
            </ColHeader>
        ),
        cell: ({ row }) => {
            return (
                <Text variant="p1" className="text-gray-text">
                    {row.original.duration.minutes}:
                    {row.original.duration.seconds}
                </Text>
            );
        },
    },
];
