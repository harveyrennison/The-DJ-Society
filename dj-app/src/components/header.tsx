import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../authentication/authContext";

// Material UI imports
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Divider,
    useTheme
} from "@mui/material";
import { ManageAccounts, MusicNote } from "@mui/icons-material";

const Header = () => {
    const { token, logout } = useAuth();
    const navigate = useNavigate();
    const [accountMenuAnchor, setAccountMenuAnchor] = useState<HTMLElement | null>(null);
    const theme = useTheme();


    // Handle navigation
    const handleNavigation = (path: string) => {
        navigate(path);
        setAccountMenuAnchor(null);
    };

    // Handle logout
    const handleLogout = () => {
        logout();
        setAccountMenuAnchor(null);
        navigate("/");
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" elevation={4} sx={{background: `linear-gradient(120deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`}}>
                <Toolbar>
                    {/* Left section - Logo and title */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            flex: 1
                        }}
                    >
                        <MusicNote sx={{ mr: 1 }} />
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                fontWeight: 700,
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center"
                            }}
                            onClick={() => handleNavigation("/home")}
                        >
                            The DJ Society
                        </Typography>
                    </Box>

                    {/* Middle section - Navigation links, always centered */}
                    <Box sx={{ display: "flex", justifyContent: "center", flex: 1 }}>
                        <Button
                            color="inherit"
                            onClick={() => handleNavigation("/home")}
                            sx={{ mx: 2 }}
                        >
                            Home
                        </Button>
                    </Box>

                    {/* Right section - Account or Login buttons */}
                    <Box sx={{ display: "flex", justifyContent: "flex-end", flex: 1 }}>
                        {token ? (
                            // Logged in - Show account menu
                            <Box>
                                <IconButton
                                    color="inherit"
                                    onClick={(e) => setAccountMenuAnchor(e.currentTarget)}
                                    size="large"
                                    edge="end"
                                >
                                    <ManageAccounts />
                                </IconButton>
                                <Menu
                                    anchorEl={accountMenuAnchor}
                                    open={Boolean(accountMenuAnchor)}
                                    onClose={() => setAccountMenuAnchor(null)}
                                    anchorOrigin={{
                                        vertical: "bottom",
                                        horizontal: "right",
                                    }}
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                >
                                    <MenuItem onClick={() => handleNavigation("/profile")}>
                                        Profile
                                    </MenuItem>
                                    <MenuItem onClick={() => handleNavigation("/profile/edit")}>
                                        Settings
                                    </MenuItem>
                                    <MenuItem onClick={() => handleNavigation("/my-games")}>
                                        My Games
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                </Menu>
                            </Box>
                        ) : (
                            // Not logged in - Show login/signup buttons
                            <Box>
                                <Button
                                    color="inherit"
                                    onClick={() => handleNavigation("/login")}
                                    sx={{ mr: 1 }}
                                >
                                    Login
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="inherit"
                                    onClick={() => handleNavigation("/register")}
                                    sx={{
                                        borderColor: "white",
                                        "&:hover": { borderColor: "primary.light", bgcolor: "rgba(255, 255, 255, 0.1)" }
                                    }}
                                >
                                    Sign Up
                                </Button>
                            </Box>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;
