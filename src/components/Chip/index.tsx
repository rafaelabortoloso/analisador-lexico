import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';

interface ChipData {
    key: number;
    label: string;
  }

interface ChipsArrayProps {
    chipData: ChipData[];
    setChipData: React.Dispatch<React.SetStateAction<ChipData[]>>;
  }

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      maxHeight: '60%',
      minHeight: 20,
      overflowY: 'auto',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      listStyle: 'none',
      padding: theme.spacing(0.5),
      marginBlock: 10,
      backgroundColor: 'rgba(63, 81, 181, 0.5)',
    },
    chip: {
      margin: theme.spacing(0.5),
    },
  }),
);

const ChipsArray: React.FC<ChipsArrayProps> = ({ chipData, setChipData }) => {
    const classes = useStyles();

    const handleDelete = (chipToDelete: ChipData) => () => {
      setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    };
  
    return (
      <Paper component="ul" className={classes.root}>
        {chipData.map((data) => (
          <li key={data.key}>
            <Chip
              label={data.label}
              onDelete={handleDelete(data)}
              className={classes.chip}
            />
          </li>
        ))}
      </Paper>
    );
}

export default ChipsArray;