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
2. Copy `.env.template` in `apps/client` and paste it in the same directory as `.env` and fill in the values. View the [Environment Variables](##environment-variables) section for more information.
3. Run this to download all the dependencies.

```bash
pnpm install
```

### Running

1. Run `pnpm dev` in the root directory.
2. Access the app at `localhost:3000`

### Deploying the AWS Lambda (Backend)

## Environment Variables

#### NEXT_PUBLIC_RAPID_APP_KEY

Make a RapidAPI app with this [API](https://rapidapi.com/Glavier/api/spotify23/) and use the key here.

#### NEXT_PUBLIC_AZURE_TRANSLATE_API_KEY

Make Azure account and register for the translation API. Use the key here.

#### NEXT_PUBLIC_SERVER_URL

#### NEXT_PUBLIC_SPOTIFY_CLIENT_ID

Create a Spotify API app and use the client id here.

#### NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET

Create a Spotify API app and use the client secret here.

#### NEXT_PUBLIC_LAMBDA_ANKI_URL

URL of Lambda function

#### NEXT_PUBLIC_AWS_REGION

Region of Lambda function

#### NEXT_PUBLIC_AWS_ACCESS_KEY_ID

Access key id of AWS account

#### NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY

Secret access key of AWS account

#### NEXT_PUBLIC_AWS_FUNCTION_NAME

Name of Lambda function
