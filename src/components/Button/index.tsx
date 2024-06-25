import React from "react";
import { Button } from "@material-ui/core";

interface ButtonProps {
    label: string;
    style?: React.CSSProperties;
    onClick: () => void;
}

const DefaultButton: React.FC<ButtonProps> = ({ label, style, onClick }) => {
    return <Button style={style} variant="contained" color="primary" onClick={onClick}>{label}</Button>

}

export default DefaultButton;