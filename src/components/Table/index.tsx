import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

interface ListTestWords {
    word: string;
    success: boolean;
}

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

type PatternTokens = { [key: string]: number | boolean };

interface BasicTableProps {
    table: PatternTokens[];
    testWord: string;
    setWord: (word: string) => void;
    list: ListTestWords[];
    setList: (list: ListTestWords[]) => void;
}

export default function BasicTable({
    table,
    testWord,
    setList,
    setWord,
    list,
}: BasicTableProps) {
    const classes = useStyles();

    const tableData = table.map((tableItem) =>
        alphabet.map((letter) => tableItem[letter] || ''),
    );

    let currentRow = 0;

    const isValidWord = () => {
        if (testWord.length === 1) {
            currentRow = 0;
            return tableData[0][testWord.charCodeAt(0) - 'a'.charCodeAt(0)] !== '';
        }
        for (let i = 0; i < testWord.length; i++) {
            const letter = testWord[i];
            const number = letter.charCodeAt(0) - 'a'.charCodeAt(0);
            if (tableData[currentRow][number] === '') {
                return false;
            }
            if (i < testWord.length - 1) {
                currentRow = tableData[currentRow][number] as number;
            }
        }
        return true;
    };

    const valid = isValidWord();

    if (testWord[testWord.length - 1] === ' ' && testWord.length > 1) {
        if (table[currentRow].end === true && valid) {
            setList([...list, { word: testWord.trim(), success: true }]);
            setWord('');
        } else {
            setList([...list, { word: testWord.trim(), success: false }]);
            setWord('');
        }
    }

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>δ</TableCell>
                        {alphabet.map((letter) => (
                            <TableCell key={letter}>{letter}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableData.map((rowData, i) => (
                        <TableRow
                            key={i}
                            style={{
                                backgroundColor:
                                    i === currentRow && testWord && !valid
                                        ? 'red'
                                        : 'transparent',
                            }}
                        >
                            <TableCell component="th" scope="row">
                                {table[i].end === true ? `q${i}*` : `q${i}`}
                            </TableCell>
                            {rowData.map((cellData, j) => (
                                <TableCell
                                    key={j}
                                    style={{
                                        backgroundColor:
                                            i === currentRow &&
                                                valid &&
                                                testWord[testWord.length - 1] === alphabet[j] &&
                                                cellData
                                                ? 'green'
                                                : 'transparent',
                                    }}
                                >
                                    {cellData ? `q${cellData}` : '-'}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
