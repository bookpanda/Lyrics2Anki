import { FC, PropsWithChildren, useEffect, useState } from "react";

import { fetchGeniusSearch, fetchGeniusSong } from "../apis/geniusApi";
import { fetchRapidSearch } from "../apis/rapidApi";
import { AppContext, songsType } from "./appContext";

export const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  const [searchTrack, setSearchTrack] = useState("");
  const [searchArtist, setSearchArtist] = useState("");
  const [songs, setSongs] = useState<songsType>(null);

  const getSongs = async () => {
    // const data = await fetchGeniusSong(searchTrack, searchArtist);
    const dataGenius = await fetchGeniusSearch(searchTrack, searchArtist);
    const dataRapid = await fetchRapidSearch(searchTrack, searchArtist);

    console.log(dataGenius);
    console.log(dataRapid);

    const newSongs: songsType = [];
    if (dataGenius) {
      dataGenius.map((s) => {
        newSongs?.push({
          albumArt: s.albumArt,
          title: s.title,
          url: s.url,
          src: "genius",
        });
      });
    }
    if (dataRapid) {
      dataRapid.tracks.items.map((s) => {
        newSongs?.push({
          albumArt: s.data.albumOfTrack.coverArt.sources[0].url,
          title: s.data.name,
          url: s.data.id,
          src: "rapid",
        });
      });
    }
    setSongs(() => newSongs);
  };

  return (
    <AppContext.Provider
      value={{
        getSongs,
        searchArtist,
        setSearchTrack,
        searchTrack,
        setSearchArtist,
        songs,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
