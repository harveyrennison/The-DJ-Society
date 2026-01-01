import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useUrlBuilder } from "../../context/NavigationContext";
import { validateAccountForm } from "../../helpers/AccountLoginValidationHelper";
import { PasswordHelper } from "../../helpers/PasswordHelper";
import type { Page } from "../../interfaces/types";
import { AccountSection } from "../../theme/theme";
import {
    EMAIL,
    EMAIL_ADDRESS,
    PASSWORD,
    PASSWORD_CAPATILISED,
} from "../strings";
import { LoginUser } from "./accountServices";

export interface AccountPageProps {
    title: string;
    subheader: string;
    largeButtonText: string;
    smallButtonText: string;
    belowButton: string;
    buttonLoadingText: string;
    navigationPage: Page;
}

export const FormatAccountPage = ({
    title,
    subheader,
    largeButtonText,
    smallButtonText,
    belowButton,
    buttonLoadingText,
    navigationPage,
}: AccountPageProps) => {
    const { navigate } = useUrlBuilder();
    const { login } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [formError, setFormError] = useState("");

    const handleClickShowPassword = () => {
        setShowPassword((show) => !show);
    };

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

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormError("");

        const errorMessage = validateAccountForm(
            formData.email,
            formData.password
        );

        if (errorMessage) {
            setFormError(errorMessage);
            return;
        }

        setIsLoading(true);

        try {
            // 3. Call your backend service to get the tokens
            const data = await LoginUser(formData);

            if (data.firebaseToken && data.userId) {
                await login(data.firebaseToken, data.userId);
                navigate("home");
            } else {
                setFormError("Incomplete data received from server.");
            }
        } catch (error: any) {
            if (error.response?.status === 401) {
                setFormError("Invalid email or password.");
            } else {
                setFormError("An unexpected error occurred. Please try again.");
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
                                type={showPassword ? "text" : "password"}
                                fullWidth
                                variant="outlined"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <PasswordHelper
                                                show={showPassword}
                                                onToggle={
                                                    handleClickShowPassword
                                                }
                                                disabled={isLoading}
                                            />
                                        ),
                                    },
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
                                onClick={() => navigate(navigationPage)}
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
