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

interface IAppContext {
  searchTrack: string;
  setSearchTrack: (s: string) => void;
  searchArtist: string;
  setSearchArtist: (s: string) => void;
  songs: songsType;
  getSongs: () => void;
  lyrics: lyricsType;
  getLyrics: (url: string, src: string) => void;
}

export const AppContext = createContext<IAppContext>({
  searchArtist: "",
  setSearchTrack: () => null,
  searchTrack: "",
  setSearchArtist: () => null,
  songs: null,
  getSongs: () => null,
  lyrics: null,
  getLyrics: () => null,
});

export const useAppContext = () => {
  return useContext(AppContext);
};
