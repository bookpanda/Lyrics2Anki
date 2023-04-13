import { Button, TextField } from "@mui/material";
import { useAppContext } from "src/core/contexts";

export const SearchBar = () => {
  const { getAnkiCards, setSearchTrack } = useAppContext();
  return (
    <div className="w-full bg-red-100">
      <div className="flex w-full space-x-8">
        <TextField
          sx={{ width: "30%" }}
          label="Track name"
          onChange={(e) => setSearchTrack(e.target.value)}
        />
        <TextField
          sx={{ width: "30%" }}
          label="Artist name"
          onChange={(e) => setSearchTrack(e.target.value)}
        />
      </div>
      <div className="flex space-x-4">
        <Button
          variant="outlined"
          onClick={() => getAnkiCards()}
          sx={{ marginTop: 2 }}
        >
          Get AnkiCards
        </Button>
      </div>
    </div>
  );
};
