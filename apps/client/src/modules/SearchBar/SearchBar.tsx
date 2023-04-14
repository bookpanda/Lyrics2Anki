import { Alert, TextField } from "@mui/material";
import { FC } from "react";
import { useAppContext } from "src/core/contexts";

export const SearchBar: FC = () => {
  const { alert, getAnkiCards, setSearchTrack } = useAppContext();
  return (
    <div className="w-full">
      <div className="flex w-full space-x-8">
        <TextField
          sx={{ width: "30%" }}
          placeholder="Track Name"
          onChange={(e) => setSearchTrack(e.target.value)}
        />
        <TextField
          sx={{ width: "30%" }}
          placeholder="Artist Name"
          onChange={(e) => setSearchTrack(e.target.value)}
        />
      </div>
      <div className="mt-4 flex items-center space-x-4">
        <button
          className="rounded-md bg-secondary.dark p-2 px-4 font-[Gotham] font-semibold transition hover:bg-[#0fa243]"
          onClick={() => getAnkiCards()}
        >
          Get AnkiCards
        </button>
        {alert && <Alert severity="error">{alert}</Alert>}
      </div>
    </div>
  );
};
