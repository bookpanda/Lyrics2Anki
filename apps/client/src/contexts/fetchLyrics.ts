type LyricsData = { lyrics: { lines: { words: string }[] } };
type Lyrics = string[];

export const fetchLyrics = async (id: string): Promise<Lyrics> => {
    if (!id) return [];

    const options = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": process.env.RAPID_APP_KEY as string,
            "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
        },
    };

    const url = `https://spotify23.p.rapidapi.com/track_lyrics/?id=${id}`;
    const data: LyricsData = await fetch(url, options)
        .then((res) => res.json())
        .catch((err) => console.error("error:" + err));
    if (!data || !data.lyrics) {
        return ["No lyrics"];
    }
    const lyrics = data.lyrics.lines.map((line) => line.words);

    return lyrics;
};
