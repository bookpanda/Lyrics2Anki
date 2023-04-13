import { Header } from "$modules/Header";
import { SearchBar } from "$modules/SearchBar";
import { LyricsCard, SongCard } from "$modules/SongCard";
import { Container } from "@mui/material";
import { NextPage } from "next";
import { useAppContext } from "src/core/contexts";

const IndexPage: NextPage = () => {
  const { selectedSong, songs, vocab } = useAppContext();
  return (
    <div className="theme w-max-screen overflow-x-hidden bg-primary.dark">
      <Header />
      <Container
        maxWidth="xl"
        sx={{
          marginTop: 2,
          marginBottom: 8,
          padding: 4,
        }}
      >
        <div className="w-full rounded-lg bg-primary.light p-6">
          <SearchBar />
          <div className="flex w-full space-x-4">
            <div className="mt-8 w-1/2">
              {songs?.map((s) => (
                <SongCard
                  key={s.id}
                  title={s.title}
                  albumArt={s.albumArt}
                  url={s.id}
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
        </div>
      </Container>
    </div>
  );
};

export default IndexPage;
