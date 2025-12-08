import {
    Visibility,
    VisibilityOff,
} from '@mui/icons-material';
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import type { ChangeEvent, FormEvent } from 'react';
import React, { useState } from 'react';

import { SIGNUP_LABELS } from '../constants/strings';
import type { AuthPageProps } from "../interfaces/props";
import { RegisterUser } from '../session/accountServices'; // Updated import
import { useAuth } from '../context/AuthContext'; 
import { AccountSection } from '../theme/theme';

export const SignupPage: React.FC<AuthPageProps> = ({ onLogin, onSwitch }) => {
    const { login } = useAuth(); // <--- NEW
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [formError, setFormError] = useState(''); 

    // --- Handlers for UI state ---
    const handleClickShowPassword = () => {
        setShowPassword((show) => !show);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    // --- Handlers for Form state ---
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        if (formError) {
            setFormError('');
        }
    };

    // --- Validation and Submission Logic ---
    const validate = () => {
        if (!formData.email || !formData.password) {
            setFormError('Please enter both email and password.');
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setFormError('Please enter a valid email address.');
            return false;
        }
        if (formData.password.length < 8) {
             setFormError('Password must be at least 8 characters long.');
             return false;
        }
        return true;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormError(''); 

        if (!validate()) {
            return;
        }

        setIsLoading(true);

        try {
            // 1. Register on Backend (Creates DB entry + returns Custom Token)
            const data = await RegisterUser(formData);

            if (data.firebaseToken) {
                // 2. Sign in to Firebase (Exchanges Custom Token for ID Token)
                await login(data.firebaseToken);

                // 3. Notify parent app
                onLogin(data.token, data.userId.toString());
            } else {
                setFormError("Registration successful, but received incomplete data.");
            }
        } catch (error: any) {
            if (error.response) {
                if (error.response.status === 400 || error.response.status === 409) {
                    setFormError(error.response.data.message || 'Registration failed. The email may already be in use.');
                } else {
                    setFormError(`Registration failed: ${error.response.statusText}. Please try again.`);
                }
            } else {
                setFormError("Unable to connect to the server. Please check your internet connection.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AccountSection>
            <Card sx={{ maxWidth: 400, width: '100%', p: 3 }}>
                <CardContent>
                    <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
                        {SIGNUP_LABELS.join}
                    </Typography>
                    <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 4 }}>
                        {SIGNUP_LABELS.portfolio}
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit} noValidate>

                        {formError && (
                            <Alert severity="error" sx={{ mb: 2 }}>
                                {formError}
                            </Alert>
                        )}

                        <Stack spacing={3}>
                            <TextField
                                label="Email Address"
                                name="email"
                                fullWidth
                                variant="outlined"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                disabled={isLoading}
                            />

                            <TextField
                                label="Password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                fullWidth
                                variant="outlined"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                disabled={isLoading}
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            disabled={isLoading}
                                            >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                        )
                                    }
                                }}
                            />

                            <Button
                                type="submit" 
                                variant="contained"
                                size="large"
                                fullWidth
                                disabled={isLoading}
                            >
                                {isLoading ? 'Creating Account...' : SIGNUP_LABELS.create}
                            </Button>
                        </Stack>
                    </Box>

                    <Box sx={{ mt: 3, textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                            {SIGNUP_LABELS.already}{' '}
                            <Button size="small" onClick={onSwitch} sx={{ minWidth: 'auto', p: 0 }} disabled={isLoading}>
                                {SIGNUP_LABELS.login}
                            </Button>
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </AccountSection>
    );
};