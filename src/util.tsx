import { useState } from "react";

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
export const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

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

    const finalSortedChars = charsResult.sort((a, b) => {
        const aValue = a.name.includes(",") ? 0.1 : parseInt(a.name.substring(1));
        const bValue = b.name.includes(",") ? 0.1 : parseInt(b.name.substring(1));

        return aValue - bValue;
    });

    return finalSortedChars;
};

let nextToken: string;

export const checkLetterInTable = ({ char, isFirstChar, charsToken }: { char: string, isFirstChar: boolean, charsToken: Char[] }) => {
    const letterIndex = alphabet.findIndex((letter) => letter === char.toUpperCase());
    let newLetterIndex = true;

    if (isFirstChar) {
        nextToken = charsToken[0].value[letterIndex];
    } else {
        if (nextToken && nextToken !== "") {
            const nextTokenFormatted = nextToken.split(', ');
            let foundObjects = charsToken.filter(token => nextTokenFormatted.includes(token.name));

            while (foundObjects.length > 0 && newLetterIndex) {
                const valueIndex = foundObjects.map((obj) => obj.value.findIndex((value) => value !== ""));

                if (valueIndex.includes(letterIndex)) {
                    const nextRow = foundObjects.find(obj => obj.value[letterIndex] !== "");

                    nextToken = nextRow ? nextRow.value[letterIndex] : "";
                    const nextTokenFormatted = nextToken.split(', ');
                    foundObjects = charsToken.filter(token => nextTokenFormatted.includes(token.name));
                    newLetterIndex = false;

                    if (!foundObjects.length) {
                        throw new Error("Palavra inválida");
                    }
                } else {
                    throw new Error("Palavra inválida");
                }
            }

        } else {
            throw new Error("Palavra inválida");
        }
    }
};

