import type { Page } from "./types";
import type { User, DJ, DjProfileFormData } from "./userTypes";

export type NavState = { [key: string]: any };

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
    onLogin: (token: string, userId: string, navState?: NavState) => void; // Function to be called on successful login
    onSwitch: () => void;
}

export interface DesktopLogoutMenuItemProps {
    onClose: () => void;
    onOpenConfirm: () => void;
}

export interface LogoutConfirmationProps {
    confirmOpen: boolean;
    handleConfirmClose: () => void;
    handleConfirmLogout: () => void;
    isLoggingOut: boolean;
}

export interface DjProfileBuilderProps {
    onProfileComplete: (profileData: DjProfileFormData) => void;
}