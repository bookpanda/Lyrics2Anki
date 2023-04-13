import { FC, PropsWithChildren, useCallback, useEffect, useState } from "react";

import { fetchAnkiCards } from "../apis/ankiApi";
// import { fetchGeniusLyrics, fetchGeniusSearch } from "../apis/geniusApi";
import { fetchRapidLyrics, fetchSpotifySearch } from "../apis/spotifyApi";
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

  const getSongs = useCallback(async () => {
    // setSelectedSong(null);
    // setVocab(null);
    const newSongs: songsType = [];
    // const geniusSearch = await fetchGeniusSearch(searchTrack, searchArtist);
    // if (geniusSearch) {
    //   geniusSearch.map((s) => {
    //     newSongs?.push({
    //       albumArt: s.albumArt,
    //       title: s.title,
    //       url: s.url,
    //       src: "genius",
    //     });
    //   });
    // }
    const spotifySearch = await fetchSpotifySearch(searchTrack, searchArtist);
    if (spotifySearch) {
      const items = spotifySearch.tracks.items;
      items.map((i) => {
        const artists = i.artists.map((a) => a.name).join(", ");
        console.log(artists);

        let seconds = Math.floor(i.duration_ms / 1000);
        const minutes = Math.floor(seconds / 60);
        seconds -= minutes * 60;
        newSongs?.push({
          artists,
          albumArt: i.album.images[0].url,
          album: i.album.name,
          title: i.name,
          id: i.id,
          duration: { minutes, seconds },
          src: "spotify",
        });
      });
    }
    setSongs(() => newSongs);
  }, [searchArtist, searchTrack]);

  useEffect(() => {
    getSongs();
  }, [searchArtist, searchTrack, getSongs]);

  const selectSong = async (title: string, url: string, src: string) => {
    if (src === "genius") {
      // const data = await fetchGeniusLyrics(url);
      // const lyrics = data?.split(/\r?\n/);
      // setSelectedSong({ title, lyrics: lyrics ?? [], url });
    } else if (src === "spotify") {
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
