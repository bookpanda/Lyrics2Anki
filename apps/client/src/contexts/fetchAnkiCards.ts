import * as AWS from "aws-sdk";
import { Vocab } from "src/types/types";

type returnData = {
    statusCode: number;
    body: string;
    isBase64Encoded: boolean;
};

export const fetchAnkiCards = async (title: string, vocab: Vocab) => {
    AWS.config.update({
        region: process.env.AWS_REGION as string,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
        },
    });
    const functionName = process.env.AWS_FUNCTION_NAME as string;

    const payload = {
        data: {
            title: title,
            vocab: vocab,
        },
    };

    const params: AWS.Lambda.InvocationRequest = {
        FunctionName: functionName,
        InvocationType: "RequestResponse",
        Payload: JSON.stringify(payload),
    };
    const lambda = new AWS.Lambda();

    lambda.invoke(params, (err, data) => {
        if (err) {
            console.error("Error calling Lambda function:", err);
        } else {
            const res = JSON.parse(data.Payload as string) as returnData;
            base64ToFile(res.body, `${title}.apkg`, "application/apkg");
        }
    });
};

const base64ToFile = (
    base64String: string,
    fileName: string,
    mimeType: string
) => {
    if (!base64String) return;
    const binaryString = Buffer.from(base64String, "base64").toString();
    const arrayBuffer = new ArrayBuffer(binaryString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < binaryString.length; i++) {
        uint8Array[i] = binaryString.charCodeAt(i);
    }

    const blob = new Blob([uint8Array], { type: mimeType });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;

    link.click();
};
