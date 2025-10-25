import React, { useState, ChangeEvent, FormEvent, SyntheticEvent, useEffect } from 'react';
import axios from 'axios';
import {
    Button,
    Snackbar,
    Alert,
    TextField,
    Box,
    Typography,
    IconButton,
    InputAdornment,
    Paper,
    AlertColor,
    CircularProgress
} from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoginResponse, RegisterResponse } from "../types/login";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../authentication/authContext';
import { validateEmail, validateUsername, validatePassword } from '../utils/validation';

const Register = () => {
    const navigate = useNavigate();
    const { login } = useAuth(); // Use the login function from AuthContext

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });

    const [touched, setTouched] = useState({
        email: false,
        password: false
    });

    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [snackOpen, setSnackOpen] = useState(false);
    const [snackMessage, setSnackMessage] = useState("");
    const [severity, setSeverity] = useState<AlertColor>("success");

    const handleSnackClose = (event?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;
        setSnackOpen(false);
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };


    // Run validation whenever form data changes
    useEffect(() => {
        const newErrors = { email: '', password: '' };

        if (touched.email && !validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (touched.password && !validatePassword(formData.password)) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
    }, [formData, touched]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleBlur = (field: 'email' | 'password') => {
        setTouched(prev => ({
            ...prev,
            [field]: true
        }));
    };

    const validateForm = (): boolean => {
        // Mark all fields as touched to show any errors
        setTouched({
            email: true,
            password: true
        });

        // Return whether the form is valid
        return validateEmail(formData.email) && validatePassword(formData.password);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        let userId: string;
        let token: string;

        try {
            // Create the request payload matching the backend expectations
            const userData = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password
            };

            // Step 1: Register the user
            const registerResponse = await axios.post<RegisterResponse>(
                'http://localhost:4941/api/v1/users/register',
                userData
            );

            // Handle successful registration
            if (registerResponse.status === 201 && registerResponse.data.userId) {
                userId = registerResponse.data.userId;

                // Step 2: Auto-login for everyone after registration
                try {
                    const loginResponse = await axios.post<LoginResponse>(
                        'http://localhost:4941/api/v1/users/login',
                        {
                            email: formData.email,
                            password: formData.password
                        }
                    );

                    token = loginResponse.data.token;
                    // Successfully registered and logged in - use AuthContext login function
                    login(token, userId);

                } catch (loginError) {
                    console.error("Auto-login failed:", loginError);
                    setSeverity("warning");
                    setSnackMessage("Registration successful, but auto-login failed. Please login manually.");
                }

                setSnackOpen(true);

                // Redirect to games page after successful registration
                setTimeout(() => {
                    navigate('/games');
                }, 1500);
            }
        } catch (error: any) {
            // Handle specific error cases based on backend responses
            if (error.response) {
                if (error.response.status === 403) {
                    setSeverity("error");
                    setSnackMessage("Email address is already in use. Please try another email.");
                } else if (error.response.status === 400) {
                    setSeverity("error");
                    setSnackMessage(error.response.statusText || "Invalid registration data. Please check your inputs.");
                } else {
                    setSeverity("error");
                    setSnackMessage("Registration failed. Please try again later.");
                }
            } else {
                setSeverity("error");
                setSnackMessage("Unable to connect to the server. Please check your internet connection.");
            }
            setSnackOpen(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <Snackbar
                autoHideDuration={6000}
                open={snackOpen}
                onClose={handleSnackClose}
                key={snackMessage}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <Alert
                    onClose={handleSnackClose}
                    severity={severity}
                    sx={{ width: '100%' }}
                    variant="filled"
                >
                    {snackMessage}
                </Alert>
            </Snackbar>

            <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 500 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
                    Create an Account
                </Typography>

                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                    <TextField
                        name="firstName"
                        label="First Name"
                        variant="outlined"
                        fullWidth
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        sx={{ mb: 1 }}
                    />

                    <TextField
                        name="lastName"
                        label="Last Name"
                        variant="outlined"
                        fullWidth
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        sx={{ mb: 1 }}
                    />

                    <TextField
                        name="email"
                        label="Email Address"
                        variant="outlined"
                        fullWidth
                        required
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={() => handleBlur('email')}
                        placeholder="example@domain.com"
                        error={!!errors.email}
                        helperText={errors.email}
                        sx={{ mb: 1 }}
                    />

                    <TextField
                        name="password"
                        label="Password"
                        variant="outlined"
                        fullWidth
                        required
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleChange}
                        onBlur={() => handleBlur('password')}
                        error={!!errors.password}
                        helperText={errors.password || "Must be at least 6 characters"}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleTogglePasswordVisibility}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        sx={{ mb: 1 }}
                    />
            


                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        size="large"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
                                Registering...
                            </>
                        ) : (
                            'Register'
                        )}
                    </Button>

                    <Box textAlign="center" mt={2}>
                        <Typography variant="body2">
                            Already have an account?{' '}
                            <Button
                                color="primary"
                                component="a"
                                href="/login"
                            >
                                Login
                            </Button>
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

export default Register;