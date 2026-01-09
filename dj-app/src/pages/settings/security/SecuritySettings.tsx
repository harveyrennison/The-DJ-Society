import Alert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useEffect, useRef, useState } from "react";
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
    const {
        formData,
        formErrors,
        setFormErrors,
        touched,
        handleChange,
        handleBlur,
        touchAll,
    } = useForm(
        {
            password: "",
            newPassword: "",
        },
        (values) => validateNewPasswordForm(values.password, values.newPassword)
    );

    const handleUpdate = async () => {
        const errors = touchAll();

        if (Object.keys(errors).length > 0) return;

        try {
            console.log("Saving...", formData);
            // Add your API call here
        } catch (err) {
            setFormErrors({ general: "Failed to update password." });
        }
    };

    const saveRef = useRef(handleUpdate);
    useEffect(() => {
        saveRef.current = handleUpdate;
    });

    useEffect(() => {
        onRegisterSave(async () => await saveRef.current());
    }, [onRegisterSave]);

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

            {formErrors.general && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {formErrors.general}
                </Alert>
            )}

            <Stack spacing={3}>
                <TextField
                    fullWidth
                    name="password"
                    label="Current Password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && !!formErrors.password}
                    helperText={touched.password && formErrors.password}
                    disabled={isSavingChanges}
                />

                <TextField
                    fullWidth
                    name="newPassword"
                    label="New Password"
                    type={showPassword ? "text" : "password"}
                    value={formData.newPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.newPassword && !!formErrors.newPassword}
                    helperText={touched.newPassword && formErrors.newPassword}  
                    disabled={isSavingChanges}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <PasswordHelper
                                    show={showPassword}
                                    onToggle={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    disabled={isSavingChanges}
                                />
                            ),
                        },
                    }}
                />
            </Stack>
        </Paper>
    );
};
