import { Typography, useMediaQuery } from "@mui/material";
import clsx from "clsx";
import { FC } from "react";
import { useAppContext } from "src/contexts";
import { theme } from "src/theme";
import { SpotifyEmbed } from "../SpotifyEmbed";

export const Header: FC = () => {
    const { selectedSong } = useAppContext();
    const breakLG = useMediaQuery(theme.breakpoints.up("lg"));
    return breakLG ? (
        <div
            className={clsx(
                "rgb-bg flex h-[200px] w-full items-center justify-around bg-primary.main"
            )}
        >
            <Typography variant="h2" fontWeight={700} color="secondary.main">
                Lyrics2Anki
            </Typography>

            <SpotifyEmbed />
        </div>
    ) : (
        <div
            className={clsx(
                "rgb-bg flex h-[200px] w-full items-center justify-around bg-primary.main"
            )}
        >
            {selectedSong ? (
                <SpotifyEmbed />
            ) : (
                <Typography
                    variant="h2"
                    fontWeight={700}
                    color="secondary.main"
                >
                    Lyrics2Anki
                </Typography>
            )}
        </div>
    );
};
