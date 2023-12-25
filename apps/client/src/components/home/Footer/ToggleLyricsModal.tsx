import { Text } from "@/components/custom";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useOpenContext } from "@/contexts";
import { ChevronDown, ChevronUp } from "lucide-react";

export const ToggleLyricsModal = () => {
    const { isLyricsModalOpen, openLyricsModal, closeLyricsModal } =
        useOpenContext();
    return (
        <TooltipProvider delayDuration={50}>
            <Tooltip>
                <TooltipTrigger asChild>
                    {isLyricsModalOpen ? (
                        <ChevronDown
                            className="bg-gray-60080 text-gray-textlight absolute right-1 top-1 rounded-full hover:h-[26px] hover:w-[26px] hover:cursor-pointer hover:text-white"
                            onClick={closeLyricsModal}
                        />
                    ) : (
                        <ChevronUp
                            className="bg-gray-60080 text-gray-textlight absolute right-1 top-1 rounded-full hover:h-[26px] hover:w-[26px] hover:cursor-pointer hover:text-white"
                            onClick={openLyricsModal}
                        />
                    )}
                </TooltipTrigger>
                <TooltipContent side="top" className="border-0 bg-gray-600">
                    <Text variant="p1" className="text-white">
                        {isLyricsModalOpen ? "Collapse" : "Expand"}
                    </Text>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};
