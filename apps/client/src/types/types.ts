export type Song = {
    artists: string;
    album: string;
    albumArt: string;
    title: string;
    id: string;
    duration: { minutes: number; seconds: number };
};

export type Songs = Song[];

export type SelectedSong =
    | (Song & { lyrics: string[]; color: { bg: string; isDark: boolean } })
    | null;

export type Vocab = { token: string; furigana: string; translation: string }[];
