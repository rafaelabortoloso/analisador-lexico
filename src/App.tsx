import { useState } from 'react';
import { AppBar, Paper, Toolbar, Box, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, CssBaseline } from '@material-ui/core';
import { createTable } from './scripts/createTable';
import TestWord from './components/TestWord';
import BasicTable from './components/Table';
import Input from './components/Input';
import DefaultButton from './components/Button';
import { Delete } from '@material-ui/icons';
import React from 'react';

interface ListTestWords {
  word: string;
  success: boolean;
}
interface ChipData {
  key: number;
  label: string;
}

function App() {
  const [tokens, setTokens] = useState<string[]>([]);
  const [list, setList] = useState<ListTestWords[]>([]);
  const [word, setWord] = useState<string>('');
  const [text, setText] = useState('');

  const handleAdd = () => {
    if (!tokens.includes(text) && text !== '') {
      const newItem: string = text;
      setTokens([...tokens, newItem]);
      setText('');
    }
  };

  const handleDelete = (id: string) => {
    const updatedItems = tokens.filter((token) => token !== id);
    setTokens(updatedItems);
  };

  let table = createTable(tokens);

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
        <Box>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ width: '20%', marginRight: '20px' }}>
              <Input
                label="Insira uma palavra"
                style={{ width: '100%', marginTop: 10 }}
                value={text}
                onChange={(e) => {
                  const value = e.target.value;
                  const cleanedValue = value.replace(/[^a-z]/gi, '').toLowerCase();
                  setText(cleanedValue);
                }}
              />
              <DefaultButton
                label="Adicionar"
                style={{ marginTop: 10, width: '100%' }}
                onClick={handleAdd}
              />
              <List>
                {tokens.map((token) => (
                  <ListItem key={token}>
                    <ListItemText primary={token} />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDelete(token)}
                      >
                        <Delete />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </div>
            <div style={{ width: '20%', marginRight: '20px' }}>
              <TestWord
                word={word}
                setWord={setWord}
                list={list}
                setList={setList}
              />
            </div>
          </div>
        </Box>
        <Box>
          <Paper>
            <BasicTable
              table={table}
              testWord={word}
              list={list}
              setList={setList}
              setWord={setWord}
            />
          </Paper>
        </Box>
      </div>
    </React.Fragment >
  );
}

export default App;
