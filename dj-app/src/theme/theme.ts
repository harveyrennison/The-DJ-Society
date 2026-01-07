import { Box } from "@mui/material";
import { alpha, createTheme, styled } from "@mui/material/styles";

// --- Theme Configuration ---
export const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#00e5ff", // Cyan
        },
        secondary: {
            main: "#f50057", // Neon Pink
        },
        background: {
            default: "#0a0b14",
            paper: "#13141f",
        },
        text: {
            primary: "#ffffff",
            secondary: "#b0bec5",
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: { fontWeight: 800 },
        h2: { fontWeight: 700 },
        h3: { fontWeight: 700 },
        h4: { fontWeight: 600 },
        h5: { fontWeight: 600 },
        h6: { fontWeight: 600 },
        button: { textTransform: "none", fontWeight: 600 },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 50,
                },
                containedPrimary: {
                    boxShadow: "0 0 15px rgba(0, 229, 255, 0.4)",
                    "&:hover": {
                        boxShadow: "0 0 25px rgba(0, 229, 255, 0.6)",
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    backgroundImage: "none",
                    backgroundColor: "#1a1c29",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: alpha("#0a0b14", 0.8),
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                },
            },
        },
    },
});

// --- Styled Components ---
export const GradientText = styled("span")(({ theme }) => ({
    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontWeight: "bold",
}));

export const HeroSection = styled(Box)(({ theme }) => ({
    background: `radial-gradient(circle at 10% 20%, ${alpha(
        theme.palette.secondary.main,
        0.15
    )} 0%, transparent 40%),
               radial-gradient(circle at 90% 80%, ${alpha(
                   theme.palette.primary.main,
                   0.15
               )} 0%, transparent 40%)`,
}));

// --- 3. SignupSection (Subtle linear gradient using Primary color) ---
export const AccountSection = styled(Box)(({ theme }) => ({
    background: `linear-gradient(to top left, 
        ${alpha(theme.palette.primary.main, 0.04)}, 
        ${alpha(theme.palette.primary.main, 0.08)} 50%, 
        ${alpha(theme.palette.primary.main, 0.04)}
    )`,
}));

export const SettingsSection = styled(Box)(({ theme }) => ({
    background: `linear-gradient(to top left, 
        ${alpha(theme.palette.primary.main, 0.04)}, 
        ${alpha(theme.palette.primary.main, 0.08)} 50%, 
        ${alpha(theme.palette.primary.main, 0.04)}
    )`,
}));
