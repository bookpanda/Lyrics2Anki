# Lyrics2Anki

Makes Japanese Anki cards from ANY Spotify lyrics.

Now next time you go to Japanese karaoke with friends, you can ace those lyrics.

## Stack

### Client

Nextjs, tailwind, shadcnUI, Kuroshiro (kanji to hiragana)

### API

Spotify API, Rapid API, Azure Translation API

### Server

AWS Lambda, fugashi (Japanese tokenizer), genanki (Anki Card generator)

## Getting Started

### Prerequisites

-   nvm
-   pnpm
-   python

### Installation

1. Clone this repo
2. Copy `.env.template` in `apps/client` and paste it in the same directory as `.env` and fill in the values.
3. Run this to download all the dependencies.

```bash
pnpm install
```

### Running

1. Run `pnpm dev` in the root directory.
2. Access the app at `localhost:3000`

### Deploying the AWS Lambda (Backend)
