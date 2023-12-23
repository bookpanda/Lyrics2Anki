declare module 'kuroshiro-analyzer-kuromoji' {
    export default class KuromojiAnalyzer {
        constructor({ dictPath: string }?);
        convert(input: string, options: { mode?: string; to?: string }): string;
    }
}
