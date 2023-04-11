import axios from "axios";
import { v4 } from "uuid";

const key = process.env.NEXT_AZURE_TRANSLATE_API_KEY as string;
const endpoint = "https://api.cognitive.microsofttranslator.com";
const location = "southeastasia";

export const fetchTranslation = async (tokens: string[]) => {
  axios({
    baseURL: endpoint,
    url: "/translate",
    method: "post",
    headers: {
      "Ocp-Apim-Subscription-Key": key,
      // location required if you're using a multi-service or regional (not global) resource.
      "Ocp-Apim-Subscription-Region": location,
      "Content-type": "application/json",
      "X-ClientTraceId": v4().toString(),
    },
    params: {
      "api-version": "3.0",
      from: "jp",
      to: "en",
    },
    data: [
      {
        text: "I would really like to drive your car around the block a few times!",
      },
    ],
    responseType: "json",
  }).then(function (response) {
    console.log(JSON.stringify(response.data, null, 4));
  });
  //   console.log(data);

  //   console.log(data[0].translations[0]);
  //   return data;
};
