"use client";

import { FC, PropsWithChildren, useCallback, useEffect, useState } from "react";

import { fetchLyrics } from "src/contexts/fetchLyrics";
import { fetchSongs } from "src/contexts/fetchSongs";
import { SelectedSong, Songs, Vocab } from "src/types/types";
import {
    addFurigana,
    cleanLyrics,
    fetchTokenizedWords,
} from "../apis/tokenizer";
import { fetchTranslation } from "../apis/translateApi";
import { alert, AppContext } from "./appContext";
import { fetchAnkiCards } from "./fetchAnkiCards";

export const AppProvider: FC<PropsWithChildren> = ({ children }) => {
    const [searchTrack, setSearchTrack] = useState("");
    const [searchArtist, setSearchArtist] = useState("");
    const [songs, setSongs] = useState<Songs>([]);
    const [selectedSong, setSelectedSong] = useState<SelectedSong>(null);
    const [vocab, setVocab] = useState<Vocab>([]);
    const [alert, setAlert] = useState<alert>(null);

    const getSongs = useCallback(async () => {
        setAlert(null);
        const newSongs: Songs = await fetchSongs(searchTrack, searchArtist);
        setSongs(() => newSongs);
    }, [searchArtist, searchTrack]);

    useEffect(() => {
        getSongs();
    }, [searchArtist, searchTrack, getSongs]);

    const selectSong = async (title: string, trackId: string) => {
        setAlert(null);
        const lyrics = await fetchLyrics(trackId);
        setSelectedSong({
            title,
            lyrics,
            url: trackId,
        });
    };

    const getAnkiCards = async () => {
        if (!selectedSong) {
            setAlert("Please select a song first");
            return;
        }
        const cleanedLyrics = cleanLyrics(selectedSong.lyrics);
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

        await fetchAnkiCards(selectedSong.title ?? "No name", vocab);
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
