import { createContext, useContext } from "react";

interface IAppContext {
  searchTrack: string;
  setSearchTrack: (s: string) => void;
  searchArtist: string;
  setSearchArtist: (s: string) => void;
}

export const AppContext = createContext<IAppContext>({
  searchArtist: "",
  setSearchTrack: () => null,
  searchTrack: "",
  setSearchArtist: () => null,
});

export const useAppContext = () => {
  return useContext(AppContext);
};
