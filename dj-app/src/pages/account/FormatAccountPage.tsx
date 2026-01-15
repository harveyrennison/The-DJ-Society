import GoogleIcon from "@mui/icons-material/Google";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { signInWithPopup } from "firebase/auth";
import type { FormEvent } from "react";
import { useCallback, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useUrlBuilder } from "../../context/NavigationContext";
import { PasswordHelper } from "../../helpers/PasswordHelper";
import { validateAccountForm } from "../../helpers/validation";
import { useForm } from "../../hooks/useForm";
import type { Page } from "../../interfaces/types";
import { AccountSection } from "../../theme/theme";
import { auth, googleProvider } from "../../utils/firebase";
import {
    CONTINUE_WITH_GOOGLE,
    EMAIL,
    EMAIL_ADDRESS,
    OR,
    PASSWORD,
    PASSWORD_CAPATILISED,
} from "../strings";
import { GoogleLoginUser, LoginUser, RegisterUser } from "./accountServices";

export interface AccountPageProps {
    title: string;
    subheader: string;
    largeButtonText: string;
    smallButtonText: string;
    belowButton: string;
    buttonLoadingText: string;
    navigationPage: Page;
    isRegister?: boolean;
}

export const FormatAccountPage = ({
    title,
    subheader,
    largeButtonText,
    smallButtonText,
    belowButton,
    buttonLoadingText,
    navigationPage,
    isRegister = false,
}: AccountPageProps) => {
    const { navigate } = useUrlBuilder();
    const { login } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const validate = useCallback(
        (values: { email: string; password: string }) =>
            validateAccountForm(values.email, values.password),
        []
    );

    const {
        formData,
        formErrors,
        setFormErrors,
        handleChange,
        handleBlur,
        touched,
        touchAll,
    } = useForm({ email: "", password: "" }, validate);

    const handleClickShowPassword = () => {
        setShowPassword((show) => !show);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errors = touchAll();

        if (Object.keys(errors).length > 0) return;

        setIsLoading(true);

        try {
            const data = isRegister
                ? await RegisterUser(formData)
                : await LoginUser(formData);

            if (data.firebaseToken && data.userId) {
                await login(data.firebaseToken, data.userId);
                navigate("home");
            } else {
                setFormErrors({
                    general: "Incomplete data received from server.",
                });
            }
        } catch (error: any) {
            if (error.response?.status === 401) {
                setFormErrors({ general: "Invalid email or password." });
            } else {
                setFormErrors({
                    general: "An unexpected error occurred. Please try again.",
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const idToken = await result.user.getIdToken();

            const data = await GoogleLoginUser(idToken);

            if (data.firebaseToken && data.userId) {
                await login(data.firebaseToken, data.userId);
                navigate("home");
            } else {
                setFormErrors({
                    general: "Incomplete data received from server.",
                });
            }
        } catch (error: any) {
            console.error("Google sign-in error:", error);
            setFormErrors({
                general: "Google sign-in failed. Please try again.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    /* ... existing logic and state ... */

    return (
        <AccountSection>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                minHeight="91vh"
            >
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
                            mb={3}
                        >
                            {subheader}
                        </Typography>
                        <Button
                            variant="outlined"
                            size="large"
                            fullWidth
                            onClick={handleGoogleSignIn}
                            disabled={isLoading}
                            startIcon={<GoogleIcon />} // 2. Added Google Icon
                            sx={{
                                borderColor: "#4285f4",
                                color: "#4285f4",
                                mb: 3, // Added margin bottom
                                "&:hover": {
                                    borderColor: "#3367d6",
                                    backgroundColor: "#f8f9fa",
                                },
                            }}
                        >
                            {CONTINUE_WITH_GOOGLE}
                        </Button>

                        <Divider sx={{ mb: 3 }}>
                            <Typography variant="body2" color="text.secondary">
                                {OR}
                            </Typography>
                        </Divider>

                        {/* 3. Email/Password Form now follows the divider */}
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            noValidate
                        >
                            {formErrors.general && (
                                <Alert severity="error" sx={{ mb: 2 }}>
                                    {formErrors.general}
                                </Alert>
                            )}

                            <Stack spacing={3}>
                                <TextField
                                    label={EMAIL_ADDRESS}
                                    name={EMAIL}
                                    fullWidth
                                    variant="outlined"
                                    value={formData.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required
                                    error={touched.email && !!formErrors.email}
                                    helperText={
                                        touched.email && formErrors.email
                                    }
                                />

                                <TextField
                                    label={PASSWORD_CAPATILISED}
                                    name={PASSWORD}
                                    type={showPassword ? "text" : "password"}
                                    fullWidth
                                    variant="outlined"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={
                                        touched.password &&
                                        !!formErrors.password
                                    }
                                    helperText={
                                        touched.password && formErrors.password
                                    }
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
            </Box>
        </AccountSection>
    );
};
