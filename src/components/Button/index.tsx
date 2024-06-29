import React from "react";
import { Button } from "@material-ui/core";

interface ButtonProps {
    label: string;
    style?: React.CSSProperties;
    onClick: () => void;
    disabled?: boolean | undefined;
}

const DefaultButton: React.FC<ButtonProps> = ({ label, style, onClick, disabled }) => {
    return <Button style={style} variant="contained" color="primary" onClick={onClick} disabled={disabled} >{label} </Button>

}

export default DefaultButton;