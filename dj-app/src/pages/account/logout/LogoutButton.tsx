import LogoutIcon from "@mui/icons-material/Logout";
import { Button, CircularProgress } from "@mui/material";
import React, { useState } from "react";

// 🔑 Import the session management handler
import { handleClientSideLogout } from "../../../session/manager";
import { LOG_OUT, LOGGING_OUT_LOADING } from "../../strings";

interface LogoutButtonProps {
    // Function to run after successful client-side cleanup (e.g., redirect or update state)
    onLogoutSuccess: () => void;
    // New: Allow passing fullWidth property for mobile integration
    fullWidth?: boolean;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({
    onLogoutSuccess,
    fullWidth,
}) => {
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogoutClick = async () => {
        setIsLoggingOut(true);
        try {
            // This function handles the server call (LogoutUser) and local storage cleanup
            await handleClientSideLogout();

            // Run the callback function provided by the parent (e.g., set user state to null)
            onLogoutSuccess();
        } catch (error) {
            console.error("An unexpected error occurred during logout:", error);
            // Even if there's an unexpected error, clear client state
            onLogoutSuccess();
        } finally {
            setIsLoggingOut(false);
        }
    };

    return (
        <Button
            variant="outlined"
            color="inherit"
            onClick={handleLogoutClick}
            disabled={isLoggingOut}
            startIcon={
                isLoggingOut ? (
                    <CircularProgress size={20} color="inherit" />
                ) : (
                    <LogoutIcon />
                )
            }
            fullWidth={fullWidth}
        >
            {isLoggingOut ? LOGGING_OUT_LOADING : LOG_OUT}
        </Button>
    );
};
