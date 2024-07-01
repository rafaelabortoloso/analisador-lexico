import { ChangeEvent } from 'react';
import {
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Input from '../Input';

interface BasicWordProps {
    word: string;
    setWord: (word: string) => void;
    list: ListTestWords[];
    setList: (list: ListTestWords[]) => void;
}

interface ListTestWords {
    word: string;
    success: boolean;
}

export default function TestWord({
    word,
    setWord,
    list,
    setList,
}: BasicWordProps) {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const cleanedValue = value
            .replace(/[^a-z ]/gi, '')
            .replace(/\s{2,}/g, ' ')
            .toLowerCase();
        setWord(cleanedValue);
    };

    const handleDelete = (index: string) => {
        const updatedItems = list.filter((item) => item.word !== index);
        setList(updatedItems);
    };

    return (
        <div>
            <Input
                style={{ width: '100%', marginTop: 10 }}
                label="Valide as palavras"
                value={word}
                onChange={handleChange}
            />
            <List>
                {list.map((item, index) => (
                    <ListItem key={index}>
                        <ListItemText
                            primary={item.word}
                            style={{ color: item.success ? 'green' : 'red' }}
                        />
                        <ListItemSecondaryAction>
                            <IconButton
                                edge="end"
                                aria-label="delete"
                                onClick={() => handleDelete(item.word)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </div>
    );
}
