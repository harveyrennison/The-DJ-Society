import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import { alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { GradientText, SettingsSection } from "../../theme/theme";

import {
    MANAGE_ACCOUNT_SETTINGS,
    SAVE_CHANGES,
    SETTINGS,
    USER_SETTINGS,
} from "../strings";
import { GeneralSettings } from "./general/GeneralSettings";
import { NotificationSettings } from "./notifications/NotificationSettings";
import { SecuritySettings } from "./security/SecuritySettings";
import { SETTINGS_MENU_ITEMS } from "./tab/settingsConfig";
import type { SettingsTab } from "./tab/settingsTypes";
export const SettingsPage = () => {
    const [activeSection, setActiveSection] = useState<SettingsTab>("general");

    const renderSection = () => {
        switch (activeSection) {
            case "general":
                return <GeneralSettings />;
            case "security":
                return <SecuritySettings />;
            case "notifications":
                return <NotificationSettings />;
            default:
                return <GeneralSettings />;
        }
    };

    return (
        <SettingsSection>
            <Stack
                direction="row"
                sx={{ height: "calc(100vh - 64px)", overflow: "hidden" }}
            >
                {/* Sidebar */}
                <Box
                    sx={{
                        width: { xs: 0, md: 280 },
                        display: { xs: "none", md: "flex" },
                        flexDirection: "column",
                        bgcolor: "background.paper",
                        borderRight: "1px solid rgba(255, 255, 255, 0.05)",
                        p: 3,
                    }}
                >
                    <Typography
                        variant="h6"
                        mb={3}
                        sx={{
                            px: 2,
                            letterSpacing: 1,
                            textTransform: "uppercase",
                            fontSize: "0.75rem",
                            color: "text.secondary",
                        }}
                    >
                        {USER_SETTINGS}
                    </Typography>
                    <List disablePadding>
                        {SETTINGS_MENU_ITEMS.map((item) => (
                            <ListItemButton
                                key={item.label}
                                selected={activeSection === item.value}
                                onClick={() => setActiveSection(item.value)}
                                sx={{
                                    borderRadius: "12px",
                                    mb: 1,
                                    "&.Mui-selected": {
                                        bgcolor: alpha("#00e5ff", 0.1),
                                        color: "primary.main",
                                    },
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        color:
                                            activeSection === item.value
                                                ? "primary.main"
                                                : "inherit",
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        <Typography fontWeight={600}>
                                            {item.label}
                                        </Typography>
                                    }
                                />
                            </ListItemButton>
                        ))}
                    </List>
                </Box>

                {/* Content */}
                <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
                    <Container maxWidth="md" sx={{ py: 6 }}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="flex-end"
                            mb={6}
                        >
                            <Box>
                                <Typography variant="h3" mb={1}>
                                    <GradientText>{SETTINGS}</GradientText>
                                </Typography>
                                <Typography color="text.secondary">
                                    {MANAGE_ACCOUNT_SETTINGS}
                                </Typography>
                            </Box>
                            <Button
                                variant="contained"
                                size="large"
                                sx={{
                                    px: 4,
                                    display: { xs: "none", sm: "block" },
                                }}
                            >
                                {SAVE_CHANGES}
                            </Button>
                        </Stack>

                        {/* Dynamic Section Rendered Here */}
                        {renderSection()}
                    </Container>
                </Box>
            </Stack>
        </SettingsSection>
    );
};
