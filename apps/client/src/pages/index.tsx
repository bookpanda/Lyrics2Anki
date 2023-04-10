import { SearchBar } from "$modules/SearchBar";
import { SongCard } from "$modules/SongCard";
import { Container } from "@mui/material";
import { NextPage } from "next";
import { useAppContext } from "src/core/contexts";

const IndexPage: NextPage = () => {
  const { songs } = useAppContext();
  return (
    <div className="h-full w-full">
      <Container maxWidth="xl">
        <h1>Index Pag</h1>
        <SearchBar />
        <div className="mt-8 w-1/2">
          {songs?.map((s) => (
            <SongCard
              key={s.url}
              title={s.title}
              albumArt={s.albumArt}
              url={s.url}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default IndexPage;
