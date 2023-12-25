import { Text } from "@components/custom";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { useMediaQuery } from "@mui/material";
import { FC } from "react";
import { useAppContext } from "src/contexts";
import { theme } from "src/theme";
import { SpotifyEmbed } from "../SpotifyEmbed/SpotifyEmbed";

export const SearchBar: FC = () => {
    const {
        alert,
        getAnkiCards,
        setSearchTrack,
        searchTrack,
        searchArtist,
        setSearchArtist,
        selectedSong,
    } = useAppContext();
    const breakMD = useMediaQuery(theme.breakpoints.up("md"));
    return (
        <div className="flex mt-6 px-4">
            <div className="flex-col w-1/2 space-y-4 z-10">
                <Text variant="p1" className="text-gray-text">
                    Search for a song and artist
                </Text>
                <Input
                    placeholder="Track name..."
                    value={searchTrack}
                    onChange={(e) => setSearchTrack(e.target.value)}
                    className="max-w-sm border-transparent bg-gray-60060 text-white"
                />
                <Input
                    placeholder="Artist..."
                    value={searchArtist}
                    onChange={(e) => setSearchArtist(e.target.value)}
                    className="max-w-sm border-transparent bg-gray-60060 text-white"
                />
                <Button
                    className="z-10 text-black"
                    variant="green"
                    onClick={() => getAnkiCards()}
                >
                    Get AnkiCards
                </Button>
            </div>
            {selectedSong && <SpotifyEmbed />}
        </div>
    );
};
