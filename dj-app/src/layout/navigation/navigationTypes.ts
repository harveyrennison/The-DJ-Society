export type NavigationTab = "home" | "about";

export interface HeaderNavigation {
    label: string;
    value: NavigationTab;
}

export interface NavigationState {
    activeSection: NavigationTab;
}
