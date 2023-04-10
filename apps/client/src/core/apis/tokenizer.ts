export const fetchTokenizedWords = (input: string[]) => {
  const jpLyrics: string[] = [];
  input.map((line) => {
    let stripped = line.match(
      /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/
    )?.input;
    if (stripped) {
      stripped = stripped.replace(/[[\]()-_+=!@#$%&*|'.,…“”「」]/gi, "");
      stripped = stripped.replace(/[a-z]/gi, "");
      stripped = stripped.trim();
      jpLyrics.push(stripped);
    }
  });
  console.log(jpLyrics);
};
