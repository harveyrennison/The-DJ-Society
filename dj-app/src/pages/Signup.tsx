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

import type { AuthPageProps } from '../interfaces/types';
import { SignupSection } from '../theme/theme';

export const SignupPage: React.FC<AuthPageProps> = ({ onLogin, onSwitch }) => {
    // Note: I've kept onLogin as the prop name for consistency, but it will
    // trigger the signup logic in the parent container.
    return (
        <SignupSection>
            <Card sx={{ maxWidth: 400, width: '100%', p: 3 }}>
                <CardContent>
                    <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
                        Join the Society
                    </Typography>
                    <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 4 }}>
                        Create your portfolio in seconds
                    </Typography>

                    <Stack spacing={3}>
                        <TextField label="Email Address" fullWidth variant="outlined" />
                        <TextField label="Password" type="password" fullWidth variant="outlined" />
                        <TextField label="Stage Name" fullWidth variant="outlined" />
                        
                        <Button variant="contained" size="large" fullWidth onClick={onLogin}>
                            Create Account
                        </Button>
                    </Stack>

                    <Box sx={{ mt: 3, textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                            Already have an account?{' '}
                            <Button size="small" onClick={onSwitch} sx={{ minWidth: 'auto', p: 0 }}>
                                Log In
                            </Button>
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </SignupSection>
    );
};