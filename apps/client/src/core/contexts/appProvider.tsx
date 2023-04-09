import { FC, PropsWithChildren, useEffect, useState } from "react";

import { fetchSearch, fetchSong } from "../apis/geniusApi";
import { AppContext } from "./appContext";

export const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  const [searchTrack, setSearchTrack] = useState("");
  const [searchArtist, setSearchArtist] = useState("");

  useEffect(() => {
    const getSong = async () => {
      // const data = await fetchSong(searchTrack, searchArtist);
      const data = await fetchSearch(searchTrack, searchArtist);
      console.log(data);
    };
    getSong();
  }, [searchArtist, searchTrack]);

  return (
    <AppContext.Provider
      value={{ searchArtist, setSearchTrack, searchTrack, setSearchArtist }}
    >
      {children}
    </AppContext.Provider>
  );
};
