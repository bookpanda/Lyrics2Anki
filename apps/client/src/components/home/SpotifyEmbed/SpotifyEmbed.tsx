import { FC } from "react";
import { useAppContext } from "src/contexts";

export const SpotifyEmbed: FC = () => {
    const { selectedSong } = useAppContext();
    return (
        <div className="flex h-full items-center z-10 w-full mx-8">
            <iframe
                title="spotify-embed"
                src={`https://open.spotify.com/embed/track/${selectedSong?.id}?utm_source=generator`}
                width="100%"
                height="152"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
            />
        </div>
    );
};
