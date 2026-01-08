import { ThemeProvider } from "@mui/material/styles";
import { useState } from "react";

import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
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
    const { currentPage, navigate } = useUrlBuilder(); // Hook replaces local state
    const [selectedDj, setSelectedDj] = useState<DJ | null>(DJS[0]); // Default to first DJ for initial state check

    const handleViewDj = (dj: DJ) => {
        setSelectedDj(dj);
        navigate("dj-profile");
    };

    const renderPage = () => {
        // Ensure a DJ is selected before attempting to render ProfilePage
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
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header />
            <Toolbar />
            {renderPage()}
        </ThemeProvider>
    );
};

export default App;
