"use client";

import { Text } from "@/components/custom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useAppContext } from "@/contexts";
import { useOpenContext } from "@/contexts/openContext";
import Image from "next/image";

export const EditModal = () => {
    const { selectedSong } = useAppContext();

    const c = selectedSong;
    const { isEditModalOpen, closeEditModal } = useOpenContext();

    return (
        <Dialog open={isEditModalOpen}>
            {c && (
                <DialogContent
                    onInteractOutside={closeEditModal}
                    className="rounded-xl bg-gray-400"
                >
                    <div className="mb-4 hidden space-x-3 xl:flex">
                        <Image
                            src={selectedSong.albumArt}
                            width={200}
                            height={200}
                            style={{ objectFit: "cover" }}
                            alt={c.album}
                            className="rounded-lg"
                            unoptimized
                        />
                        <div className="text-white">
                            <Text
                                variant="h5"
                                className="text-white drop-shadow-2xl"
                            >
                                {c.title}
                            </Text>
                            <Text
                                variant="p2"
                                className="mb-4 mt-1 text-gray-text drop-shadow-2xl"
                            >
                                {c.artists}
                            </Text>
                        </div>
                    </div>

                    {/* mobile */}
                    <div className="mb-4 flex flex-col items-center space-y-3 xl:hidden">
                        <Image
                            src={selectedSong.albumArt}
                            width={200}
                            height={200}
                            style={{ objectFit: "cover", width: "80%" }}
                            alt={c.album}
                            className="rounded-lg"
                            unoptimized
                        />
                        <div className="flex w-[80%] items-center space-x-10 text-white">
                            <div>
                                <Text
                                    variant="h5"
                                    className="text-white drop-shadow-2xl"
                                >
                                    {c.title}
                                </Text>
                                <Text
                                    variant="p2"
                                    className="mb-4 mt-1 text-gray-text drop-shadow-2xl"
                                >
                                    {c.artists}
                                </Text>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            )}
        </Dialog>
    );
};
