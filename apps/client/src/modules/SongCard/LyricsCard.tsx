import { Typography } from "@mui/material";
import { FC, PropsWithChildren } from "react";

export interface ILyricsCard extends PropsWithChildren {
  lyrics: string[];
  title: string;
}

export const LyricsCard: FC<ILyricsCard> = ({ lyrics, title }) => {
  return (
    <div>
      <Typography variant="h5">{title}</Typography>
      {lyrics.map((line, idx) => (
        <p key={idx}>{line}</p>
      ))}
    </div>
  );
};
