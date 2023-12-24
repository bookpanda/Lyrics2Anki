import { SelectedSong } from "@/types/types";
import { FastAverageColor } from "fast-average-color";

export const getSongColor = (song: SelectedSong) => {
    if (!song) return;

    const fac = new FastAverageColor();
    fac.getColorAsync(song?.albumArt || "")
        .then((color) => {
            song.color = {
                bg: color.rgba,
                isDark: color.isDark,
            };
            return;
        })
        .catch((e) => {
            console.log(e);
        });
};
