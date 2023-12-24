import { SelectedSong } from "@/types/types";
import Image from "next/image";
import { FC, useState } from "react";
import { ToggleProblemModal } from "./ToggleProblemModal";

interface FooterImageProps {
    song: SelectedSong;
}

export const FooterImage: FC<FooterImageProps> = ({ song }) => {
    const [isVisbible, setIsVisible] = useState(false);

    return (
        <div
            className="relative"
            onMouseEnter={() => {
                setIsVisible(true);
            }}
            onMouseLeave={() => {
                setIsVisible(false);
            }}
        >
            {isVisbible && <ToggleProblemModal />}
            {song && (
                <Image
                    src={song.albumArt}
                    width={60}
                    height={60}
                    style={{ objectFit: "cover" }}
                    className="rounded-md"
                    alt="current_problem"
                    unoptimized
                />
            )}
        </div>
    );
};
