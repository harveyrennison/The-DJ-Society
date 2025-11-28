import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import React from 'react';

// 🔑 Import the session management handler
import { Logout } from '@mui/icons-material';
import type { DesktopLogoutMenuItemProps } from '../../interfaces/props';

export const DesktopLogoutMenuItem: React.FC<DesktopLogoutMenuItemProps> = ({ onClose, onOpenConfirm }) => {
    
    const handleMenuClick = () => {
        onClose();         // Close the main user menu
        onOpenConfirm();   // Open the confirmation dialog
    };

    return (
        <MenuItem 
            onClick={handleMenuClick}
        >
            <ListItemIcon>
                <Logout fontSize="small" color="error" />
            </ListItemIcon>
            <ListItemText sx={{ color: 'error.main' }}>Logout</ListItemText>
        </MenuItem>
    );
};