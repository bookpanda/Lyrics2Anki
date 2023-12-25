import { Alert, TextField, Typography, useMediaQuery } from "@mui/material";
import clsx from "clsx";
import { FC } from "react";
import { useAppContext } from "src/contexts";
import { theme } from "src/theme";

export const SearchBar: FC = () => {
    const {
        alert,
        getAnkiCards,
        setSearchTrack,
        searchTrack,
        searchArtist,
        setSearchArtist,
    } = useAppContext();
    const breakMD = useMediaQuery(theme.breakpoints.up("md"));
    return (
        <div className="w-full">
            <div
                className={clsx(
                    "flex w-full",
                    breakMD
                        ? "flex-row space-x-8"
                        : "flex-col items-center space-y-4"
                )}
            >
                <TextField
                    sx={{ width: breakMD ? "30%" : "100%" }}
                    placeholder="Track Name"
                    onChange={(e) => setSearchTrack(e.target.value)}
                    value={searchTrack}
                />
                <TextField
                    sx={{ width: breakMD ? "30%" : "100%" }}
                    placeholder="Artist Name"
                    onChange={(e) => setSearchArtist(e.target.value)}
                    value={searchArtist}
                />
            </div>
            <div className="mt-4 flex items-center space-x-4">
                <button
                    className="rounded-md bg-secondary.dark p-2 px-4 font-[Gotham] font-semibold transition hover:bg-[#0fa243]"
                    onClick={() => getAnkiCards()}
                >
                    Get AnkiCards
                </button>
                {alert && <Alert severity="error">{alert}</Alert>}
            </div>
            <Typography
                variant="subtitle2"
                color="secondary.light"
                fontWeight={300}
                marginTop={2}
            >
                Anki Cards can only be properly generated on Desktop
            </Typography>
        </div>
    );
};
