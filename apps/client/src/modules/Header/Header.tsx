import { SpotifyEmbed } from "$modules/SpotifyEmbed";
import { Typography } from "@mui/material";
import { FC } from "react";

export const Header: FC = () => {
  return (
    <div className="flex h-[200px] w-full items-center justify-around bg-primary.main">
      <Typography variant="h2" fontWeight={700} color="secondary.main">
        Lyrics2Anki
      </Typography>
      <SpotifyEmbed />
    </div>
  );
};
