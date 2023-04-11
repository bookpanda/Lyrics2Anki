export type RapidSearchType = {
  query: string;
  tracks: {
    items: {
      data: {
        albumOfTrack: {
          coverArt: {
            sources: { height: number; width: number; url: string }[];
          };
          uri: string;
        };
        artists: { items: { uri: string; profile: { name: string } }[] };
        id: string;
        name: string;
        uri: string;
      };
    }[];
    pagingInfo: {
      limit: number;
      nextOffset: number;
    };
    totalCount: number;
  };
};

export type RapidLyricsType = { lyrics: { lines: { words: string }[] } };

export const fetchRapidSearch = async (title: string, artist: string) => {
  if (!title && !artist) return null;
  if (!title) title = "-";
  if (!artist) artist = "-";
  const url = `https://spotify23.p.rapidapi.com/search/?q=${title},${artist}&type=tracks&offset=0&limit=10&numberOfTopResults=5`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_APP_KEY as string,
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
  };
  const data: RapidSearchType = await fetch(url, options)
    .then((res) => res.json())
    .catch((err) => console.error("error:" + err));
  return data;
};

export const fetchRapidLyrics = async (id: string) => {
  if (!id) return null;
  const url = `https://spotify23.p.rapidapi.com/track_lyrics/?id=${id}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_APP_KEY as string,
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
  };

  const data: RapidLyricsType = await fetch(url, options)
    .then((res) => res.json())
    .catch((err) => console.error("error:" + err));
  return data;
};
