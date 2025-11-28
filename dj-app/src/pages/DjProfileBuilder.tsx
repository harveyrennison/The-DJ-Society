import React, { useState, useCallback, useMemo } from 'react';
import {
    Container,
    Box,
    Typography,
    Button,
    TextField,
    Chip,
    Avatar,
    InputAdornment,
    IconButton,
    CircularProgress,
    LinearProgress,
} from '@mui/material';
import { 
    Person, 
    QueueMusic, 
    Palette, 
    ArrowBack, 
    ArrowForward, 
    Check,
    CloudUpload,
    Link as LinkIcon,
} from '@mui/icons-material';

import {GradientText, theme} from '../theme/theme'
import type { DjProfileBuilderProps } from '../interfaces/props';
import type { BuilderStep } from '../interfaces/types';
import { initialProfile } from '../constants/strings';
import type { DjProfileFormData } from '../interfaces/userTypes';

export const DjProfileBuilder: React.FC<DjProfileBuilderProps> = ({ onProfileComplete }) => {
    const [profile, setProfile] = useState<DjProfileFormData>(initialProfile);
    const [step, setStep] = useState<BuilderStep>('identity');
    const [isSaving, setIsSaving] = useState(false);
    const [currentGenre, setCurrentGenre] = useState('');

    const steps: BuilderStep[] = ['identity', 'sound', 'visuals'];
    const currentStepIndex = steps.indexOf(step);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleAddGenre = useCallback(() => {
        const genre = currentGenre.trim();
        if (genre && !profile.genres.includes(genre) && profile.genres.length < 5) {
            setProfile(prev => ({ ...prev, genres: [...prev.genres, genre] }));
            setCurrentGenre('');
        }
    }, [currentGenre, profile.genres]);

    const handleRemoveGenre = useCallback((genreToRemove: string) => {
        setProfile(prev => ({ ...prev, genres: prev.genres.filter(g => g !== genreToRemove) }));
    }, []);

    const handleNext = () => {
        if (currentStepIndex < steps.length - 1) {
            setStep(steps[currentStepIndex + 1]);
        }
    };

    const handleBack = () => {
        if (currentStepIndex > 0) {
            setStep(steps[currentStepIndex - 1]);
        }
    };

    const handleSaveProfile = async () => {
        if (!profile.djName) return; // Prevent saving if name is missing

        setIsSaving(true);
        // --- MOCK API CALL START ---
        console.log('Saving DJ Profile:', profile);
        await new Promise(resolve => setTimeout(resolve, 1000));
        // --- MOCK API CALL END ---
        setIsSaving(false);
        setStep('complete');
    };

    const renderStepContent = useMemo(() => {
        switch (step) {
            case 'identity':
                return (
                    <Box sx={{ p: 4 }}>
                        <Typography variant="h5" mb={2}>1. Your Identity</Typography>
                        <TextField
                            label="DJ Name"
                            name="djName"
                            value={profile.djName}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            label="Short Bio"
                            name="bio"
                            value={profile.bio}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            multiline
                            rows={3}
                            placeholder="Tell the world about your style and sound."
                        />
                         <TextField
                            label="Location / City"
                            name="location"
                            value={profile.location}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                    </Box>
                );

            case 'sound':
                return (
                    <Box sx={{ p: 4 }}>
                        <Typography variant="h5" mb={2}>2. Your Sound & Gear</Typography>
                        
                        <Typography variant="subtitle1" color="text.secondary" mt={2} mb={1}>
                            Top Genres (Max 5)
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                            {profile.genres.map(genre => (
                                <Chip
                                    key={genre}
                                    label={genre}
                                    onDelete={() => handleRemoveGenre(genre)}
                                    color="primary"
                                    variant="outlined"
                                />
                            ))}
                        </Box>
                        <TextField
                            label="Add Genre"
                            value={currentGenre}
                            onChange={(e) => setCurrentGenre(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddGenre(); }}}
                            fullWidth
                            margin="normal"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleAddGenre} color="primary" disabled={!currentGenre || profile.genres.length >= 5}>
                                            <QueueMusic />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            helperText={`Current count: ${profile.genres.length}/5`}
                        />
                         <TextField
                            label="Equipment List"
                            name="equipment"
                            value={profile.equipment}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            multiline
                            rows={2}
                            placeholder="e.g., Pioneer CDJ-3000s, A&H Xone 96"
                        />
                        <TextField
                            label="SoundCloud URL"
                            name="soundcloudUrl"
                            value={profile.soundcloudUrl}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            InputProps={{ startAdornment: <InputAdornment position="start"><LinkIcon color="disabled"/></InputAdornment> }}
                        />
                        <TextField
                            label="Mixcloud URL"
                            name="mixcloudUrl"
                            value={profile.instagramUrl}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            InputProps={{ startAdornment: <InputAdornment position="start"><LinkIcon color="disabled"/></InputAdornment> }}
                        />
                    </Box>
                );

            case 'visuals':
                return (
                    <Box sx={{ p: 4, textAlign: 'center' }}>
                        <Typography variant="h5" mb={3}>3. Your Look</Typography>
                        
                        <Typography variant="subtitle1" color="text.secondary" mb={1}>Profile Photo</Typography>
                        <Avatar 
                            src={profile.avatarFile} 
                            sx={{ width: 120, height: 120, margin: '0 auto 16px', border: `3px solid ${theme.palette.primary.main}` }}
                        />
                        <Button variant="outlined" startIcon={<CloudUpload />} sx={{ mb: 4 }}>
                            Upload Avatar
                        </Button>

                        <Typography variant="subtitle1" color="text.secondary" mb={1}>Profile Banner</Typography>
                        <Box
                            sx={{
                                height: 150,
                                width: '100%',
                                backgroundImage: `url(${profile.bannerFile})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                borderRadius: theme.shape.borderRadius,
                                border: '1px solid rgba(255,255,255,0.1)',
                                mb: 2,
                            }}
                        />
                        <Button variant="outlined" startIcon={<CloudUpload />}>
                            Upload Banner
                        </Button>
                    </Box>
                );
            
            case 'complete':
                 return (
                    <Box sx={{ p: 4, textAlign: 'center', py: 8 }}>
                        <Check sx={{ color: 'primary.main', fontSize: 80, mb: 2 }} />
                        <Typography variant="h4" color="primary.main" fontWeight="bold" mb={1}>
                            Profile Complete!
                        </Typography>
                        <Typography variant="h6" color="text.secondary" mb={4}>
                            Your DJ portfolio is now live on DJ Society.
                        </Typography>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            size="large"
                            // Pass the newly created profile data back to the App component
                            onClick={() => onProfileComplete(profile)}
                        >
                            View My Profile
                        </Button>
                    </Box>
                );
        }
    }, [step, profile, currentGenre, handleAddGenre, handleRemoveGenre, onProfileComplete]);

    const progress = (currentStepIndex + 1) / (steps.length) * 100;
    return (
            <Container maxWidth="md" sx={{ py: 6, minHeight: '100vh', background: theme.palette.background.default, color: theme.palette.text.primary }}>
                
                <Box mb={4} sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" fontWeight={700}>
                        Create Your DJ <GradientText>Portfolio</GradientText>
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        Showcase your sound in three simple steps.
                    </Typography>
                </Box>

                {/* [MOVED] Progress Bar was here, now removed */}

                {/* Main Content Card */}
                <Box 
                    sx={{ 
                        bgcolor: theme.palette.background.paper, 
                        borderRadius: theme.shape.borderRadius, 
                        boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}
                >
                    {renderStepContent}
                </Box>

                {/* Navigation Buttons AND Progress Bar */}
                {step !== 'complete' && (
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 4, p: 2 }}>
                        <Button
                            variant="outlined"
                            onClick={handleBack}
                            disabled={currentStepIndex === 0 || isSaving}
                            startIcon={<ArrowBack />}
                            sx={{ textTransform: 'none', minWidth: '100px' }} // Added minWidth for consistency
                        >
                            Back
                        </Button>
                        
                        {/* Progress Bar Centered Here */}
                        <Box sx={{ flexGrow: 1, mx: 3 }}>
                            <LinearProgress 
                                variant="determinate" 
                                value={progress} 
                                sx={{ 
                                    height: 10, 
                                    borderRadius: 5,
                                    bgcolor: theme.palette.background.paper,
                                    border: '1px solid rgba(255,255,255,0.1)', // Optional: adds a subtle border
                                    '& .MuiLinearProgress-bar': {
                                        backgroundColor: theme.palette.primary.main,
                                        backgroundImage: `linear-gradient(90deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                                    }
                                }} 
                            />
                        </Box>
                        
                        {currentStepIndex < steps.length - 1 ? (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
                                disabled={isSaving || (step === 'identity' && !profile.djName)}
                                endIcon={<ArrowForward />}
                                sx={{ textTransform: 'none', minWidth: '100px' }}
                            >
                                Continue
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSaveProfile}
                                disabled={isSaving || !profile.djName}
                                startIcon={isSaving ? <CircularProgress size={20} color="inherit" /> : <Check />}
                                sx={{ textTransform: 'none', minWidth: '100px' }}
                            >
                                {isSaving ? 'Saving...' : 'Finish'}
                            </Button>
                        )}
                    </Box>
                )}

            </Container>
        );
    };