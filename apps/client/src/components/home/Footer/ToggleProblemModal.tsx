import { Text } from "@/components/custom";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useOpenContext } from "@/contexts";
import { ChevronDown, ChevronUp } from "lucide-react";

export const ToggleProblemModal = () => {
    const { isProblemModalOpen, openProblemModal, closeProblemModal } =
        useOpenContext();
    return (
        <TooltipProvider delayDuration={50}>
            <Tooltip>
                <TooltipTrigger asChild>
                    {isProblemModalOpen ? (
                        <ChevronDown
                            className="bg-gray-60080 text-gray-textlight absolute right-1 top-1 rounded-full hover:h-[26px] hover:w-[26px] hover:cursor-pointer hover:text-white"
                            onClick={closeProblemModal}
                        />
                    ) : (
                        <ChevronUp
                            className="bg-gray-60080 text-gray-textlight absolute right-1 top-1 rounded-full hover:h-[26px] hover:w-[26px] hover:cursor-pointer hover:text-white"
                            onClick={openProblemModal}
                        />
                    )}
                </TooltipTrigger>
                <TooltipContent side="top" className="border-0 bg-gray-600">
                    <Text variant="p1" className="text-white">
                        {isProblemModalOpen ? "Collapse" : "Expand"}
                    </Text>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};
