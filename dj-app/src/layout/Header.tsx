import React, { useState } from "react";

import GraphicEq from "@mui/icons-material/GraphicEq";
import LibraryMusic from "@mui/icons-material/LibraryMusic";
import MenuIcon from "@mui/icons-material/Menu";
import Person from "@mui/icons-material/Person";
import Settings from "@mui/icons-material/Settings";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {
    CANCEL,
    CONFIRM_LOGOUT,
    DJ_CAPS,
    JOIN_NOW,
    LOGIN,
    LOGOUT,
    LOGOUT_ACCOUNT_QUESTION,
    PROFILE,
    SETTINGS,
    SOCIETY_CAPS,
} from "../constants/strings";
import { useAuth } from "../context/AuthContext";
import { useUrlBuilder } from "../context/NavigationContext";
import { DialogHelper } from "../helpers/DialogHelper";
import type { Page } from "../interfaces/types";
import { DesktopLogoutMenuItem } from "../pages/account/logout/DesktopLogout";
import { GradientText } from "../theme/theme";

export const Header = () => {
    const { navigate } = useUrlBuilder();
    const { user, logout } = useAuth();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleMenu = (e: React.MouseEvent<HTMLElement>) =>
        setAnchorEl(e.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
    const handleCloseAndNavigate = (pageNavigation: Page) => {
        handleClose();
        navigate(pageNavigation);
    };

    const handleConfirmLogout = async () => {
        setDialogOpen(false);
        setIsLoggingOut(true);

        try {
            await logout();
            setDialogOpen(false);
            navigate("home");
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            setIsLoggingOut(false);
        }
    };

    const navItems: { label: string; value: Page }[] = [
        { label: "Home", value: "home" },
    ];

    return (
        <>
            <AppBar position="fixed" elevation={0}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        {/* Logo */}
                        <Stack
                            direction="row"
                            alignItems="center"
                            mr={4}
                            sx={{
                                cursor: "pointer",
                            }}
                            onClick={() => navigate("home")}
                        >
                            <LibraryMusic
                                sx={{
                                    color: "primary.main",
                                    fontSize: 32,
                                    mr: 1,
                                }}
                            />
                            <Typography
                                variant="h6"
                                noWrap
                                sx={{
                                    fontFamily: "monospace",
                                    fontWeight: 700,
                                    letterSpacing: ".1rem",
                                    color: "inherit",
                                    textDecoration: "none",
                                }}
                            >
                                {DJ_CAPS}
                                <GradientText>{SOCIETY_CAPS}</GradientText>
                            </Typography>
                        </Stack>
                        <Box flexGrow={1}>
                            {navItems.map((item) => (
                                <Button
                                    key={item.label}
                                    onClick={() => navigate(item.value)}
                                    sx={{
                                        my: 2,
                                        color: "text.secondary",
                                        display: "block",
                                        "&:hover": { color: "primary.main" },
                                    }}
                                >
                                    {item.label}
                                </Button>
                            ))}
                        </Box>
                        <Stack
                            direction="row"
                            flexGrow={0}
                            alignItems="center"
                            spacing={2}
                        >
                            {user ? (
                                <>
                                    <Button
                                        startIcon={<GraphicEq />}
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => navigate("create")}
                                        size="small"
                                    >
                                        Publish Mix
                                    </Button>
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
                                        anchorOrigin={{
                                            vertical: "top",
                                            horizontal: "right",
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal: "right",
                                        }}
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
                                        <MenuItem
                                            onClick={() =>
                                                handleCloseAndNavigate(
                                                    "profile"
                                                )
                                            }
                                        >
                                            <ListItemIcon>
                                                <Person fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText>
                                                {PROFILE}
                                            </ListItemText>
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() =>
                                                handleCloseAndNavigate("settings")
                                            }
                                        >
                                            <ListItemIcon>
                                                <Settings fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText>
                                                {SETTINGS}
                                            </ListItemText>
                                        </MenuItem>
                                        <Divider />
                                        <DesktopLogoutMenuItem
                                            onClose={handleClose}
                                            onOpenConfirm={() =>
                                                setDialogOpen(true)
                                            }
                                        />
                                    </Menu>
                                </>
                            ) : (
                                <>
                                    <Button
                                        color="inherit"
                                        onClick={() => navigate("login")}
                                    >
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
                            )}
                        </Stack>

                        {/* Mobile Menu Icon */}
                        <Box sx={{ display: { xs: "flex", md: "none" } }}>
                            <IconButton
                                size="large"
                                onClick={handleDrawerToggle}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            {/* Mobile Drawer (Using existing LogoutButton logic)
            <Drawer
                variant="temporary"
                anchor="right"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: "block", md: "none" },
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: 250,
                        bgcolor: "background.default",
                    },
                }}
            >
                <Box
                    onClick={handleDrawerToggle}
                    sx={{ textAlign: "center", pt: 2 }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            pr: 2,
                        }}
                    >
                        <IconButton onClick={handleDrawerToggle}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <List>
                        {navItems.map((item) => (
                            <ListItem key={item.label} disablePadding>
                                <Button
                                    fullWidth
                                    onClick={() => navigate(item.value)}
                                    sx={{ py: 1.5, color: "text.primary" }}
                                >
                                    {item.label}
                                </Button>
                            </ListItem>
                        ))}
                        <Divider sx={{ my: 2 }} />
                        {user ? (
                            <>
                                <ListItem disablePadding>
                                    <Button
                                        fullWidth
                                        onClick={() => navigate("profile")}
                                    >
                                        {MY_PROFILE}
                                    </Button>
                                </ListItem>
                                <ListItem disablePadding sx={{ px: 2, pb: 2 }}>
                                    <LogoutButton
                                        onLogoutSuccess={handleDrawerToggle}
                                        fullWidth
                                    />
                                </ListItem>
                            </>
                        ) : (
                            <>
                                <ListItem disablePadding>
                                    <Button
                                        fullWidth
                                        onClick={() => navigate("login")}
                                    >
                                        {LOGIN}
                                    </Button>
                                </ListItem>
                                <ListItem disablePadding>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        onClick={() => navigate("signup")}
                                    >
                                        {JOIN_NOW}
                                    </Button>
                                </ListItem>
                            </>
                        )}
                    </List>
                </Box>
            </Drawer> */}
            <DialogHelper
                open={dialogOpen}
                disabled={isLoggingOut}
                dialogTitle={CONFIRM_LOGOUT}
                dialogContent={LOGOUT_ACCOUNT_QUESTION}
                buttonLeftText={CANCEL}
                buttonRightText={LOGOUT}
                buttonLeftPress={() => setDialogOpen(false)}
                buttonRightPress={handleConfirmLogout}
            />
        </>
    );
};
