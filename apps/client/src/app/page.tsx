"use client";

import { Footer, LyricsModal, MainList } from "@components/home";
import { Toaster } from "@components/ui/toaster";
import { useMediaQuery } from "@mui/material";
import { useAppContext } from "src/contexts";
import { theme } from "src/theme";

const Home = () => {
    const { selectedSong, songs } = useAppContext();
    const breakLG = useMediaQuery(theme.breakpoints.up("lg"));
    return (
        <>
            <div className="hidden h-screen w-full px-4 pt-8 xl:block">
                <div className="flex h-[90%] space-x-2">
                    <MainList />
                    <LyricsModal />
                </div>
                <Toaster />
                <Footer />
            </div>
            {/* <MobileTabs /> */}
        </>
    );
};

export default Home;
