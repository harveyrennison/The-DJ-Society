import Alert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { PasswordHelper } from "../../../helpers/PasswordHelper";
import { validateNewPasswordForm } from "../../../helpers/validation";
import { useForm } from "../../../hooks/useForm";
import { SECURITY, UPDATE_PASSWORD_MESSAGE } from "../../strings";

interface SecuritySettingsProps {
    onRegisterSave: (fn: () => Promise<void>) => void;
    isSavingChanges: boolean;
}

export const SecuritySettings = ({
    onRegisterSave,
    isSavingChanges,
}: SecuritySettingsProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const { formData, formError, setFormError, handleChange } = useForm({
        password: "",
        newPassword: "",
    });

    const handleUpdate = async () => {
        setFormError("");

        const error = validateNewPasswordForm(
            formData.password,
            formData.newPassword
        );

        if (error) {
            setFormError(error);
            return;
        }

        try {
            console.log("Saving Security Settings...", formData);
            // API Call here
        } catch (err) {
            setFormError("Failed to update password.");
        }
    };

    useEffect(() => {
        onRegisterSave(() => handleUpdate());
    }, [formData]);

    return (
        <Paper
            sx={{
                p: 4,
                bgcolor: "background.paper",
                border: "1px solid rgba(255,255,255,0.05)",
            }}
        >
            <Typography variant="h6" mb={1}>
                {SECURITY}
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
                {UPDATE_PASSWORD_MESSAGE}
            </Typography>
            {formError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {formError}
                </Alert>
            )}
            <Stack spacing={3}>
                <TextField
                    fullWidth
                    label="New Password"
                    type={showPassword ? "text" : "password"}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <PasswordHelper
                                    show={showPassword}
                                    onToggle={() =>
                                        setShowPassword(!showPassword)
                                    }
                                />
                            ),
                        },
                    }}
                />
                <TextField
                    fullWidth
                    label="Confirm New Password"
                    type={showPassword ? "text" : "password"}
                />
            </Stack>
        </Paper>
    );
};
