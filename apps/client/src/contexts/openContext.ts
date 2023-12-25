import { createContext, Dispatch, SetStateAction, useContext } from "react";

export interface OpenContextProps {
    isLyricsModalOpen: boolean;
    openLyricsModal: () => void;
    closeLyricsModal: () => void;
    isEnableLyricsModal: boolean;
    setIsEnableLyricsModal: Dispatch<SetStateAction<boolean>>;
}

export const OpenContext = createContext<OpenContextProps>({
    isLyricsModalOpen: false,
    openLyricsModal: () => {},
    closeLyricsModal: () => {},
    isEnableLyricsModal: true,
    setIsEnableLyricsModal: () => {},
});

export const useOpenContext = () => useContext(OpenContext);
