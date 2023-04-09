import Input from "@mui/joy/Input";
import { Typography } from "@mui/material";
import { useAppContext } from "src/core/contexts";

export const SearchBar = () => {
  const { setSearchArtist, setSearchTrack } = useAppContext();
  return (
    <div>
      <Typography variant="h5">Search Track</Typography>
      <Input
        placeholder="Type in here…"
        onChange={(e) => setSearchTrack(e.target.value)}
      />
      <Typography variant="h5">Search Artist</Typography>
      <Input
        placeholder="Type in here…"
        onChange={(e) => setSearchArtist(e.target.value)}
      />
    </div>
  );
};
