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
import { AccountSection } from '../theme/theme';

import type { AuthPageProps } from "../interfaces/props";
// ⚠️ Corrected import path for API Service
import { LoginUser } from '../session/accountServices'; 
// 🔑 Import the session manager utility
import { saveSession } from '../session/manager'; 


export const LoginPage: React.FC<AuthPageProps> = ({ onLogin, onSwitch }) => {
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

            if (data.token && data.userId) {
                // 🔑 STEP 1: Persist the session data to localStorage
                saveSession(data);
                
                // 🔑 STEP 2: Update the application's in-memory state
                onLogin(data.token, data.userId.toString());
            } else {
                setFormError("Login successful, but received incomplete data.");
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
                        Enter your credentials to access your account
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
                                InputProps={{
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