import { createContext, useContext } from "react";

export type songsType =
  | {
      albumArt: string;
      title: string;
      url: string;
      src: "genius" | "rapid";
    }[]
  | null;

export type lyricsType = { lyrics: string[]; url: string } | null;

export type selectedSongType = {
  title: string;
  lyrics: string[];
  url: string;
} | null;

export type VocabType =
  | { token: string; furigana: string; translation: string }[]
  | null;

interface IAppContext {
  searchTrack: string;
  setSearchTrack: (s: string) => void;
  searchArtist: string;
  setSearchArtist: (s: string) => void;
  songs: songsType;
  getSongs: () => void;
  selectedSong: selectedSongType;
  selectSong: (title: string, url: string, src: string) => void;
  getAnkiCards: () => void;
  vocab: VocabType;
}

export const AppContext = createContext<IAppContext>({
  searchArtist: "",
  setSearchTrack: () => null,
  searchTrack: "",
  setSearchArtist: () => null,
  songs: null,
  getSongs: () => null,
  selectedSong: null,
  selectSong: () => null,
  getAnkiCards: () => null,
  vocab: null,
});

export const useAppContext = () => {
  return useContext(AppContext);
};
