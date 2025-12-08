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
    Divider,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import type { ChangeEvent, FormEvent } from 'react';
import React, { useCallback, useEffect, useState } from 'react';
import { AccountSection } from '../theme/theme';

import { useAuth } from '../context/AuthContext';
import type { AuthPageProps } from "../interfaces/props";
import { LoginUser } from '../session/accountServices';

declare global {
    interface Window {
        google: any; 
    }
}

export const LoginPage: React.FC<AuthPageProps> = ({ onLogin, onSwitch }) => {
    const { login } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
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

    const handleGoogleCredentialResponse = useCallback(async (response: any) => {
        console.log("Encoded JWT ID token: " + response.credential);
        setFormError(''); 
        setIsLoading(true);

        try {
            // ✅ CRITICAL STEP 1: Send the Google ID Token to your server
            // Your server must verify this token, authenticate/create the user, and respond with a Firebase Custom Token.
            const data = await LoginUser({ googleToken: response.credential }); // ⬅️ Assuming LoginUser handles this new token type

            if (data.firebaseToken) {
                // ✅ CRITICAL STEP 2: Hand the Custom Token to Firebase SDK
                // This signs the user into Firebase Authentication.
                await login(data.firebaseToken);
                
                // ✅ CRITICAL STEP 3: Notify parent app
                onLogin(data.token, data.userId.toString());
            } else {
                setFormError("Google Sign-In successful, but received incomplete data.");
            }
        } catch (error: any) {
            console.error('Google Sign-In failed:', error);
            setFormError('Authentication failed. Please try signing in again.');
        } finally {
            setIsLoading(false);
        }
    }, [login, onLogin]);


    // 2. useEffect to initialize Google Sign-In button on component mount
    useEffect(() => {
        // Check if the Google Identity Services library has loaded
        if (window.google) {
            window.google.accounts.id.initialize({
                // Ensure this client_id matches the one in index.html!
                client_id: "408497169636-svk7c00dqvtp30k03dtj2s1h5f50330m.apps.googleusercontent.com",
                callback: handleGoogleCredentialResponse,
                // Add the context for sign-in, which affects the button text
                context: 'signin' 
            });

            // Render the button into the placeholder div
            window.google.accounts.id.renderButton(
                document.getElementById("google-sign-in-button"),
                { theme: "outline", size: "large", type: "standard", width: "100%", text: "continue_with" } 
            );
        }
        // NOTE: No cleanup needed for the button render itself.
    }, [handleGoogleCredentialResponse]); // Re-run if callback changes
    
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
            const data = await LoginUser(formData);
            if (data.firebaseToken) {
                // 2. CRITICAL STEP: Hand the Custom Token to Firebase SDK
                // This performs the "exchange" you saw in Postman automatically!
                await login(data.firebaseToken);
                
                // 3. Notify parent app (optional, depending on your App structure)
                onLogin(data.token, data.userId.toString());
            } else {
                setFormError("Login successful, but received incomplete data (missing Firebase token).");
            }
        } catch (error: any) {
            if (error.response) {
                if (error.response.status === 401) {
                    setFormError('Invalid email or password.');
                } else if (error.response.status === 400) {
                    setFormError(error.response.data.message || 'Invalid login data. Please check your inputs.');
                } else {
                    setFormError(`Login failed: ${error.response.statusText}. Please try again.`);
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
                        Welcome Back
                    </Typography>
                    <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 4 }}>
                        Sign in to access your account
                    </Typography>
                    <Box sx={{ mb: 3 }}>
                        <div id="google-sign-in-button" style={{ display: 'flex', justifyContent: 'center' }} />
                    </Box>
                    <Divider sx={{ mb: 3 }}>OR</Divider>
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
                                {isLoading ? 'Logging In...' : 'Log In'}
                            </Button>
                        </Stack>
                    </Box>

                    <Box sx={{ mt: 3, textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                            Don't have an account?{' '}
                            <Button size="small" onClick={onSwitch} sx={{ minWidth: 'auto', p: 0 }} disabled={isLoading}>
                                Sign Up
                            </Button>
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </AccountSection>
    );
};