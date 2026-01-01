import type { ReactNode } from "react";

export type SettingsTab = "general" | "security" | "notifications";

export interface SettingsMenuItem {
    label: string;
    icon: ReactNode;
    value: SettingsTab;
}

export interface SettingsState {
    activeSection: SettingsTab;
    showPassword: boolean;
}