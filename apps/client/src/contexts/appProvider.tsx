"use client";

import { FC, PropsWithChildren, useCallback, useEffect, useState } from "react";

import { useToast } from "@components/ui/use-toast";
import { fetchLyrics } from "src/contexts/fetchLyrics";
import { fetchSongs } from "src/contexts/fetchSongs";
import { SearchCache, SelectedSong, Song, Songs } from "src/types/types";
import {
    addFurigana,
    cleanLyrics,
    fetchTokenizedWords,
} from "../apis/tokenizer";
import { fetchTranslation } from "../apis/translateApi";
import { AppContext } from "./appContext";
import { fetchAnkiCards } from "./fetchAnkiCards";
import { getSongColor } from "./getSongColor";

export const AppProvider: FC<PropsWithChildren> = ({ children }) => {
    const [searchTrack, setSearchTrack] = useState("");
    const [searchArtist, setSearchArtist] = useState("");
    const [songs, setSongs] = useState<Songs>([]);
    const [selectedSong, setSelectedSong] = useState<SelectedSong>(null);
    const { toast } = useToast();

    const getSongs = useCallback(async () => {
        const newSongs: Songs = await fetchSongs(searchTrack, searchArtist);
        setSongs(() => newSongs);
    }, [searchArtist, searchTrack]);

    useEffect(() => {
        getSongs();
        if (searchArtist !== "" || searchTrack !== "") {
            const searchCache: SearchCache = {
                artist: searchArtist,
                track: searchTrack,
            };
            localStorage.setItem("searchCache", JSON.stringify(searchCache));
        }
    }, [searchArtist, searchTrack, getSongs]);

    const selectSong = async (song: Song) => {
        const lyrics = await fetchLyrics(song.id);
        const colors = await getSongColor(song.albumArt);
        const newSong: SelectedSong = {
            ...song,
            lyrics,
            color: colors,
        };
        setSelectedSong(newSong);
    };

    useEffect(() => {
        const search: SearchCache = JSON.parse(
            localStorage.getItem("searchCache") ?? "null"
        );
        if (search) {
            setSearchTrack(search.track);
            setSearchArtist(search.artist);
        } else {
            setSearchTrack("夜に駆ける");
            setSearchArtist("YOASOBI");
        }
    }, []);

    const getAnkiCards = async () => {
        if (!selectedSong) {
            toast({
                title: "Error",
                description: "Please select a song first",
            });
            return;
        }
        const cleanedLyrics = cleanLyrics(selectedSong.lyrics);
        const tokens: string[] = await fetchTokenizedWords(cleanedLyrics);
        if (tokens.length === 0) {
            toast({
                title: "Error",
                description: "Song has no Japanese characters",
            });
            return;
        }
        const fg = await addFurigana(tokens);
        const meaning = await fetchTranslation(tokens);

        const vocab = tokens.map((token, idx) => {
            return { token, furigana: fg[idx], translation: meaning[idx] };
        });

        toast({
            title: "Info",
            description: "Making Anki cards...",
        });
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
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
