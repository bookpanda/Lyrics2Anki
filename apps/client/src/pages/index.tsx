import { SearchBar } from "$modules/SearchBar";
import { getLyrics, getSong, searchSong } from "genius-lyrics-api";
import { NextPage } from "next";

const IndexPage: NextPage = () => {
  const options = {
    apiKey: process.env.NEXT_PUBLIC_CLIENT_ACCESS_TOKEN ?? "",
    title: "Blinding Lights",
    artist: "The Weeknd",
    optimizeQuery: true,
    authHeader: true,
  };
  const options_b = {
    apiKey: process.env.NEXT_PUBLIC_CLIENT_ACCESS_TOKEN ?? "",
    title: "question assassination",
    artist: "-",
    optimizeQuery: true,
    authHeader: true,
  };
  const fetchAPI = async () => {
    const a = await getLyrics(
      "https://genius.com/Mrs-green-apple-inferno-lyrics"
    );
    // const a = await getLyrics(options_b);
    console.log(a);

    const b = await searchSong(options_b);
    console.log(b);

    // const c = await getLyrics(options_b);
    // console.log(c);
  };
  fetchAPI();
  // if (options) getLyrics(options).then((lyrics) => console.log(lyrics));

  // getSong(options).then((song) =>
  //   console.log(`
  // ${song.id}
  // ${song.title}
  // ${song.url}
  // ${song.albumArt}
  // ${song.lyrics}`)
  // );
  // const getTestLyrics = async () => {
  //   const data = await fetch("https://api.genius.com/songs/4709697", {
  //     method: "get",
  //     headers: new Headers({
  //       Authorization: `Bearer ${
  //         process.env.NEXT_PUBLIC_CLIENT_ACCESS_TOKEN as string
  //       }`,
  //       "Access-Control-Allow-Origin": "*",
  //       "Content-Type": "application/x-www-form-urlencoded",
  //     }),
  //   }).then((res) => {
  //     return res.json();
  //   });
  //   console.log(data);
  // };
  // getTestLyrics();
  return (
    <div className="h-full w-full bg-red-100">
      <h1>Index Pag</h1>
      <SearchBar />
    </div>
  );
};

export default IndexPage;
