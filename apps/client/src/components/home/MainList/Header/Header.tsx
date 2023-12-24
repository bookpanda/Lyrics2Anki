"use client";

import { nullColor } from "@/constants/nullColor";
import { useAppContext } from "@/contexts";
import { AppIcon, Text } from "@components/custom";
import { Skeleton } from "@components/ui/skeleton";

export const Header = () => {
    const { selectedSong } = useAppContext();
    const c = selectedSong;

    return (
        <div className="w-full">
            <div
                className="flex flex-col justify-between px-6 pb-5 pt-4"
                style={{
                    backgroundImage: `linear-gradient(to top right, ${
                        c ? c.color : nullColor
                    }40, ${c ? c.color : nullColor})`,
                }}
            >
                <div className="flex items-center space-x-8">
                    {c ? (
                        <AppIcon className="drop-shadow-xl" width={180} />
                    ) : (
                        <Skeleton className="h-[180px] w-[180px]" />
                    )}

                    <div className="z-10">
                        {c ? (
                            <Text
                                variant="h1"
                                className="text-white drop-shadow-2xl"
                            >
                                {c.title}
                            </Text>
                        ) : (
                            <Skeleton className="h-16 w-64" />
                        )}
                        <Text
                            variant="p1"
                            className="ml-1 mt-1 text-white drop-shadow-2xl"
                        >
                            Lyrics2Anki
                        </Text>
                    </div>
                </div>
            </div>
        </div>
    );
};
