import { Slide, useMediaQuery } from "@mui/material";
import clsx from "clsx";
import { FC } from "react";
import { useAppContext } from "src/contexts";
import { theme } from "src/theme";

export const SpotifyEmbed: FC = () => {
    const { selectedSong } = useAppContext();
    const breakSM = useMediaQuery(theme.breakpoints.up("sm"));
    const breakMD = useMediaQuery(theme.breakpoints.up("md"));
    return (
        <div
            className={clsx(
                "flex h-full items-center",
                breakMD ? "w-1/2" : breakSM ? "w-2/3" : "w-full"
            )}
        >
            <Slide direction="left" in={Boolean(selectedSong)}>
                <iframe
                    title="spotify-embed"
                    src={`https://open.spotify.com/embed/track/${selectedSong?.url}?utm_source=generator`}
                    width="100%"
                    height="152"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                />
            </Slide>
        </div>
    );
};
