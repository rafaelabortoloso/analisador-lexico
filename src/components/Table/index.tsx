import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { Char } from '../../util';

interface AlphabetTableProps {
    chars: Char[];
}

const AlphabetTable: React.FC<AlphabetTableProps> = ({ chars }) => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const [currentState, setCurrentState] = useState(["q0"]);

    const getLettersArray = (label: string) => {
        return label.split('');
    };

    return (
        <TableContainer component={Paper} style={{ marginBlock: 10 }}>
            <Table>
                <TableHead >
                    <TableRow>
                        <TableCell>δ</TableCell>
                        {alphabet.map((letter) => (
                            <TableCell style={{ maxWidth: 50 }}>{letter}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {chars.map((char) => (
                        <TableRow
                            key={char.name}
                            id={char.name}
                            className={
                                currentState[currentState.length - 1] === char.name
                                    ? "active"
                                    : ""
                            }
                        >
                            <TableCell width="20px" align="center">
                                {char.initial ? "➜" : char.final ? "✱" : ""}
                                {char.name}
                            </TableCell>
                            {char.value.map((qValue, qIndex) => (
                                <TableCell
                                    width="20px"
                                    align="center"
                                    key={`${qValue}${qIndex}`}
                                >
                                    {qValue}
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


