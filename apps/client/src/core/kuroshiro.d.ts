declare module "kuroshiro" {
    export default class Kuroshiro {
        constructor();
        init(KuromojiAnalyzer): void;
        convert(input: string, options: { mode?: string; to?: string }): string;
    }
}
