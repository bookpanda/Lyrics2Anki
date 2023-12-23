declare module "genius-lyrics-api" {
    export type options = {
        title: string;
        artist: string;
        apiKey: string; // Genius developer access token
        optimizeQuery?: boolean; // Setting this to true will optimize the query for best results
        authHeader?: boolean; // Whether to include auth header in the search request. 'false' by default.
    };
    export type song = {
        id: number; // Genius song id
        title: string; // Song title
        url: string; // Genius webpage URL for the song
        lyrics: string; // Song lyrics
        albumArt: string; // URL of the album art image (jpg/png)
    };
    export type searchResult = {
        id: number; // Genius song id
        url: string; // Genius webpage URL for the song
        title: string; // Song title
        albumArt: string; // URL of the album art image (jpg/png)
    }[];

    export function getLyrics(
        options: options | string
    ): Promise<string> | null;
    export function getSong(options: options): Promise<song> | null;
    export function searchSong(options: options): Promise<searchResult> | null;
}
