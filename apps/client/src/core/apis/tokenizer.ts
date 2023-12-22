import Kuroshiro from 'kuroshiro';
import KuromojiAnalyzer from 'kuroshiro-analyzer-kuromoji';

const kuroshiro = new Kuroshiro();
const init = async () => {
    await kuroshiro.init(
        new KuromojiAnalyzer({
            dictPath: '/static/dict',
        })
    );
};
init();

export const cleanLyrics = (input: string[]) => {
    const jpLyrics: string[] = [];
    input.map((line) => {
        let stripped = line.match(
            /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/
        )?.input;
        if (stripped) {
            stripped = stripped.replace(
                /[[\]()-_+=!@#$%&*|'.,…“”「」\u3000]/gi,
                ''
            );
            stripped = stripped.replace(/[a-z]/gi, '');
            stripped = stripped.trim();
            jpLyrics.push(stripped);
        }
    });
    return jpLyrics;
};

export const fetchTokenizedWords = async (cleanedLyrics: string[]) => {
    const url = process.env.NEXT_PUBLIC_SERVER_URL as string;
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cleanedLyrics),
    };
    const data = await fetch(url, options)
        .then((res) => res.json())
        .catch((err) => console.error('error:' + err));
    return data.content;
};

export type furiganaType = string[] | null;

export const addFurigana = async (tokens: string[]) => {
    const furigana: furiganaType = [];
    tokens.map(async (tk) => {
        const result = await kuroshiro.convert(tk, {
            // mode: "furigana",
            to: 'hiragana',
        });
        if (result !== tk) furigana.push(result);
        else furigana.push('');
    });
    return furigana;
};
