export type RapidDataType = {
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

export const fetchRapidSearch = async (title: string, artist: string) => {
  if (!title && !artist) return null;
  if (!title) title = "-";
  if (!artist) artist = "-";
  const url = `https://spotify23.p.rapidapi.com/search/?q=${title},${artist}&type=tracks&offset=0&limit=10&numberOfTopResults=5`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_APP_KEY ?? "",
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
  };
  const data: RapidDataType = await fetch(url, options)
    .then((res) => res.json())
    .catch((err) => console.error("error:" + err));
  return data;
};
