import { VocabType } from "../contexts/appContext";

export const fetchAnkiCards = async (title: string, vocab: VocabType) => {
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL as string}/anki`;
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, vocab }),
  };
  const data = await fetch(url, options)
    .then((res) => res.json())
    .catch((err) => console.error("error:" + err));
  return data.content;
};
