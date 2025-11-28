import LogoutIcon from '@mui/icons-material/Logout';
import { Button, CircularProgress } from '@mui/material';
import React, { useState } from 'react';

// 🔑 Import the session management handler
import { handleClientSideLogout } from '../../session/manager';

interface LogoutButtonProps {
    // Function to run after successful client-side cleanup (e.g., redirect or update state)
    onLogoutSuccess: () => void;
    // New: Allow passing fullWidth property for mobile integration
    fullWidth?: boolean; 
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogoutSuccess, fullWidth }) => {
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogoutClick = async () => {
        setIsLoggingOut(true);
        try {
            await handleClientSideLogout();
            onLogoutSuccess();
        } catch (error) {
            console.error("An unexpected error occurred during logout:", error);
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
            startIcon={isLoggingOut ? <CircularProgress size={20} color="inherit" /> : <LogoutIcon />}
            fullWidth={fullWidth}
        >
            {isLoggingOut ? 'Logging Out...' : 'Logout'}
        </Button>
    );
};