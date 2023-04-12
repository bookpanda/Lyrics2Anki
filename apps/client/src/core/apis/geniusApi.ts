import axios from "axios";
import { getLyrics, getSong, searchSong } from "genius-lyrics-api";

export const fetchGeniusSong = async (title: string, artist: string) => {
  if (!title && !artist) return null;
  if (!title) title = "-";
  if (!artist) artist = "-";
  const options = {
    apiKey: process.env.NEXT_PUBLIC_GENIUS_CLIENT_ACCESS_TOKEN as string,
    title,
    artist,
    optimizeQuery: true,
    authHeader: true,
  };
  const data = await getSong(options);
  return data;
};

export const fetchGeniusLyrics = async (title: string, url: string) => {
  // if (!title) return null;
  // const options = {
  //   apiKey: process.env.NEXT_PUBLIC_GENIUS_CLIENT_ACCESS_TOKEN as string,
  //   title,
  //   artist: "-",
  //   optimizeQuery: false,
  //   authHeader: false,
  // };
  // console.log(url);
  // const a = `${url}&access_token=${
  //   process.env.NEXT_PUBLIC_GENIUS_CLIENT_ACCESS_TOKEN as string
  // }`;
  // axios({
  //   url: a,
  //   method: "get",
  //   headers: { "Access-Control-Allow-Origin": "*" },
  // });

  // const data = await getLyrics(options);
  const data = await getLyrics(url);
  return data;
};

export const fetchGeniusSearch = async (title: string, artist: string) => {
  if (!title && !artist) return null;
  if (!title) title = "-";
  if (!artist) artist = "-";
  const options = {
    apiKey: process.env.NEXT_PUBLIC_GENIUS_CLIENT_ACCESS_TOKEN as string,
    title,
    artist,
    optimizeQuery: true,
    authHeader: false,
  };
  const data = await searchSong(options);
  return data;
};
