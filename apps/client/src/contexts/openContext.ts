import { createContext, Dispatch, SetStateAction, useContext } from "react";

export interface OpenContextProps {
    isLyricsPanelOpen: boolean;
    openLyricsPanel: () => void;
    closeLyricsPanel: () => void;
    isEnableLyricsPanel: boolean;
    setIsEnableLyricsPanel: Dispatch<SetStateAction<boolean>>;
}

export const OpenContext = createContext<OpenContextProps>({
    isLyricsPanelOpen: false,
    openLyricsPanel: () => {},
    closeLyricsPanel: () => {},
    isEnableLyricsPanel: true,
    setIsEnableLyricsPanel: () => {},
});

export const useOpenContext = () => useContext(OpenContext);
