"use client";

import { Footer, LyricsPanel, MainList, MobileTabs } from "@components/home";
import { Toaster } from "@components/ui/toaster";

const Home = () => {
    return (
        <>
            <div className="hidden h-screen w-full px-4 pt-8 xl:block">
                <div className="flex h-[90%] space-x-2">
                    <MainList />
                    <LyricsPanel />
                </div>
                <Toaster />
                <Footer />
            </div>
            <MobileTabs />
        </>
    );
};

export default Home;
