import { FC, PropsWithChildren } from "react";

export interface ILyricsCard extends PropsWithChildren {
  lyrics: string[];
}

export const LyricsCard: FC<ILyricsCard> = ({ lyrics }) => {
  return (
    <div>
      {lyrics.map((line, idx) => (
        <p key={idx}>{line}</p>
      ))}
    </div>
  );
};
