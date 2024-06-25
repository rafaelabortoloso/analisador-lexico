import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Input from '../Input';
import DefaultButton from '../Button';
import ChipsArray from '../Chip';
import AlphabetTable from '../Table';

interface ChipData {
    key: number;
    label: string;
}

const Header: React.FC = () => {
    const [chipData, setChipData] = useState<ChipData[]>([]);
    const [inputValue, setInputValue] = useState<string>('');

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
    };

    const handleClearChips = () => {
        setChipData([]);
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
            <Container style={{ marginInline: 0}}>
                <Box >
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div style={{ width: '20%', marginRight: '20px' }}>
                            <Input
                                label="Insira uma palavra"
                                style={{ width: '100%', marginTop: 10 }}
                                value={inputValue}
                                onChange={handleInputChange}
                            />
                            <DefaultButton
                                label="Adicionar"
                                style={{ marginTop: 10, width: '100%' }}
                                onClick={handleAddChip}
                            />
                            <ChipsArray chipData={chipData} setChipData={setChipData} />
                            <DefaultButton
                                label={'Limpar'}
                                style={{ width: '100%' }}
                                onClick={handleClearChips}
                            />
                            {/* <Input label="Analisar" style={{ width: '100%', marginTop: 10 }}/> */}
                        </div>
                        <div style={{ width: '80%' }}>
                            <AlphabetTable word={'teste'}/>
                        </div>
                    </div>

                </Box>
            </Container>
        </React.Fragment>
    );
};

export default Header;
