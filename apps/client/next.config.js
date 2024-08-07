/** @type {import("next").NextConfig} */
require("dotenv").config();

module.exports = {
    reactStrictMode: true,
    transpilePackages: ["ui"],
    env: {
        SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
        SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
        RAPID_APP_KEY: process.env.RAPID_APP_KEY,
        TOKENIZE_API_URL: process.env.TOKENIZE_API_URL,
        TOKENIZE_API_KEY: process.env.TOKENIZE_API_KEY,
        AZURE_TRANSLATE_API_KEY: process.env.AZURE_TRANSLATE_API_KEY,
        LAMBDA_ANKI_URL: process.env.LAMBDA_ANKI_URL,
        AWS_REGION: process.env.AWS_REGION,
        AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
        AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
        AWS_FUNCTION_NAME: process.env.AWS_FUNCTION_NAME,
    },
};
