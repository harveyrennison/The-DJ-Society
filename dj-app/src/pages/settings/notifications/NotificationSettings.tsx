import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import type { User } from "../../../interfaces/userTypes";

interface NotificationSettingsProps {
    user: User;
    onRegisterSave: (fn: () => Promise<void>, allowed: boolean) => void;
    isSavingChanges: boolean;
}

export const NotificationSettings = ({
    user,
    onRegisterSave,
    isSavingChanges,
}: NotificationSettingsProps) => {
    return (
        <Paper
            sx={{
                p: 4,
                bgcolor: "background.paper",
                border: "1px solid rgba(255,255,255,0.05)",
            }}
        >
            <Typography variant="h6" gutterBottom>
                Notifications
            </Typography>
            <Typography color="text.secondary">
                Notification preferences and email settings will appear here.
            </Typography>
        </Paper>
    );
};
