import { Header } from "$modules/Header";
import { SearchBar } from "$modules/SearchBar";
import { LyricsCard, SongCard } from "$modules/SongCard";
import { Container } from "@mui/material";
import { NextPage } from "next";
import { useAppContext } from "src/core/contexts";

const IndexPage: NextPage = () => {
  const { selectedSong, songs, vocab } = useAppContext();
  return (
    <div className="theme min-h-[100vh] w-full overflow-x-hidden bg-primary.dark">
      <Header />
      <Container
        maxWidth="xl"
        sx={{
          marginTop: 2,
          marginBottom: 8,
          padding: 4,
        }}
      >
        <div className="w-full rounded-lg bg-primary.main p-6">
          <SearchBar />
          <div className="flex w-full space-x-4">
            <div className="mt-8 w-3/5">
              {songs?.map((s, idx) => (
                <SongCard
                  id={idx}
                  key={s.id}
                  title={s.title}
                  album={s.album}
                  albumArt={s.albumArt}
                  artist={s.artists}
                  url={s.id}
                  duration={s.duration}
                  src={s.src}
                />
              ))}
            </div>
            {selectedSong && (
              <div className="w-2/5">
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
