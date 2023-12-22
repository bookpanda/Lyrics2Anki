import { createContext, useContext } from "react";

export type songs =
	| {
			artists: string;
			album: string;
			albumArt: string;
			title: string;
			id: string;
			duration: { minutes: number; seconds: number };
			src: "genius" | "spotify";
	  }[]
	| null;

export type lyrics = { lyrics: string[]; url: string } | null;

export type selectedSongType = {
	title: string;
	lyrics: string[];
	url: string;
} | null;

export type vocab =
	| { token: string; furigana: string; translation: string }[]
	| null;

export type alert = string | null;

interface IAppContext {
	searchTrack: string;
	setSearchTrack: (s: string) => void;
	searchArtist: string;
	setSearchArtist: (s: string) => void;
	songs: songs;
	getSongs: () => void;
	selectedSong: selectedSongType;
	selectSong: (title: string, url: string, src: string) => void;
	getAnkiCards: () => void;
	vocab: vocab;
	alert: alert;
}

export const AppContext = createContext<IAppContext>({
	searchArtist: "",
	setSearchTrack: () => null,
	searchTrack: "",
	setSearchArtist: () => null,
	songs: null,
	getSongs: () => null,
	selectedSong: null,
	selectSong: () => null,
	getAnkiCards: () => null,
	vocab: null,
	alert: null,
});

export const useAppContext = () => {
	return useContext(AppContext);
};
