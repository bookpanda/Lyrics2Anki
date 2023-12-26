import { SelectedSong } from "@/types/types";
import Image from "next/image";
import { FC, useState } from "react";
import { ToggleLyricsPanel } from "./ToggleLyricsPanel";

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
            {isVisbible && <ToggleLyricsPanel />}
            {song && (
                <Image
                    src={song.albumArt}
                    width={60}
                    height={60}
                    style={{ objectFit: "cover" }}
                    className="rounded-md"
                    alt="current_lyrics"
                    unoptimized
                />
            )}
        </div>
    );
};
