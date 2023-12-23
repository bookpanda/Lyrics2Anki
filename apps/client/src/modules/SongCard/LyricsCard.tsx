import { Typography } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

export interface ILyricsCard extends PropsWithChildren {
    lyrics: string[];
    title: string;
}

export const LyricsCard: FC<ILyricsCard> = ({ lyrics, title }) => {
    return (
        <div className="p-8">
            <Typography variant="h5" color="secondary.main">
                {title}
            </Typography>
            {lyrics.map((line, idx) => (
                <Typography
                    key={idx}
                    variant="subtitle2"
                    color="secondary.light"
                    fontWeight={300}
                >
                    {line}
                </Typography>
            ))}
        </div>
    );
};
