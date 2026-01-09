import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useState } from "react";
import { useUrlBuilder } from "./context/NavigationContext";
import { DJS } from "./data/mockData";
import type { DJ } from "./interfaces/userTypes";
import { Header } from "./layout/Header";
import { AboutPage } from "./pages/about/AboutPage";
import { LoginPage } from "./pages/account/LoginPage";
import { RegisterPage } from "./pages/account/RegisterPage";
import { DirectoryPage } from "./pages/Directory";
import { HomePage } from "./pages/home/HomePage";
import { ProfilePage } from "./pages/profile/ProfilePage";
import { SettingsPage } from "./pages/settings/SettingsPage";
import { theme } from "./theme/theme";

export const App = () => {
    const { currentPage, navigate } = useUrlBuilder();
    const [selectedDj, setSelectedDj] = useState<DJ | null>(DJS[0]);

    const handleViewDj = (dj: DJ) => {
        setSelectedDj(dj);
        navigate("dj-profile");
    };

    const renderPage = () => {
        if (currentPage === "dj-profile" && !selectedDj) {
            return <DirectoryPage onSelectDj={handleViewDj} />;
        }

        switch (currentPage) {
            case "home":
                return <HomePage />;
            case "about":
                return <AboutPage />;
            case "directory":
                return <DirectoryPage onSelectDj={handleViewDj} />;
            case "dj-profile":
                return <ProfilePage dj={selectedDj!} isOwner={false} />;
            case "profile":
                const myProfile: DJ = { ...DJS[0], name: "ZENIATH" };
                return <ProfilePage dj={myProfile} isOwner={true} />;
            case "settings":
                return <SettingsPage />;
            case "login":
                return <LoginPage />;
            case "signup":
                return <RegisterPage />;
            default:
                return <HomePage />;
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Header />
                <Toolbar />
                {renderPage()}
            </ThemeProvider>
        </LocalizationProvider>
    );
};

export default App;
