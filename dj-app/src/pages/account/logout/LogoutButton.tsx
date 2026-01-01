import LogoutIcon from "@mui/icons-material/Logout";
import { Button, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext"; 
import { LOGGING_OUT_LOADING, LOGOUT } from "../../strings";

interface LogoutButtonProps {
    onLogoutSuccess?: () => void;
    fullWidth?: boolean;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({
    onLogoutSuccess,
    fullWidth,
}) => {
    const { logout } = useAuth();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogoutClick = async () => {
        setIsLoggingOut(true);
        try {
            await logout();
            if (onLogoutSuccess) onLogoutSuccess();
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            setIsLoggingOut(false);
        }
    };

    return (
        <Button
            variant="outlined"
            color="error"
            onClick={handleLogoutClick}
            disabled={isLoggingOut}
            startIcon={
                isLoggingOut ? <CircularProgress size={20} /> : <LogoutIcon />
            }
            fullWidth={fullWidth}
        >
            {isLoggingOut ? LOGGING_OUT_LOADING : LOGOUT}
        </Button>
    );
};
