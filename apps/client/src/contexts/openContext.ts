import { createContext, Dispatch, SetStateAction, useContext } from "react";

export interface OpenContextProps {
    isLyricsPanelOpen: boolean;
    openLyricsPanel: () => void;
    closeLyricsPanel: () => void;
    isEnableLyricsPanel: boolean;
    setIsEnableLyricsPanel: Dispatch<SetStateAction<boolean>>;
    isLyricsScreenOpen: boolean;
    openLyricsScreen: () => void;
}

export const OpenContext = createContext<OpenContextProps>({
    isLyricsPanelOpen: false,
    openLyricsPanel: () => {},
    closeLyricsPanel: () => {},
    isEnableLyricsPanel: true,
    setIsEnableLyricsPanel: () => {},
    isLyricsScreenOpen: false,
    openLyricsScreen: () => {},
});

export const useOpenContext = () => useContext(OpenContext);
