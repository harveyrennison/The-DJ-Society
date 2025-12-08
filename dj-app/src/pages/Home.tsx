import {
    GraphicEq,
    PersonAdd,
    PlayArrow
} from '@mui/icons-material';
import Close from '@mui/icons-material/Close';
import {
    Box,
    Button,
    Card,
    CardMedia,
    Chip,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    Stack,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { DJS } from '../data/mockData';
import BComPhoto from '../images/bcomhide.jpg';
import FoundryPhoto from '../images/foundry.jpg';
import type { HomePageProps } from "../interfaces/props";
import { GradientText, HeroSection } from '../theme/theme';

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    
    // State for the Welcome Modal
    const [openWelcomeModal, setOpenWelcomeModal] = useState(false);


    const handleCloseModal = () => {
        setOpenWelcomeModal(false);
    };

    const handleGoToBuilder = () => {
        setOpenWelcomeModal(false);
        // Navigate to your separate Builder Page
        onNavigate('profile-builder'); 
    };

    return (
        <HeroSection>
            <Container maxWidth="lg">
                <Grid container spacing={4} alignItems="center">
                    {/* --- LEFT SIDE: HERO TEXT --- */}
                    <Grid sx={{ pt: { xs: '12px', md: '6px' } }}>
                        <Chip 
                            icon={<GraphicEq sx={{ color: '#00e5ff !important' }} />} 
                            label="The #1 Platform for DJs" 
                            variant="outlined" 
                            sx={{ borderColor: 'rgba(0, 229, 255, 0.3)', color: 'primary.main', mb: 3 }} 
                        />
                        <Typography variant="h1" sx={{ fontSize: { xs: '2.5rem', md: '4.5rem' }, lineHeight: 1.1, mb: 2 }}>
                            Unite. Create. <br />
                            <GradientText>Perform.</GradientText>
                        </Typography>
                        <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: '600px', fontWeight: 400 }}>
                            Showcase your mixes, manage your gigs, and connect with promoters worldwide. 
                            The ultimate portfolio builder for modern DJs.
                        </Typography>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                            <Button 
                                variant="contained" 
                                size="large" 
                                endIcon={<PlayArrow />}
                                onClick={() => onNavigate('directory')} // Or 'explore'
                                sx={{ py: 1.5, px: 4 }}
                            >
                                Explore DJs
                            </Button>
                            <Button 
                                variant="outlined" 
                                size="large"
                                // If they click this manually, go straight to builder
                                onClick={() => onNavigate('profile-builder')} 
                                sx={{ py: 1.5, px: 4, borderColor: 'rgba(255,255,255,0.2)' }}
                            >
                                Create Portfolio
                            </Button>
                        </Stack>
                    </Grid>

                    {/* --- RIGHT SIDE: IMAGES --- */}
                    <Grid sx={{ pt: { xs: '12px', md: '6px' }, position: 'relative', display: { xs: 'none', md: 'block' } }}>
                        <Box sx={{
                            position: 'relative',
                            width: '100%',
                            height: 500,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Box sx={{
                                position: 'absolute',
                                width: 400,
                                height: 400,
                                borderRadius: '50%',
                                background: 'radial-gradient(circle, rgba(245,0,87,0.2) 0%, rgba(0,229,255,0.1) 50%, transparent 70%)',
                                filter: 'blur(40px)',
                                animation: 'pulse 4s infinite'
                            }} />
                            <Card sx={{ 
                                position: 'relative', 
                                width: 320, 
                                height: 420, 
                                transform: 'rotate(-5deg)',
                                transition: 'transform 0.3s ease',
                                '&:hover': { transform: 'rotate(0deg) scale(1.05)', zIndex: 10 }
                            }}>
                                <CardMedia component="img" height="420" image={FoundryPhoto} alt="DJ" />
                                <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: 2, background: 'linear-gradient(to top, black, transparent)' }}>
                                    <Typography variant="h6">{DJS[0].djName}</Typography>
                                </Box>
                            </Card>
                            <Card sx={{ 
                                position: 'relative', 
                                width: 320, 
                                height: 420, 
                                ml: -15, 
                                mt: 10,
                                transform: 'rotate(5deg)',
                                transition: 'transform 0.3s ease',
                                '&:hover': { transform: 'rotate(0deg) scale(1.05)', zIndex: 10 }
                            }}>
                                <CardMedia component="img" height="420" image={BComPhoto} alt="DJ" />
                                <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: 2, background: 'linear-gradient(to top, black, transparent)' }}>
                                    <Typography variant="h6">{DJS[1].djName}</Typography>
                                </Box>
                            </Card>
                        </Box>
                    </Grid>
                </Grid>
            </Container>

            {/* --- WELCOME / CREATE PROFILE MODAL --- */}
            <Dialog
                open={openWelcomeModal}
                onClose={handleCloseModal}
                fullScreen={fullScreen}
                PaperProps={{
                    sx: {
                        bgcolor: theme.palette.background.paper,
                        backgroundImage: 'none',
                        border: '1px solid rgba(255,255,255,0.1)',
                        maxWidth: '450px',
                        borderRadius: 2
                    }
                }}
            >
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" fontWeight="bold">
                        Welcome to the Crew!
                    </Typography>
                    <IconButton onClick={handleCloseModal} size="small">
                        <Close />
                    </IconButton>
                </DialogTitle>

                <DialogContent>
                    <Box sx={{ textAlign: 'center', py: 2 }}>
                        <PersonAdd sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2 }} />
                        <Typography variant="body1" color="text.secondary" paragraph>
                            Your account is created, but you're invisible until you set up your <b>DJ Profile</b>.
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            It only takes 2 minutes to add your DJ name, genres, and mix links.
                        </Typography>
                    </Box>
                </DialogContent>

                <DialogActions sx={{ p: 3, justifyContent: 'center', flexDirection: 'column', gap: 1 }}>
                    <Button 
                        variant="contained" 
                        fullWidth 
                        size="large"
                        onClick={handleGoToBuilder}
                        startIcon={<GraphicEq />}
                    >
                        Create DJ Profile Now
                    </Button>
                    <Button 
                        variant="text" 
                        fullWidth
                        onClick={handleCloseModal}
                        color="inherit"
                    >
                        I'll do it later
                    </Button>
                </DialogActions>
            </Dialog>
        </HeroSection>
    );
};