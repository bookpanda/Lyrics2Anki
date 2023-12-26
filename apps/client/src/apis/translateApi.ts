import axios from "axios";
import { v4 } from "uuid";

type translationType = { translations: { text: string; to: string }[] }[];

const key = process.env.AZURE_TRANSLATE_API_KEY as string;
const endpoint = "https://api.cognitive.microsofttranslator.com";
const location = "southeastasia";

export const fetchTranslation = async (tokens: string[]) => {
    const input = tokens.map((token) => {
        return { text: token };
    });
    return axios({
        baseURL: endpoint,
        url: "/translate",
        method: "post",
        headers: {
            "Ocp-Apim-Subscription-Key": key,
            "Ocp-Apim-Subscription-Region": location,
            "Content-type": "application/json",
            "X-ClientTraceId": v4().toString(),
        },
        params: {
            "api-version": "3.0",
            from: "ja",
            to: "en",
        },
        data: input,
        responseType: "json",
    }).then(function (response) {
        const data: translationType = response.data;
        const translatedTokens: string[] = [];
        data.map((i) => {
            translatedTokens.push(i.translations[0].text);
        });
        return translatedTokens;
    });
};
