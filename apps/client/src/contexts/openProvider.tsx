"use client";

import { PropsWithChildren, useState } from "react";
import { OpenContext } from "./openContext";

export const OpenContextProvider = ({ children }: PropsWithChildren) => {
    const [isLyricsPanelOpen, setIsLyricsPanelOpen] = useState(false);
    const [isEnableLyricsPanel, setIsEnableLyricsPanel] = useState(true);
    const [isLyricsScreenOpen, setIsLyricsScreenOpen] = useState(false);

    const openLyricsPanel = () => {
        setIsLyricsPanelOpen(true);
        setIsEnableLyricsPanel(true);
    };
    const closeLyricsPanel = () => {
        setIsLyricsPanelOpen(false);
        setIsEnableLyricsPanel(false);
    };
    const openLyricsScreen = () => {
        setIsLyricsScreenOpen(true);
    };
    const closeLyricsScreen = () => {
        setIsLyricsScreenOpen(false);
    };

    return (
        <OpenContext.Provider
            value={{
                isLyricsPanelOpen,
                openLyricsPanel,
                closeLyricsPanel,
                isEnableLyricsPanel,
                setIsEnableLyricsPanel,
                isLyricsScreenOpen,
                openLyricsScreen,
            }}
        >
            {children}
        </OpenContext.Provider>
    );
};
