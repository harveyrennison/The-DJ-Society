import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";

export interface ToggleProps {
    show: boolean;
    onToggle: () => void;
    disabled?: boolean;
}

export const PasswordHelper = ({ show, onToggle, disabled }: ToggleProps) => (
    <InputAdornment position="end">
        <IconButton
            onClick={onToggle}
            onMouseDown={(e) => e.preventDefault()}
            disabled={disabled}
            edge="end"
        >
            {show ? <VisibilityOff /> : <Visibility />}
        </IconButton>
    </InputAdornment>
);
