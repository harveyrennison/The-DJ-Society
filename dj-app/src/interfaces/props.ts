import type { Page } from "./types";
import type { User, DJ } from "./userTypes";


export interface HeaderProps {
    user: User | null;
    onNavigate: (page: Page) => void;
    onLogout: () => void;
}

export interface HomePageProps {
    onNavigate: (page: Page) => void;
}

export interface DirectoryPageProps {
    onSelectDj: (dj: DJ) => void;
}

export interface ProfilePageProps {
    dj: DJ;
    onBack: () => void;
    isOwner: boolean;
}

export interface AuthPageProps {
    onLogin: (token: string, userId: string) => void; // Function to be called on successful login
    onSwitch: () => void;
}

export interface DesktopLogoutMenuItemProps {
    onClose: () => void;
    onOpenConfirm: () => void;
}