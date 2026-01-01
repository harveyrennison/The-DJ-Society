import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { PasswordHelper } from "../../../helpers/PasswordHelper";
import { SECURITY, UPDATE_PASSWORD_MESSAGE } from "../../strings";

export const SecuritySettings = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <Paper
            sx={{
                p: 4,
                bgcolor: "background.paper",
                border: "1px solid rgba(255,255,255,0.05)",
            }}
        >
            <Typography variant="h6" sx={{ mb: 1 }}>
                {SECURITY}
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
                {UPDATE_PASSWORD_MESSAGE}
            </Typography>
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
