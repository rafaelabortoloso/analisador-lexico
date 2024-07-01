import React, { ChangeEvent } from "react";
import { TextField } from "@material-ui/core";

interface InputProps {
  label: string;
  style?: React.CSSProperties;
  value: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ label, style, value, onChange }) => {

  return <TextField
    style={style}
    id="outlined-basic"
    variant="outlined"
    label={label}
    value={value}
    onChange={onChange}
  />;
}

export default Input;