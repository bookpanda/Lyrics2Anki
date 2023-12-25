"use client";

import { useAppContext, useOpenContext } from "@/contexts";
import { RoundDiv, Text } from "@components/custom";
import { X } from "lucide-react";
import Image from "next/image";

export const LyricsModal = () => {
    const { isLyricsModalOpen, closeLyricsModal } = useOpenContext();
    const { selectedSong } = useAppContext();
    return (
        <>
            {isLyricsModalOpen && selectedSong && (
                <div className="no-scrollbar hidden h-full w-1/4 overflow-auto rounded-xl bg-gray-600 p-4 xl:block">
                    <div className="flex h-8 items-center justify-between">
                        <Text variant="h5" className="text-white">
                            {selectedSong.album}
                        </Text>
                        <X
                            className="h-8 w-8 rounded-full p-1 text-gray-textlight duration-300 hover:scale-110 hover:cursor-pointer hover:bg-gray-hl hover:text-white"
                            onClick={closeLyricsModal}
                        />
                    </div>
                    <RoundDiv className="mt-4">
                        <Image
                            src={selectedSong.albumArt}
                            alt="Lyrics"
                            width={200}
                            height={200}
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
                    </div>
                </div>
            )}
        </>
    );
};
