"use client";

import { FC, PropsWithChildren, useCallback, useEffect, useState } from "react";

import { fetchAnkiCards } from "../apis/ankiApi";
import { fetchRapidLyrics, fetchSpotifySearch } from "../apis/spotifyApi";
import {
    addFurigana,
    cleanLyrics,
    fetchTokenizedWords,
} from "../apis/tokenizer";
import { fetchTranslation } from "../apis/translateApi";
import {
    alert,
    AppContext,
    selectedSongType,
    songs,
    vocab,
} from "./appContext";

export const AppProvider: FC<PropsWithChildren> = ({ children }) => {
    const [searchTrack, setSearchTrack] = useState("");
    const [searchArtist, setSearchArtist] = useState("");
    const [songs, setSongs] = useState<songs>(null);
    const [selectedSong, setSelectedSong] = useState<selectedSongType>(null);
    const [vocab, setVocab] = useState<vocab>(null);
    const [alert, setAlert] = useState<alert>(null);

    const getSongs = useCallback(async () => {
        setAlert(null);
        const newSongs: songs = [];
        const spotifySearch = await fetchSpotifySearch(
            searchTrack,
            searchArtist
        );
        if (spotifySearch) {
            const items = spotifySearch.tracks.items;
            items.map((i) => {
                const artists = i.artists.map((a) => a.name).join(", ");
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
                });
            });
        }
        setSongs(() => newSongs);
    }, [searchArtist, searchTrack]);

    useEffect(() => {
        getSongs();
    }, [searchArtist, searchTrack, getSongs]);

    const selectSong = async (title: string, url: string) => {
        setAlert(null);
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
    };

    const getAnkiCards = async () => {
        if (!selectedSong) {
            setAlert("Please select a song first");
            return;
        }
        const cleanedLyrics = cleanLyrics(selectedSong?.lyrics ?? []);
        const tokens: string[] = await fetchTokenizedWords(cleanedLyrics);
        if (tokens.length === 0) {
            setAlert("Song has no Japanese characters");
            return;
        }
        const fg = await addFurigana(tokens);
        const meaning = await fetchTranslation(tokens);

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
                alert,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
