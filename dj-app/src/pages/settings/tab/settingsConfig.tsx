import Lock from "@mui/icons-material/Lock";
import Notifications from "@mui/icons-material/Notifications";
import Person from "@mui/icons-material/Person";
import type { SettingsMenuItem } from "./settingsTypes";

export const SETTINGS_MENU_ITEMS: SettingsMenuItem[] = [
    { label: "General", icon: <Person />, value: "general" },
    { label: "Security", icon: <Lock />, value: "security" },
    { label: "Notifications", icon: <Notifications />, value: "notifications" },
];
