"use client";

import { Text } from "@/components/custom";
import { nullColor } from "@/constants/nullColor";
import { useAppContext, useOpenContext } from "@/contexts";
import clsx from "clsx";
import { FooterImage } from "./FooterImage";

export const Footer = () => {
    const { selectedSong } = useAppContext();
    const { openEditModal } = useOpenContext();

    return (
        <>
            <div className="absolute bottom-0 left-0 z-10 hidden w-full items-center space-x-4 bg-gray-800 p-4 xl:flex">
                {selectedSong && <FooterImage song={selectedSong} />}
                <div className="py-2">
                    <Text variant="p1" className="text-white">
                        {selectedSong?.title}
                    </Text>
                    <Text variant="p3" className="text-gray-text">
                        {selectedSong?.artists}
                    </Text>
                </div>
            </div>
            {selectedSong && (
                <div
                    className="absolute bottom-[10%] left-0 z-10 flex w-full items-center space-x-4 rounded-lg p-2 xl:hidden"
                    style={{
                        backgroundColor:
                            selectedSong.color.bg !== ""
                                ? selectedSong.color.bg
                                : nullColor,
                    }}
                    onClick={openEditModal}
                >
                    {selectedSong && <FooterImage song={selectedSong} />}
                    <div className="py-2">
                        <Text
                            variant="p1"
                            className={clsx(
                                selectedSong.color.isDark
                                    ? "text-white"
                                    : "text-black"
                            )}
                        >
                            {selectedSong?.title}
                        </Text>
                        <Text
                            variant="p3"
                            className={clsx(
                                selectedSong.color.isDark
                                    ? "text-gray-textlight"
                                    : "text-gray-600"
                            )}
                        >
                            {selectedSong?.artists}
                        </Text>
                    </div>
                </div>
            )}
        </>
    );
};
