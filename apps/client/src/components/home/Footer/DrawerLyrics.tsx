"use client";

import { useAppContext } from "@/contexts";
import { DrawerClose, DrawerContent } from "@components/ui/drawer";
import { ChevronDown } from "lucide-react";

export const DrawerLyrics = () => {
    const { selectedSong } = useAppContext();

    return (
        <DrawerContent>
            <div className="w-screen h-screen p-4 bg-black">
                <DrawerClose asChild>
                    <ChevronDown className="hover:cursor-pointer w-8 h-8 text-white" />
                </DrawerClose>
                {/* <DrawerHeader>
                    <DrawerTitle>Move Goal</DrawerTitle>
                    <DrawerDescription>
                        Set your daily activity goal.
                    </DrawerDescription>
                </DrawerHeader>

                <DrawerFooter>
                    <Button>Submit</Button>
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter> */}
            </div>
        </DrawerContent>
    );
};
