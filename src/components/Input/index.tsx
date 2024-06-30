import React from "react";
import { TextField } from "@material-ui/core";

interface InputProps {
  label: string;
  style?: React.CSSProperties;
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  error?: string | undefined;
  name?: string | undefined;
}

const Input: React.FC<InputProps> = ({ label, style, value, onChange, error, onKeyDown, name }) => {

  return <TextField
    name={name}
    style={style}
    id="outlined-basic"
    variant="outlined"
    label={label}
    value={value}
    onChange={onChange}
    onKeyDown={onKeyDown}
    error={!!error}
    helperText={error}
  />;
}

export default Input;