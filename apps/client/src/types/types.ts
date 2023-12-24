export type Songs = {
    artists: string;
    album: string;
    albumArt: string;
    title: string;
    id: string;
    duration: { minutes: number; seconds: number };
}[];

export type SelectedSong = {
    title: string;
    lyrics: string[];
    url: string;
} | null;

export type Vocab = { token: string; furigana: string; translation: string }[];
