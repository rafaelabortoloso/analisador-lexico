import React from "react";
import { TextField } from "@material-ui/core";

interface InputProps {
  label: string;
  style?: React.CSSProperties;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | undefined;
}

const Input: React.FC<InputProps> = ({ label, style, value, onChange, error }) => {

  return <TextField style={style} id="outlined-basic" variant="outlined" label={label} value={value} onChange={onChange} error={!!error} helperText={error} />;
}

export default Input;