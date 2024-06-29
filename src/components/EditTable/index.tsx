import React, { useEffect, useState } from 'react';
import Input from '../Input';
import DefaultButton from '../Button';
import ChipsArray from '../Chip';
import AlphabetTable from '../Table';
import { Box, CssBaseline, Typography, Toolbar, AppBar } from '@material-ui/core';
import { Char, formattedWords } from '../../util';

export interface ChipData {
    key: number;
    label: string;
}

const EditTable: React.FC = () => {
    const [chipData, setChipData] = useState<ChipData[]>([]);
    const [inputValue, setInputValue] = useState<string>('');
    const [charsToken, setCharsToken] = useState<Char[]>([]);
    const [error, setError] = useState<string | undefined>('');

    useEffect(() => {
        const regex = /^[A-Za-z]*$/;

        if (inputValue === '' || regex.test(inputValue)) {
            setError('');
        } else {
            setError('Somente letras do alfabeto são permitidas.');
        }
    }, [inputValue]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleAddChip = () => {
        if (inputValue.trim() !== '') {
            setChipData((chips) => [
                ...chips,
                { key: chips.length > 0 ? chips[chips.length - 1].key + 1 : 0, label: inputValue },
            ]);
            setInputValue('');
        }

        const updatedCharsToken = formattedWords({ words: [...chipData, { key: chipData.length, label: inputValue }].map(chip => chip.label) });
        setCharsToken(updatedCharsToken);
    };

    const handleClearChips = () => {
        setChipData([]);
        setCharsToken([]);

    };

    const handleDeleteChip = (chipToDelete: ChipData) => {
        setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
        updateCharsToken(chipData.filter((chip) => chip.key !== chipToDelete.key).map(chip => chip.label));
    };

    const updateCharsToken = (updatedWords: string[]) => {
        const updatedCharsToken = formattedWords({ words: updatedWords });
        setCharsToken(updatedCharsToken);
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar>
                <Toolbar>
                    <Typography variant="h6">Analisador Léxico - Rafaela Bortoloso</Typography>
                </Toolbar>
            </AppBar>
            <Toolbar id="back-to-top-anchor" />
            <div style={{ marginInline: 20 }}>
                <Box >
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div style={{ width: '20%', marginRight: '20px' }}>
                            <Input
                                label="Insira uma palavra"
                                style={{ width: '100%', marginTop: 10 }}
                                value={inputValue}
                                onChange={handleInputChange}
                                error={error}
                            />
                            <DefaultButton
                                label="Adicionar"
                                style={{ marginTop: 10, width: '100%' }}
                                onClick={handleAddChip}
                                disabled={!!error}
                            />
                            <ChipsArray chipData={chipData} handleDeleteChip={handleDeleteChip} />
                            <DefaultButton
                                label={'Limpar'}
                                style={{ width: '100%' }}
                                onClick={handleClearChips}
                            />
                            {/* <Input label="Analisar" style={{ width: '100%', marginTop: 10 }}/> */}
                        </div>
                        <div style={{ width: '80%' }}>
                            <AlphabetTable chars={charsToken} />
                        </div>
                    </div>

                </Box>
            </div>
        </React.Fragment >
    );
};

export default EditTable;
