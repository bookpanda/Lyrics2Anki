import { SearchBar } from "$modules/SearchBar";
import { LyricsCard, SongCard } from "$modules/SongCard";
import { Container } from "@mui/material";
import { NextPage } from "next";
import { useAppContext } from "src/core/contexts";

const IndexPage: NextPage = () => {
  const { selectedSong, songs, vocab } = useAppContext();
  return (
    <div className="h-full w-full">
      <Container maxWidth="xl">
        <h1>Index Pag</h1>
        <SearchBar />
        <div className="flex w-full space-x-4">
          <div className="mt-8 w-1/2">
            {songs?.map((s) => (
              <SongCard
                key={s.url}
                title={s.title}
                albumArt={s.albumArt}
                url={s.url}
                src={s.src}
              />
            ))}
          </div>
          {selectedSong && (
            <div className="w-1/2">
              <LyricsCard
                title={selectedSong.title}
                lyrics={selectedSong.lyrics}
              />
            </div>
          )}
          {vocab && (
            <div className="w-1/2">
              {vocab.map((v, idx) => (
                <div key={idx} className="flex space-x-2">
                  <p>{v.token}</p>
                  <p>{v.furigana}</p>
                  <p>{v.translation}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default IndexPage;
