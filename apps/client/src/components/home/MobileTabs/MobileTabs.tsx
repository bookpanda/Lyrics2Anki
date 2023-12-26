import { Footer, MainList } from "..";

export const MobileTabs = () => {
    return (
        <>
            <div className="h-full block w-full xl:hidden">
                <MainList />
                {/* <LyricsModalMobile /> */}
            </div>

            <Footer />
        </>
    );
};
