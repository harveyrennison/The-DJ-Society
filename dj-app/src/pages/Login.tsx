import {
    Box,
    Button,
    Card,
    CardContent,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import React from 'react';
import { LoginSection } from '../theme/theme';

import type { AuthPageProps } from '../interfaces/types';

export const LoginPage: React.FC<AuthPageProps> = ({ onLogin, onSwitch }) => {
    return (
        <LoginSection>
            <Card sx={{ maxWidth: 400, width: '100%', p: 3 }}>
                <CardContent>
                    <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
                        Welcome Back
                    </Typography>
                    <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 4 }}>
                        Enter your credentials to access your account
                    </Typography>

                    <Stack spacing={3}>
                        <TextField label="Email Address" fullWidth variant="outlined" />
                        <TextField label="Password" type="password" fullWidth variant="outlined" />
                        
                        <Button variant="contained" size="large" fullWidth onClick={onLogin}>
                            Log In
                        </Button>
                    </Stack>

                    <Box sx={{ mt: 3, textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                            Don't have an account?{' '}
                            <Button size="small" onClick={onSwitch} sx={{ minWidth: 'auto', p: 0 }}>
                                Sign Up
                            </Button>
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </LoginSection>
    );
};