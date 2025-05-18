import React, { useState, useEffect } from 'react';
import {
    Avatar,
    Box,
    Container,
    Typography,
    CircularProgress,
    Alert,
    Paper,
    Card,
    CardContent,
    Chip,
    Divider,
    Fade,
    Grid,
    Skeleton,
    useTheme,
    useMediaQuery,
    Tooltip,
    IconButton
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';
import { User } from '../types/user';

const API_BASE_URL = 'http://localhost:4941/api/v1';

const getUsername = async (userId: string | null, token: string | null) => {
    try {
        console.log('Fetching user profile:');
        console.log('- userId:', userId);
        console.log('- token:', token ? `${token.substring(0, 10)}...` : 'No token');

        const config = token
            ? { headers: { 'X-Authorization': token } }
            : {};

        console.log('Request headers:', config);

        const response = await axios.get(`${API_BASE_URL}/users/${userId}`, config);
        console.log('Response data:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
};

const Profile = () => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const [user, setUser] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [userImage, setUserImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const theme = useTheme();

    useEffect(() => {
        const fetchUser = async () => {
            try {

                if (!userId) {
                    setError('No user ID found. Please log in again.');
                    setLoading(false);
                    return;
                }

                const userData = await getUsername(userId, token) as User;
                console.log('Profile data received:', userData);
                setUser(userData);

                // Check if email was received
                if (userData.email) {
                    console.log('Email was successfully returned from API');
                } else {
                    console.log('Authentication error: No email returned from API');
                }

                const imageUrl = `${API_BASE_URL}/users/${userId}/image`;
                setUserImage(imageUrl);
                setLoading(false);
            } catch (err) {
                console.error('Profile fetch error:', err);
                setError('Failed to fetch user profile');
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId, token]);

    if (error) {
        return (
            <Fade in timeout={1000}>
                <Container sx={{ mt: 8, mb: 8 }}>
                    <Alert
                        severity="error"
                        variant="filled"
                        sx={{
                            borderRadius: 2,
                            boxShadow: 3
                        }}
                    >
                        {error}
                    </Alert>
                </Container>
            </Fade>
        );
    }

    return (
        <Container maxWidth="md" sx={{ pt: 6, pb: 8 }}>
            <Fade in timeout={800}>
                <Box>
                    <Typography
                        variant="h2"
                        fontWeight="bold"
                        sx={{
                            mb: 4,
                            textAlign: 'center',
                            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            color: 'transparent',
                            textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
                        }}
                    >
                        User Profile
                    </Typography>

                    <Card
                        elevation={6}
                        sx={{
                            borderRadius: 4,
                            overflow: 'hidden',
                            transition: 'all 0.3s ease-in-out',
                            '&:hover': {
                                transform: 'translateY(-5px)',
                                boxShadow: 12
                            }
                        }}
                    >
                        <Box
                            sx={{
                                height: 120,
                                background: `linear-gradient(120deg, ${theme.palette.primary.main}, ${theme.palette.secondary.light})`,
                                position: 'relative'
                            }}
                        />

                        <CardContent sx={{ position: 'relative', pt: 8, pb: 4 }}>
                            {/* Avatar positioned on top of the header/content boundary */}
                            <Avatar
                                alt={loading ? 'Loading...' : `${user?.firstName || ''} ${user?.lastName || ''}`}
                                src={loading ? undefined : (userImage ?? undefined)}
                                sx={{
                                    width: 130,
                                    height: 130,
                                    position: 'absolute',
                                    top: -60,
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    border: `4px solid ${theme.palette.background.paper}`,
                                    boxShadow: theme.shadows[4],
                                }}
                            >
                                {loading ? <AccountCircleIcon fontSize="large" /> : null}
                            </Avatar>

                            <Box sx={{ textAlign: 'center', mt: 4 }}>
                                {loading ? (
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                                        <Skeleton variant="text" width="60%" height={60} animation="wave" />
                                        <Skeleton variant="text" width="40%" height={30} animation="wave" />
                                    </Box>
                                ) : (
                                    <>
                                        <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
                                            {user?.firstName} {user?.lastName}
                                        </Typography>

                                        {user?.email && (
                                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                                                <Tooltip title="Email">
                                                    <EmailIcon color="action" sx={{ mr: 1, fontSize: 18 }} />
                                                </Tooltip>
                                                <Typography variant="body1" color="text.secondary">
                                                    {user.email}
                                                </Typography>
                                            </Box>
                                        )}
                                    </>
                                )}
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Fade>
        </Container>
    );
};

export default Profile;
