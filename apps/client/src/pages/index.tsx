import { SearchBar } from "$modules/SearchBar";
import { LyricsCard, SongCard } from "$modules/SongCard";
import { Container } from "@mui/material";
import { NextPage } from "next";
import { useAppContext } from "src/core/contexts";

const IndexPage: NextPage = () => {
  const { songs, lyrics } = useAppContext();
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
          {lyrics && (
            <div className="w-1/2">
              <LyricsCard lyrics={lyrics.lyrics} />
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default IndexPage;
