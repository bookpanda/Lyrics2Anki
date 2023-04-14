import { Slide } from "@mui/material";
import { FC } from "react";
import { useAppContext } from "src/core/contexts";

export const SpotifyEmbed: FC = () => {
  const { selectedSong } = useAppContext();
  return (
    <div className="flex h-full w-1/2 items-center">
      <Slide direction="left" in={Boolean(selectedSong)}>
        <iframe
          title="spotify-embed"
          src={`https://open.spotify.com/embed/track/${selectedSong?.url}?utm_source=generator`}
          width="100%"
          height="152"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </Slide>
    </div>
  );
};
