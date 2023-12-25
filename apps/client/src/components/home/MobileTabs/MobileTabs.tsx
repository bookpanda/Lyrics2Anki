import { Footer, MainList } from "..";
import { LyricsModal } from "../LyricsModal/LyricsModal";

export const MobileTabs = () => {
    return (
        <>
            <div className="h-[97%]">
                <MainList />
                <LyricsModal />
            </div>

            <Footer />
        </>
    );
};
