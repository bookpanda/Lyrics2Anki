import { createContext, Dispatch, SetStateAction, useContext } from "react";

export interface OpenContextProps {
    isEditModalOpen: boolean;
    openEditModal: () => void;
    closeEditModal: () => void;
    isProblemModalOpen: boolean;
    openProblemModal: () => void;
    closeProblemModal: () => void;
    isEnableProblemModal: boolean;
    setIsEnableProblemModal: Dispatch<SetStateAction<boolean>>;
}

export const OpenContext = createContext<OpenContextProps>({
    isEditModalOpen: false,
    openEditModal: () => {},
    closeEditModal: () => {},
    isProblemModalOpen: false,
    openProblemModal: () => {},
    closeProblemModal: () => {},
    isEnableProblemModal: true,
    setIsEnableProblemModal: () => {},
});

export const useOpenContext = () => useContext(OpenContext);
