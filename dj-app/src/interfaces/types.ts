// --- INTERFACES & TYPES ---
import type { User } from "firebase/auth";

export type Page =
    | "home"
    | "about"
    | "directory"
    | "dj-profile"
    | "profile"
    | "settings"
    | "login"
    | "signup"
    | "events"
    | "create";

export interface AuthContextType {
    user: User | null;
    userId: string | null;
    loading: boolean;
    error: boolean;
    login: (token: string, userId: string) => Promise<void>;
    logout: () => Promise<void>;
}
