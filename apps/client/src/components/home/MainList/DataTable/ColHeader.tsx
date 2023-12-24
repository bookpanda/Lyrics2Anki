import { Song } from "@/types/types";
import { Column } from "@tanstack/react-table";
import clsx from "clsx";
import { ArrowDown, ArrowUp } from "lucide-react";
import { FC, PropsWithChildren } from "react";

interface ColHeaderProps extends PropsWithChildren {
    column: Column<Song, unknown>;
    className?: string;
}

export const ColHeader: FC<ColHeaderProps> = ({
    children,
    column,
    className,
}) => {
    return (
        <div
            className={clsx(
                "flex items-center hover:cursor-pointer",
                className
            )}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
            {children}
            {column.getIsSorted() === "asc" && (
                <ArrowUp className="h-4 w-4 text-gray-text" />
            )}
            {column.getIsSorted() === "desc" && (
                <ArrowDown className="h-4 w-4 text-gray-text" />
            )}
        </div>
    );
};
