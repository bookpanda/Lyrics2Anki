"use client";

import { nullColor } from "@/constants/nullColor";
import { useAppContext, useOpenContext } from "@/contexts";
import clsx from "clsx";
import { columns } from "./DataTable/columns";
import { DataTable } from "./DataTable/DataTable";
import { Header } from "./Header/Header";

export const MainList = () => {
    const { selectedSong, songs } = useAppContext();
    const { isProblemModalOpen } = useOpenContext();

    const c = selectedSong;
    return (
        <div
            className={clsx(
                "no-scrollbar relative h-full grow overflow-scroll bg-gray-600 xl:rounded-xl",
                !isProblemModalOpen && "w-full"
            )}
        >
            <div
                className="absolute h-2/3 w-full"
                style={{
                    backgroundImage: `linear-gradient(to bottom, ${
                        c ? c.color : nullColor
                    }, ${c ? c.color : nullColor}00)`,
                }}
            />
            <Header />
            <div className="p-4">
                {songs && <DataTable columns={columns} data={songs} />}
            </div>
        </div>
    );
};
