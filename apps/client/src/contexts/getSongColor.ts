import { nullColor } from "@/constants/nullColor";
import { FastAverageColor } from "fast-average-color";

export const getSongColor = async (albumArt: string) => {
    if (!albumArt)
        return {
            bg: nullColor,
            isDark: true,
        };

    const fac = new FastAverageColor();
    try {
        const colors = await fac.getColorAsync(albumArt || "");
        return {
            bg: colors.hex,
            isDark: colors.isDark,
        };
    } catch (error) {
        console.log(error);
        return {
            bg: nullColor,
            isDark: true,
        };
    }
};
