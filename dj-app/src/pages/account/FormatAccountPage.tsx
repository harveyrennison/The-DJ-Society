import { Visibility, VisibilityOff } from "@mui/icons-material";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import type { ChangeEvent, FormEvent } from "react";
import React, { useState } from "react";
import { saveSession } from "../../session/manager";
import { AccountSection } from "../../theme/theme";
import {
    EMAIL,
    EMAIL_ADDRESS,
    PASSWORD,
    PASSWORD_CAPATILISED,
} from "../strings";
import { LoginUser } from "./accountServices";

export interface AccountPageNavigationProps {
    onLogin: (token: string, userId: string) => void; // Function to be called on successful login
    onSwitch: () => void;
}

export interface AccountPageProps extends AccountPageNavigationProps {
    title: string;
    subheader: string;
    largeButtonText: string;
    smallButtonText: string;
    belowButton: string;
    buttonLoadingText: string;
}

export const FormatAccountPage = ({
    onLogin,
    onSwitch,
    title,
    subheader,
    largeButtonText,
    smallButtonText,
    belowButton,
    buttonLoadingText,
}: AccountPageProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [formError, setFormError] = useState("");

    // --- Handlers for UI state ---
    const handleClickShowPassword = () => {
        setShowPassword((show) => !show);
    };

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };

    // --- Handlers for Form state ---
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        if (formError) {
            setFormError("");
        }
    };

    // --- Validation and Submission Logic ---
    const validate = () => {
        if (!formData.email || !formData.password) {
            setFormError("Please enter both email and password.");
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setFormError("Please enter a valid email address.");
            return false;
        }
        if (formData.password.length < 8) {
            setFormError("Password must be at least 8 characters long.");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormError("");

        if (!validate()) {
            return;
        }

        setIsLoading(true);

        try {
            const data = await LoginUser(formData);
            if (data.token && data.userId) {
                saveSession(data);
                onLogin(data.token, data.userId);
            } else {
                setFormError("Something went wrong. Received incomplete data.");
            }
        } catch (error: any) {
            if (error.response) {
                if (error.response.status === 401) {
                    setFormError("Invalid email or password.");
                } else if (error.response.status === 400) {
                    setFormError(
                        error.response.data.message ||
                            "Invalid login data. Please check your inputs."
                    );
                } else {
                    setFormError(
                        `Login failed: ${error.response.statusText}. Please try again.`
                    );
                }
            } else {
                setFormError(
                    "Unable to connect to the server. Please check your internet connection."
                );
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AccountSection>
            <Card sx={{ maxWidth: 400, width: "100%", p: 3 }}>
                <CardContent>
                    <Typography
                        variant="h4"
                        align="center"
                        gutterBottom
                        fontWeight="bold"
                    >
                        {title}
                    </Typography>
                    <Typography
                        variant="body2"
                        align="center"
                        color="text.secondary"
                        mb={4}
                    >
                        {subheader}
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit} noValidate>
                        {formError && (
                            <Alert severity="error" sx={{ mb: 2 }}>
                                {formError}
                            </Alert>
                        )}

                        <Stack spacing={3}>
                            <TextField
                                label={EMAIL_ADDRESS}
                                name={EMAIL}
                                fullWidth
                                variant="outlined"
                                type={EMAIL}
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />

                            <TextField
                                label={PASSWORD_CAPATILISED}
                                name={PASSWORD}
                                type={showPassword ? "text" : PASSWORD}
                                fullWidth
                                variant="outlined"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={
                                                    handleClickShowPassword
                                                }
                                                onMouseDown={
                                                    handleMouseDownPassword
                                                }
                                                edge="end"
                                                disabled={isLoading}
                                            >
                                                {showPassword ? (
                                                    <VisibilityOff />
                                                ) : (
                                                    <Visibility />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                fullWidth
                                disabled={isLoading}
                            >
                                {isLoading
                                    ? buttonLoadingText
                                    : largeButtonText}
                            </Button>
                        </Stack>
                    </Box>

                    <Box textAlign="center" mt={3}>
                        <Typography variant="body2" color="text.secondary">
                            {belowButton}
                            <Button
                                size="small"
                                onClick={onSwitch}
                                sx={{ ml: 1, minWidth: "auto", p: 0 }}
                                disabled={isLoading}
                            >
                                {smallButtonText}
                            </Button>
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </AccountSection>
    );
};
