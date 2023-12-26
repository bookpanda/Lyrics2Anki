import { createContext, useContext } from "react";
import { SelectedSong, Song, Songs } from "src/types/types";

export type alert = string | null;

interface IAppContext {
    searchTrack: string;
    setSearchTrack: (s: string) => void;
    searchArtist: string;
    setSearchArtist: (s: string) => void;
    songs: Songs;
    getSongs: () => void;
    selectedSong: SelectedSong;
    selectSong: (song: Song) => void;
    getAnkiCards: () => void;
}

export const AppContext = createContext<IAppContext>({
    searchArtist: "",
    setSearchTrack: () => null,
    searchTrack: "",
    setSearchArtist: () => null,
    songs: [],
    getSongs: () => null,
    selectedSong: null,
    selectSong: () => null,
    getAnkiCards: () => null,
});

export const useAppContext = () => {
    return useContext(AppContext);
};
