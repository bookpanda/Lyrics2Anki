import { FC, PropsWithChildren, useState } from "react";

import { fetchAnkiCards } from "../apis/ankiApi";
// import { fetchGeniusLyrics, fetchGeniusSearch } from "../apis/geniusApi";
import { fetchRapidLyrics, fetchRapidSearch } from "../apis/rapidApi";
import {
  addFurigana,
  cleanLyrics,
  fetchTokenizedWords,
} from "../apis/tokenizer";
import { fetchTranslation } from "../apis/translateApi";
import {
  AppContext,
  VocabType,
  selectedSongType,
  songsType,
} from "./appContext";

export const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  const [searchTrack, setSearchTrack] = useState("");
  const [searchArtist, setSearchArtist] = useState("");
  const [songs, setSongs] = useState<songsType>(null);
  const [selectedSong, setSelectedSong] = useState<selectedSongType>(null);
  const [vocab, setVocab] = useState<VocabType>(null);

  const getSongs = async () => {
    // setSelectedSong(null);
    // setVocab(null);
    // const dataGenius = await fetchGeniusSearch(searchTrack, searchArtist);
    const dataRapid = await fetchRapidSearch(searchTrack, searchArtist);
    const newSongs: songsType = [];
    // if (dataGenius) {
    //   dataGenius.map((s) => {
    //     newSongs?.push({
    //       albumArt: s.albumArt,
    //       title: s.title,
    //       url: s.url,
    //       src: "genius",
    //     });
    //   });
    // }
    if (dataRapid) {
      dataRapid.tracks.items.map((s) => {
        const artists = s.data.artists.items.map((a) => a.profile.name);
        let seconds = Math.floor(s.data.duration.totalMilliseconds / 1000);
        const minutes = Math.floor(seconds / 60);
        seconds -= minutes * 60;
        newSongs?.push({
          artists,
          albumArt: s.data.albumOfTrack.coverArt.sources[0].url,
          album: s.data.albumOfTrack.name,
          title: s.data.name,
          url: s.data.id,
          duration: { minutes, seconds },
          src: "rapid",
        });
      });
    }
    setSongs(() => newSongs);
  };

  const selectSong = async (title: string, url: string, src: string) => {
    if (src === "genius") {
      // const data = await fetchGeniusLyrics(url);
      // const lyrics = data?.split(/\r?\n/);
      // setSelectedSong({ title, lyrics: lyrics ?? [], url });
    } else if (src === "rapid") {
      let data = await fetchRapidLyrics(url);
      if (!data) data = { lyrics: { lines: [{ words: "No lyrics" }] } };
      if (data.lyrics) {
        const lyrics = data?.lyrics.lines.map((a) => a.words);
        setSelectedSong({
          title,
          lyrics: lyrics,
          url,
        });
      } else {
        setSelectedSong({
          title,
          lyrics: ["No lyrics"],
          url,
        });
      }
    }
  };

  const getAnkiCards = async () => {
    const cleanedLyrics = await cleanLyrics(selectedSong?.lyrics ?? []);
    const tokens: string[] = await fetchTokenizedWords(cleanedLyrics);
    if (tokens.length === 0) {
      // some warning
      return;
    }
    console.log(`tokens:`);
    console.log(tokens);

    const fg = await addFurigana(tokens);
    console.log(`fg: `);
    console.log(fg);

    const meaning = await fetchTranslation(tokens);
    console.log(`meaning: `);
    console.log(meaning);

    setVocab(() =>
      tokens.map((token, idx) => {
        return { token, furigana: fg[idx], translation: meaning[idx] };
      })
    );

    await fetchAnkiCards(selectedSong?.title ?? "No name", vocab);
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
        selectedSong,
        selectSong,
        getAnkiCards,
        vocab,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
