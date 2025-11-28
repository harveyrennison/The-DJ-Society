// --- INTERFACES & TYPES ---
import type { User } from 'firebase/auth';

export type Page = 'home' | 'directory' | 'dj-profile' | 'profile' | 'login' | 'signup' | 'events' | 'create-profile';
export type BuilderStep = 'identity' | 'sound' | 'visuals' | 'complete';


export interface AuthContextType {
    /** The currently authenticated Firebase User object, or null if logged out. */
    user: User | null;
    /** The user's ID string (derived from user.uid) or null. */
    userId: number | null;
    /** True if the authentication state is currently being loaded/initialized. */
    loading: boolean;
    /** Placeholder function for external login flow (relies on Firebase Auth state change). */
    login: (token: string, userId: number) => Promise<void>;
    /** Function to sign out the current user. */
    logout: () => Promise<void>;
}

export interface NavItem {
    /** The display text for the link. */
    label: string;
    /** The internal value/route key, which must be a valid Page type. */
    value: Page;
}