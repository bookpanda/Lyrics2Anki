import { Footer, MainList } from "..";
import { ProblemModal } from "../ProblemModal/ProblemModal";

export const MobileTabs = () => {
    return (
        <>
            <div className="h-[97%]">
                <MainList />
                <ProblemModal />
            </div>

            <Footer />
        </>
    );
};
