export interface Char {
    name: string;
    initial: boolean;
    final: boolean;
    value: string[];
}

//token = q
//chars = letras
//charsToken = array de objetos de cada letra das palavras
//allCharsToken = array do charsToken
//initialToken = q0
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const mergeChars = ({ charsToken: charToken, token, initial }: { charsToken: Char[], token: string, initial: boolean }) => {
    const response = {
        name: token,
        initial,
        final: false,
        value: alphabet.map(() => ""),
    };

    charToken.forEach((charToken) => {
        if (charToken) {
            charToken.value.forEach((token, tokenIndex) => {
                if (token !== "") {
                    response.final = !response.final ? charToken.final : response.final;
                    response.value[tokenIndex] += `${token}, `;
                }
            });
        }
    });

    response.value = response.value.map((token) => token.slice(0, -2));

    return response;
};

export const formattedWords = ({ words }: { words: string[] }): Char[] => {
    let charsResult: Char[] = [];

    let tokenCount = 0;
    let allCharsToken: Char[][] = [];
    words.forEach((word, wordIndex) => {
        const charsToken: Char[] = [];
        word.split("").forEach((char, charIndex) => {
            charsToken[charIndex] = {
                name: charIndex === 0 ? "q0" : `q${tokenCount}`,
                initial: charIndex === 0,
                final: false,
                value: alphabet.map((letter) =>
                    letter === char.toUpperCase() ? `q${tokenCount + 1}` : ""
                ),
            };

            charsToken[charIndex + 1] = {
                name: `q${tokenCount + 1}`,
                initial: false,
                final: true,
                value: alphabet.map(() => "-"),
            };

            tokenCount++;
        });

        allCharsToken[wordIndex] = charsToken;
    });

    const initialToken: Char[] = [];
    allCharsToken.forEach((charToken) => {
        initialToken.push(charToken[0]);

        charToken.forEach((token) => {
            if (token.name !== "q0") charsResult.push(token);
        });
    });

    charsResult.push(mergeChars({ token: "q0", charsToken: initialToken, initial: true }));

    let isNew = true;
    while (isNew) {
        isNew = false;
        charsResult.forEach((charTokenResult) => {
            charTokenResult.value
                .filter((tokens) => tokens && tokens !== "-")
                .forEach((token) => {
                    if (charsResult.findIndex((charResult) => charResult.name === token) < 0) {
                        const charsToMerge = token
                            .split(", ")
                            .map((token) => charsResult.find((charResult) => charResult.name === token));

                        if (charsToMerge.every((char) => char)) {
                            charsResult.push(
                                mergeChars({ token: token, initial: false, charsToken: charsToMerge as Char[] })
                            );
                            isNew = true;
                        }
                    }
                });
        });
    }

    const finalSortedChars = charsResult.sort((a, b) => {
        const aValue = a.name.includes(",") ? 0.1 : parseInt(a.name.substring(1));
        const bValue = b.name.includes(",") ? 0.1 : parseInt(b.name.substring(1));

        return aValue - bValue;
    });

    return finalSortedChars;
};