export type SpotifySearch = {
  tracks: {
    next: string;
    previous: string;
    total: number;
    items: {
      album: {
        images: { url: string; height: string; weight: string }[];
        name: string;
      };
      artists: { name: string }[];
      duration_ms: number;
      id: string;
      name: string;
    }[];
  };
};

export type RapidLyricsType = { lyrics: { lines: { words: string }[] } };

export const fetchSpotifySearch = async (title: string, artist: string) => {
  if (!title && !artist) return null;
  if (!title) title = "-";
  if (!artist) artist = "-";
  const url = `https://api.spotify.com/v1/search?q=${title}%20${artist}&type=track`;
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${(await getAccessToken())?.access_token}`,
    },
  };
  const data: SpotifySearch = await fetch(url, options)
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

export type accessToken = {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
} | null;

export const createAccessToken = async () => {
  const url = "https://accounts.spotify.com/api/token";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(
          process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID +
            ":" +
            process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET
        ).toString("base64"),
    },
    body: "grant_type=client_credentials",
  };

  const accessToken: accessToken = await fetch(url, options)
    .then((res) => res.json())
    .catch((err) => console.error("error:" + err));
  if (accessToken) accessToken.expires_in += Date.now() / 1000;
  localStorage.setItem("access_token", JSON.stringify(accessToken));
  return accessToken;
};

export const getAccessToken = async () => {
  let currentToken: accessToken = JSON.parse(
    localStorage.getItem("access_token") ?? "null"
  );
  if (!currentToken || currentToken.expires_in < Date.now() / 1000) {
    currentToken = await createAccessToken();
  }
  return currentToken;
};
