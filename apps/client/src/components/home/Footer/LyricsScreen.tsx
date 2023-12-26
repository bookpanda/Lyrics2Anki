"use client";

import { nullColor } from "@/constants/nullColor";
import { useAppContext } from "@/contexts";
import { Text } from "@components/custom";
import { DrawerClose, DrawerContent } from "@components/ui/drawer";
import { ScrollArea } from "@components/ui/scroll-area";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";

export const LyricsScreen = () => {
    const { selectedSong } = useAppContext();

    const c = selectedSong;

    return (
        <DrawerContent
            style={{
                backgroundColor: c ? c.color.bg : nullColor,
            }}
        >
            {c && (
                <div className="w-screen h-screen p-4 z-10">
                    <DrawerClose asChild className="absolute">
                        <ChevronDown
                            className="bg-gray-60060 rounded-full
                                        p-1 hover:cursor-pointer w-8 h-8 text-white"
                        />
                    </DrawerClose>
                    <div className="flex-col items-center text-center">
                        <Text variant="p1" className="text-white">
                            <b>{c.title}</b>
                        </Text>
                        <Text variant="p2" className="text-white">
                            {c.artists}
                        </Text>
                    </div>

                    <ScrollArea className="h-[90%] mt-4 flex-col justify-between rounded-lg p-4">
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
                    </ScrollArea>
                </div>
            )}
        </DrawerContent>
    );
};
