import { Paper } from "@mui/material";
import Image from "next/image";
import { FC, PropsWithChildren } from "react";

export interface ISongCard extends PropsWithChildren {
  title: string;
  albumArt: string;
  url: string;
}

export const SongCard: FC<ISongCard> = ({ albumArt, title, url }) => {
  return (
    <div className="mt-4">
      <Paper
        sx={{
          padding: 2,
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <Image
          src={albumArt}
          unoptimized
          loader={() => albumArt}
          width={60}
          height={60}
          alt="albumArt"
          className="mr-8"
        />
        {title}
      </Paper>
    </div>
  );
};
