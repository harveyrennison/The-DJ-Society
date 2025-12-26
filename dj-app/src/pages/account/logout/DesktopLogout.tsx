import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";

// 🔑 Import the session management handler
import { Logout } from "@mui/icons-material";
import { LOG_OUT } from "../../strings";

export interface DesktopLogoutMenuItemProps {
    onClose: () => void;
    onOpenConfirm: () => void;
}

export const DesktopLogoutMenuItem = ({
    onClose,
    onOpenConfirm,
}: DesktopLogoutMenuItemProps) => {
    const handleMenuClick = () => {
        onClose(); // Close the main user menu
        onOpenConfirm(); // Open the confirmation dialog
    };

    return (
        <MenuItem onClick={handleMenuClick}>
            <ListItemIcon>
                <Logout fontSize="small" color="error" />
            </ListItemIcon>
            <ListItemText sx={{ color: "error.main" }}>{LOG_OUT}</ListItemText>
        </MenuItem>
    );
};
