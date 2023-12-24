import { createContext, useContext } from "react";
import { SelectedSong, Songs, Vocab } from "src/types/types";

export type alert = string | null;

interface IAppContext {
    searchTrack: string;
    setSearchTrack: (s: string) => void;
    searchArtist: string;
    setSearchArtist: (s: string) => void;
    songs: Songs;
    getSongs: () => void;
    selectedSong: SelectedSong;
    selectSong: (title: string, url: string) => void;
    getAnkiCards: () => void;
    vocab: Vocab;
    alert: alert;
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
    vocab: [],
    alert: null,
});

export const useAppContext = () => {
    return useContext(AppContext);
};
