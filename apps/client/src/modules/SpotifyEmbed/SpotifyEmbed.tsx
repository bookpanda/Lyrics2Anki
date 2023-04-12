import { useAppContext } from "src/core/contexts";

export const SpotifyEmbed = () => {
  const { selectedSong } = useAppContext();
  return (
    <div>
      <iframe
        title="spotify-embed"
        src={`https://open.spotify.com/embed/track/${selectedSong?.url}?utm_source=generator`}
        width="100%"
        height="152"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
    </div>
  );
};
