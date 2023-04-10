export const cleanLyrics = (input: string[]) => {
  const jpLyrics: string[] = [];
  input.map((line) => {
    let stripped = line.match(
      /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/
    )?.input;
    if (stripped) {
      stripped = stripped.replace(/[[\]()-_+=!@#$%&*|'.,…“”「」\u3000]/gi, "");
      stripped = stripped.replace(/[a-z]/gi, "");
      stripped = stripped.trim();
      jpLyrics.push(stripped);
    }
  });
  console.log(jpLyrics);

  return jpLyrics;
};

export const fetchTokenizedWords = async (cleanedLyrics: string[]) => {
  console.log();
  const url = `http://127.0.0.1:5000`;
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cleanedLyrics),
  };
  const data = await fetch(url, options)
    .then((res) => res.json())
    .catch((err) => console.error("error:" + err));
  return data;
};
