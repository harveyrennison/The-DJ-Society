// --- INTERFACES & TYPES ---
import type { User } from 'firebase/auth';

export type Page = 'home' | 'directory' | 'settings' | 'profile' | 'login' | 'signup' | 'events' | 'profile-builder';
export type BuilderStep = 'identity' | 'sound' | 'visuals' | 'complete';


export interface AuthContextType {
    user: User | null;
    userId: string | null;
    getIdToken: () => Promise<string | null>;
    loading: boolean;
    login: (token: string) => Promise<void>;
    logout: () => Promise<void>;
}

export interface NavItem {
    label: string;
    value: Page;
}