"use client";

import { PropsWithChildren, useState } from "react";
import { OpenContext } from "./openContext";

export const OpenContextProvider = ({ children }: PropsWithChildren) => {
    const [isLyricsPanelOpen, setIsLyricsPanelOpen] = useState(false);
    const [isEnableLyricsPanel, setIsEnableLyricsPanel] = useState(true);

    const openLyricsPanel = () => {
        setIsLyricsPanelOpen(true);
        setIsEnableLyricsPanel(true);
    };
    const closeLyricsPanel = () => {
        setIsLyricsPanelOpen(false);
        setIsEnableLyricsPanel(false);
    };

    return (
        <OpenContext.Provider
            value={{
                isLyricsPanelOpen,
                openLyricsPanel,
                closeLyricsPanel,
                isEnableLyricsPanel,
                setIsEnableLyricsPanel,
            }}
        >
            {children}
        </OpenContext.Provider>
    );
};
