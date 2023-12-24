"use client";

import { PropsWithChildren, useState } from "react";
import { OpenContext } from "./openContext";

export const OpenContextProvider = ({ children }: PropsWithChildren) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isProblemModalOpen, setIsProblemModalOpen] = useState(false);
    const [isEnableProblemModal, setIsEnableProblemModal] = useState(true);

    const openEditModal = () => {
        setIsEditModalOpen(true);
    };
    const closeEditModal = () => {
        setIsEditModalOpen(false);
    };
    const openProblemModal = () => {
        closeEditModal();
        setIsProblemModalOpen(true);
        setIsEnableProblemModal(true);
    };
    const closeProblemModal = () => {
        setIsProblemModalOpen(false);
        setIsEnableProblemModal(false);
    };

    return (
        <OpenContext.Provider
            value={{
                isEditModalOpen,
                openEditModal,
                closeEditModal,
                isProblemModalOpen,
                openProblemModal,
                closeProblemModal,
                isEnableProblemModal,
                setIsEnableProblemModal,
            }}
        >
            {children}
        </OpenContext.Provider>
    );
};
