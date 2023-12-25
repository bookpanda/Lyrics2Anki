"use client";

import { PropsWithChildren, useState } from "react";
import { OpenContext } from "./openContext";

export const OpenContextProvider = ({ children }: PropsWithChildren) => {
    const [isLyricsModalOpen, setIsLyricsModalOpen] = useState(false);
    const [isEnableLyricsModal, setIsEnableLyricsModal] = useState(true);

    const openLyricsModal = () => {
        setIsLyricsModalOpen(true);
        setIsEnableLyricsModal(true);
    };
    const closeLyricsModal = () => {
        setIsLyricsModalOpen(false);
        setIsEnableLyricsModal(false);
    };

    return (
        <OpenContext.Provider
            value={{
                isLyricsModalOpen,
                openLyricsModal,
                closeLyricsModal,
                isEnableLyricsModal,
                setIsEnableLyricsModal,
            }}
        >
            {children}
        </OpenContext.Provider>
    );
};
