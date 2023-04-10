import { createContext, useContext } from "react";

export type songsType =
  | {
      albumArt: string;
      title: string;
      url: string;
      src: "genius" | "rapid";
    }[]
  | null;

interface IAppContext {
  getSongs: () => void;
  searchTrack: string;
  setSearchTrack: (s: string) => void;
  searchArtist: string;
  setSearchArtist: (s: string) => void;
  songs: songsType;
}

export const AppContext = createContext<IAppContext>({
  getSongs: () => null,
  searchArtist: "",
  setSearchTrack: () => null,
  searchTrack: "",
  setSearchArtist: () => null,
  songs: null,
});

export const useAppContext = () => {
  return useContext(AppContext);
};
