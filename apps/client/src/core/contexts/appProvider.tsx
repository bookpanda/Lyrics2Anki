import { FC, PropsWithChildren, useState } from "react";

import { fetchGeniusLyrics, fetchGeniusSearch } from "../apis/geniusApi";
import { fetchRapidLyrics, fetchRapidSearch } from "../apis/rapidApi";
import {
  addFurigana,
  cleanLyrics,
  fetchTokenizedWords,
} from "../apis/tokenizer";
import { AppContext, lyricsType, songsType, tokenTypes } from "./appContext";

export const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  const [searchTrack, setSearchTrack] = useState("");
  const [searchArtist, setSearchArtist] = useState("");
  const [songs, setSongs] = useState<songsType>(null);
  const [lyrics, setLyrics] = useState<lyricsType>(null);
  const [tokens, setTokens] = useState<tokenTypes>(null);

  const getSongs = async () => {
    const dataGenius = await fetchGeniusSearch(searchTrack, searchArtist);
    const dataRapid = await fetchRapidSearch(searchTrack, searchArtist);
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

  const getLyrics = async (url: string, src: string) => {
    if (src === "genius") {
      const data = await fetchGeniusLyrics(url);
      const lyrics = data?.split(/\r?\n/);
      setLyrics({ lyrics: lyrics ?? [], url });
    } else if (src === "rapid") {
      let data = await fetchRapidLyrics(url);
      if (!data) data = { lyrics: { lines: [{ words: "No lyrics" }] } };
      if (data.lyrics) {
        const lyrics = data?.lyrics.lines.map((a) => a.words);
        setLyrics({
          lyrics: lyrics,
          url,
        });
      } else {
        setLyrics({
          lyrics: ["No lyrics"],
          url,
        });
      }
    }
  };

  const getAnkiCards = async () => {
    const cleanedLyrics = await cleanLyrics(lyrics?.lyrics ?? []);
    const tokens: string[] = await fetchTokenizedWords(cleanedLyrics);
    console.log(tokens);
    await addFurigana(tokens);
  };

  return (
    <AppContext.Provider
      value={{
        searchArtist,
        setSearchTrack,
        searchTrack,
        setSearchArtist,
        songs,
        getSongs,
        lyrics,
        getLyrics,
        tokens,
        getAnkiCards,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
