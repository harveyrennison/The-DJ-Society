import Person from "@mui/icons-material/Person";
import Settings from "@mui/icons-material/Settings";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { JOIN_NOW, LOGIN, PROFILE, SETTINGS } from "../constants/strings";
import { useUrlBuilder } from "../context/NavigationContext";
import type { Page } from "../interfaces/types";
import { DesktopLogoutMenuItem } from "../pages/account/logout/DesktopLogout";

export const AccountLoginButtons = () => {
    const { navigate } = useUrlBuilder();
    return (
        <>
            <Button color="inherit" onClick={() => navigate("login")}>
                {LOGIN}
            </Button>
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("signup")}
            >
                {JOIN_NOW}
            </Button>
        </>
    );
};

export const UserLoggedInButtons = ({
    setDialogOpen,
}: {
    setDialogOpen: (open: boolean) => void;
}) => {
    const { navigate } = useUrlBuilder();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenu = (e: React.MouseEvent<HTMLElement>) =>
        setAnchorEl(e.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const handleCloseAndNavigate = (page: Page) => {
        handleClose();
        navigate(page);
    };
    return (
        <>
            <IconButton
                onClick={handleMenu}
                sx={{
                    p: 0,
                    border: "2px solid transparent",
                    "&:hover": {
                        border: "2px solid #00e5ff",
                    },
                }}
            >
                <Avatar />
            </IconButton>
            <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        sx: {
                            bgcolor: "background.paper",
                            border: "1px solid rgba(255,255,255,0.1)",
                        },
                    },
                }}
            >
                <MenuItem onClick={() => handleCloseAndNavigate("profile")}>
                    <ListItemIcon>
                        <Person fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>{PROFILE}</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => handleCloseAndNavigate("settings")}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>{SETTINGS}</ListItemText>
                </MenuItem>
                <Divider />
                <DesktopLogoutMenuItem
                    onClose={handleClose}
                    onOpenConfirm={() => setDialogOpen(true)}
                />
            </Menu>
        </>
    );
};
