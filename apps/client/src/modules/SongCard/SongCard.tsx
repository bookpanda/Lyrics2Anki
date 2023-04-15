import { Typography, useMediaQuery } from "@mui/material";
import clsx from "clsx";
import Image from "next/image";
import { FC, PropsWithChildren } from "react";
import { useAppContext } from "src/core/contexts";
import { theme } from "src/theme";

export interface ISongCard extends PropsWithChildren {
  id: number;
  title: string;
  albumArt: string;
  album: string;
  artist: string;
  url: string;
  duration: { minutes: number; seconds: number };
  src: string;
}

export const SongCard: FC<ISongCard> = ({
  album,
  albumArt,
  artist,
  duration,
  id,
  src,
  title,
  url,
}) => {
  const { selectSong, selectedSong } = useAppContext();
  const breakSM = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <div
      className={clsx(
        "mt-4 flex items-center rounded-md p-2 hover:cursor-pointer hover:bg-primary.light"
      )}
      onClick={() => selectSong(title, url, src)}
      role="presentation"
    >
      <div className="mx-5 flex w-5 justify-center">
        <Typography
          fontWeight={300}
          color="secondary.light"
          variant="subtitle1"
        >
          {id}
        </Typography>
      </div>
      <Image
        src={albumArt}
        unoptimized
        loader={() => albumArt}
        width={60}
        height={60}
        // style={{ width: "10%", height: "auto" }}
        alt="albumArt"
        className={clsx(breakSM ? "mr-8" : "mr-4")}
      />
      <div
        className={clsx(
          " flex flex-col",
          breakSM ? " mr-5 w-[30%]" : "mr-2 w-[40%]"
        )}
      >
        <Typography
          color={
            selectedSong?.url === url ? "secondary.dark" : "secondary.main"
          }
          variant="subtitle1"
          fontWeight={300}
          noWrap
        >
          {title}
        </Typography>
        <Typography
          color="secondary.light"
          variant="subtitle1"
          fontWeight={300}
          noWrap
        >
          {artist}
        </Typography>
      </div>
      {breakSM && (
        <div className="mr-5 flex w-[25%] flex-col">
          <Typography
            color="secondary.light"
            variant="subtitle1"
            fontWeight={300}
            noWrap
          >
            {album}
          </Typography>
        </div>
      )}
      {breakSM && (
        <div className="mr-5 flex w-[10%] flex-col">
          <Typography
            color="secondary.light"
            variant="subtitle1"
            fontWeight={300}
            noWrap
          >
            {duration.minutes}:{duration.seconds}
          </Typography>
        </div>
      )}
    </div>
  );
};
