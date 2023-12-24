"use client";

import { useAppContext, useOpenContext } from "@/contexts";
import { RoundDiv, Text } from "@components/custom";
import { MoreHorizontal, X } from "lucide-react";
import Image from "next/image";

export const ProblemModal = () => {
    const { isProblemModalOpen, closeProblemModal, openEditModal } =
        useOpenContext();
    const { selectedSong } = useAppContext();
    return (
        isProblemModalOpen &&
        selectedSong && (
            <div className="no-scrollbar hidden h-full w-1/4 overflow-auto rounded-xl bg-gray-600 p-4 xl:block">
                <div className="flex h-8 items-center justify-between">
                    <Text variant="h5" className="text-white">
                        {selectedSong.album}
                    </Text>
                    <X
                        className="h-8 w-8 rounded-full p-1 text-gray-textlight duration-300 hover:scale-110 hover:cursor-pointer hover:bg-gray-hl hover:text-white"
                        onClick={closeProblemModal}
                    />
                </div>
                <RoundDiv className="mt-4">
                    <Image
                        src={selectedSong.albumArt}
                        alt="problem"
                        style={{ width: "100%", height: "100%" }}
                        className="rounded-md"
                        unoptimized
                    />
                </RoundDiv>
                <div className="mt-4 flex justify-between">
                    <div>
                        <Text variant="h3" className="text-white">
                            <b>{selectedSong.title}</b>
                        </Text>
                        <Text variant="p1" className="text-gray-text">
                            {selectedSong.artists}
                        </Text>
                    </div>
                    <div className="flex w-20 items-center justify-center space-x-5">
                        <div className="w-1/2">
                            <MoreHorizontal
                                onClick={openEditModal}
                                className="hover:cursor-pointer' h-[50%] text-white hover:scale-110 hover:cursor-pointer"
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};
