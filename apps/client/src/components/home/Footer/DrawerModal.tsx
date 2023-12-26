"use client";

import { nullColor } from "@/constants/nullColor";
import { useAppContext } from "@/contexts";
import { RoundDiv, Text } from "@components/custom";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerTrigger,
} from "@components/ui/drawer";
import clsx from "clsx";
import { ChevronDown, Maximize2 } from "lucide-react";
import Image from "next/image";
import { LyricsScreen } from "./LyricsScreen";

export const DrawerModal = () => {
    const { selectedSong } = useAppContext();

    const c = selectedSong;

    return (
        <DrawerContent className="bg-black">
            <div
                className="absolute h-full w-full"
                style={{
                    backgroundImage: `linear-gradient(to bottom, ${
                        c ? c.color.bg : nullColor
                    }, ${c ? c.color.bg : nullColor}00)`,
                }}
            />
            {c && (
                <div className="w-screen h-screen p-4 z-10">
                    <DrawerClose asChild>
                        <ChevronDown className="hover:cursor-pointer w-8 h-8 text-white" />
                    </DrawerClose>
                    <RoundDiv className="mt-4">
                        <Image
                            src={c.albumArt}
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
                            <Text variant="h4" className="text-white">
                                <b>{c.title}</b>
                            </Text>
                            <Text variant="p1" className="text-gray-text">
                                {c.artists}
                            </Text>
                        </div>
                    </div>

                    <div
                        className="mt-4 flex-col justify-between rounded-lg p-4"
                        style={{
                            backgroundColor: selectedSong.color.bg,
                        }}
                    >
                        <Drawer>
                            <DrawerTrigger asChild>
                                <div className="flex justify-between mb-4">
                                    <Text variant="p1" className="text-white">
                                        Lyrics
                                    </Text>
                                    <div
                                        className="bg-gray-60060 rounded-full
                                        p-1.5"
                                    >
                                        <Maximize2 className="h-4 w-4 text-white" />
                                    </div>
                                </div>
                            </DrawerTrigger>
                            <LyricsScreen />
                        </Drawer>
                        {selectedSong.lyrics.map((lyric, i) => {
                            return (
                                <div key={i}>
                                    <Text
                                        variant="p1"
                                        className={clsx(
                                            selectedSong.color.isDark
                                                ? "text-white"
                                                : "text-black"
                                        )}
                                    >
                                        {lyric}
                                    </Text>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </DrawerContent>
    );
};
