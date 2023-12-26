import { RoundDiv } from "@/components/custom";
import clsx from "clsx";
import Image from "next/image";
import { FC } from "react";

interface AppIconProps {
    src?: string;
    className?: string;
    width?: number;
    height?: number;
}

export const AppIcon: FC<AppIconProps> = ({
    src,
    className,
    width,
    height,
}) => {
    return (
        <RoundDiv className={clsx("p-0", className)}>
            <Image
                src={src ? src : require(`@images/logo.webp`)}
                alt="data-struct"
                width={width ?? 60}
                height={height ?? 60}
                className="rounded-md"
                unoptimized
            />
        </RoundDiv>
    );
};
