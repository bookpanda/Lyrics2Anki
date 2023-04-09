import { getLyrics, getSong, searchSong } from "genius-lyrics-api";

export const fetchSong = async (title: string, artist: string) => {
  if (!title && !artist) return null;
  if (!title) title = "-";
  if (!artist) artist = "-";
  const options = {
    apiKey: process.env.NEXT_PUBLIC_CLIENT_ACCESS_TOKEN ?? "",
    title,
    artist,
    optimizeQuery: true,
    authHeader: true,
  };
  const data = await getSong(options);
  return data;
};

export const fetchLyrics = async (url: string) => {
  const data = await getLyrics(url);
  return data;
};

export const fetchSearch = async (title: string, artist: string) => {
  if (!title && !artist) return null;
  if (!title) title = "-";
  if (!artist) artist = "-";
  const options = {
    apiKey: process.env.NEXT_PUBLIC_CLIENT_ACCESS_TOKEN ?? "",
    title,
    artist,
    optimizeQuery: true,
    authHeader: true,
  };
  const data = await searchSong(options);
  return data;
};
