import { useState } from "react";

import LibraryMusic from "@mui/icons-material/LibraryMusic";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {
    CANCEL,
    CONFIRM_LOGOUT,
    DJ_CAPS,
    LOGOUT,
    LOGOUT_ACCOUNT_QUESTION,
    SOCIETY_CAPS,
} from "../constants/strings";
import { useAuth } from "../context/AuthContext";
import { useUrlBuilder } from "../context/NavigationContext";
import { DialogHelper } from "../helpers/DialogHelper";
import { GradientText } from "../theme/theme";
import { AccountLoginButtons, UserLoggedInButtons } from "./AccountButtons";
import { HEADER_NAVIGATION_TABS } from "./navigation/NavigationConfig";

export const Header = () => {
    const { navigate } = useUrlBuilder();
    const { user, logout } = useAuth();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

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

    return (
        <>
            <AppBar position="fixed" elevation={0}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
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
                                    letterSpacing: ".1rem",
                                    color: "inherit",
                                    textDecoration: "none",
                                }}
                            >
                                {DJ_CAPS}
                                <GradientText>{SOCIETY_CAPS}</GradientText>
                            </Typography>
                        </Stack>
                        <Stack direction="row" flexGrow={1}>
                            {HEADER_NAVIGATION_TABS.map((item) => (
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
                        </Stack>
                        <Stack
                            direction="row"
                            flexGrow={0}
                            alignItems="center"
                            spacing={2}
                        >
                            {user ? (
                                <UserLoggedInButtons
                                    setDialogOpen={setDialogOpen}
                                />
                            ) : (
                                <AccountLoginButtons />
                            )}
                        </Stack>
                    </Toolbar>
                </Container>
            </AppBar>
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
