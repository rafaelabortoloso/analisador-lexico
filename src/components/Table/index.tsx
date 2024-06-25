import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';

interface AlphabetTableProps {
    word: string;
}

interface Rule {
    description: string;
    possibleRules: {
        letter: string;
        rule: Rule;
    }[];
}

const AlphabetTable: React.FC<AlphabetTableProps> = ({ word }) => {
    const [rules, setRules] = useState<Rule[]>([]);
    let firstRule: Rule | null = null;
    let terminalRule: Rule | null = null;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function isNull(obj: any) {
        return obj === null || obj === undefined;
    }

    function hasLetter(rule: Rule, letter: string) {
        return rule.possibleRules.some(r => r.letter === letter);
    }

    function getLetterRule(rule: Rule, letter: string) {
        return rule.possibleRules.find(r => r.letter === letter)?.rule || null;
    }

    function createRule(word: string) {
        if (isNull(firstRule)) {
            firstRule = {
                description: "q0",
                possibleRules: []
            }
            setRules([firstRule]);
        }

        const letters = word.split('');
        let lastRule = firstRule!;

        for (let i = 0; i < letters.length; i++) {
            if (!lastRule) return;
            const letter = letters[i];

            while (hasLetter(lastRule, letter)) {
                lastRule = getLetterRule(lastRule, letter)!;
            }

            if (i === (letters.length - 1)) {
                if (isNull(terminalRule)) {
                    const description = "q" + rules.length + "*";
                    const newRule: Rule = {
                        description: description,
                        possibleRules: []
                    }
                    terminalRule = newRule;
                    setRules(prevRules => [...prevRules, terminalRule!]);
                }
                const newLetterRule = {
                    letter: letter,
                    rule: terminalRule!
                }
                lastRule.possibleRules.push(newLetterRule);
                lastRule = terminalRule!;
            } else {
                const description = "q" + rules.length;
                const newRule: Rule = {
                    description: description,
                    possibleRules: []
                }
                const newLetterRule = {
                    letter: letter,
                    rule: newRule
                }
                lastRule.possibleRules.push(newLetterRule);
                lastRule = newRule;
                setRules(prevRules => [...prevRules, lastRule]);
            }
        }
    }

    createRule(word);

    const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

    return (
        <TableContainer component={Paper} style={{ marginBlock: 10 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>δ</TableCell>
                        {alphabet.map((letter, index) => (
                            <TableCell key={index} style={{ maxWidth: 10 }}>{letter}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rules.map((rule, idx) => (
                        <TableRow key={idx}>
                            <TableCell>{rule.description}</TableCell>
                            {alphabet.map((letter, index) => (
                                <TableCell key={`${idx}-${index}`}>
                                    {rule.possibleRules.some(r => r.letter === letter) ? '→' : ''}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AlphabetTable;


