import { Songs } from "src/types/types";
import { fetchSpotifySearch } from "../apis/spotifyApi";

export const fetchSongs = async (
    track: string,
    artist: string
): Promise<Songs> => {
    const spotifySearch = await fetchSpotifySearch(track, artist);
    if (!spotifySearch) return [];

    const songs: Songs = [];

    const items = spotifySearch.tracks.items;
    items.map((i) => {
        const artists = i.artists.map((a) => a.name).join(", ");
        let seconds = Math.floor(i.duration_ms / 1000);
        const minutes = Math.floor(seconds / 60);
        seconds -= minutes * 60;
        songs.push({
            artists,
            albumArt: i.album.images[0].url,
            album: i.album.name,
            title: i.name,
            id: i.id,
            duration: { minutes, seconds },
        });
    });

    return songs;
};
