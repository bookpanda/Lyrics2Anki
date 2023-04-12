import { Paper } from "@mui/material";
import Image from "next/image";
import { FC, PropsWithChildren } from "react";
import { useAppContext } from "src/core/contexts";

export interface ISongCard extends PropsWithChildren {
  title: string;
  albumArt: string;
  url: string;
  src: string;
}

export const SongCard: FC<ISongCard> = ({ albumArt, src, title, url }) => {
  const { selectSong, selectedSong } = useAppContext();
  return (
    <div
      className="mt-4"
      onClick={() => selectSong(title, url, src)}
      role="presentation"
    >
      <Paper
        elevation={selectedSong?.url === url ? 0 : 12}
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
          style={{ width: "20%", height: "auto" }}
          alt="albumArt"
          className="mr-8"
        />
        {title}
      </Paper>
    </div>
  );
};
