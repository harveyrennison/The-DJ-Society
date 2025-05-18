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
import { LoginResponse } from "../types/login";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../authentication/authContext'; // Import useAuth hook

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth(); // Use the login function from AuthContext

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
        form: ''
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

    // Check if user is already logged in
    useEffect(() => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        if (token && userId) {
            // User is already logged in, redirect to games page
            navigate('/games');
        }
    }, [navigate]);

    const handleSnackClose = (event?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;
        setSnackOpen(false);
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Run validation whenever form data changes
    useEffect(() => {
        const newErrors = {
            email: '',
            password: '',
            form: errors.form // Preserve form-level errors
        };

        if (touched.email && !formData.email) {
            newErrors.email = 'Email is required';
        } else if (touched.email && !validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (touched.password && !formData.password) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
    }, [formData, touched, errors.form]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // Clear form-level error when user starts typing
        if (errors.form) {
            setErrors(prev => ({
                ...prev,
                form: ''
            }));
        }
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

        // Check if form is valid
        const isEmailValid = formData.email && validateEmail(formData.email);
        const isPasswordValid = formData.password.length > 0;

        return !(!isEmailValid || !isPasswordValid);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await axios.post<LoginResponse>('http://localhost:4941/api/v1/users/login', {
                email: formData.email,
                password: formData.password
            });

            if (response.status === 200 && response.data.token) {
                login(response.data.token, response.data.userId.toString());

                // Show success message
                setSeverity("success");
                setSnackMessage("Login successful!");
                setSnackOpen(true);

                // Redirect to the games page
                setTimeout(() => {
                    navigate('/games');
                }, 1000);
            }
        } catch (error: any) {
            // Handle specific error cases based on backend responses
            if (error.response) {
                if (error.response.status === 401) {
                    setErrors(prev => ({
                        ...prev,
                        form: 'Invalid email or password'
                    }));
                } else if (error.response.status === 400) {
                    setSeverity("error");
                    setSnackMessage(error.response.statusText || "Invalid login data. Please check your inputs.");
                    setSnackOpen(true);
                } else {
                    setSeverity("error");
                    setSnackMessage("Login failed. Please try again later.");
                    setSnackOpen(true);
                }
            } else {
                setSeverity("error");
                setSnackMessage("Unable to connect to the server. Please check your internet connection.");
                setSnackOpen(true);
            }
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
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
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
                    Login
                </Typography>

                {errors.form && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {errors.form}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
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
                        helperText={errors.password}
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
                                Logging in...
                            </>
                        ) : (
                            'Log In'
                        )}
                    </Button>

                    <Box textAlign="center" mt={2}>
                        <Typography variant="body2">
                            Don't have an account?{' '}
                            <Button
                                color="primary"
                                component="a"
                                href="/register"
                            >
                                Register
                            </Button>
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

export default Login;