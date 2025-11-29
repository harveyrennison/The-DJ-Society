import {
    ArrowBack,
    ArrowForward,
    Check,
    CloudUpload,
    Link as LinkIcon,
    LocationCity,
    QueueMusic
} from '@mui/icons-material';
import {
    Autocomplete,
    Avatar,
    Box,
    Button,
    Chip,
    CircularProgress,
    Container,
    IconButton,
    InputAdornment,
    LinearProgress,
    TextField,
    Typography,
} from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';

import { INITIAL_PROFILE, POPULAR_CITIES, POPULAR_GENRES } from '../constants/strings';
import type { DjProfileBuilderProps } from '../interfaces/props';
import type { BuilderStep } from '../interfaces/types';
import type { DjProfileFormData } from '../interfaces/userTypes';
import { GradientText, theme } from '../theme/theme';
import { validateLocation } from '../utils/validation';

export const DjProfileBuilder: React.FC<DjProfileBuilderProps> = ({ onProfileComplete }) => {
    const [profile, setProfile] = useState<DjProfileFormData>(INITIAL_PROFILE);
    const [step, setStep] = useState<BuilderStep>('identity');
    const [isSaving, setIsSaving] = useState(false);
    const [currentGenre, setCurrentGenre] = useState('');
    const [locationError, setLocationError] = useState<string | null>(null);


    const locationOptions = POPULAR_CITIES
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
        // The button is disabled if the step is invalid, so we don't need to check here.
        // We only move forward.
        if (currentStepIndex < steps.length - 1) {
            setStep(steps[currentStepIndex + 1]);
        }
    };

    const validateLocationAndSetError = (location: string): boolean => {
        const error = validateLocation(location);
        setLocationError(error);
        return !error; // Return true if there is NO error (i.e., it's valid)
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
                        <Typography variant="h5" mb={2}>1. Basic Information</Typography>
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
                        <Autocomplete
                            // Use the static list for suggestions
                            options={locationOptions}
                            value={profile.location}
                            // Handle selection from dropdown or when input is blurred/cleared
                            onChange={(_event, newValue) => {
                                setProfile(prev => ({ ...prev, location: newValue || '' }));
                                validateLocationAndSetError(newValue || ''); 
                            }}
                            // Handle user typing
                            onInputChange={async (_event, newInputValue, reason) => {
                                if (reason === 'input') {
                                    setProfile(prev => ({ ...prev, location: newInputValue }));
                                    validateLocationAndSetError(newInputValue); // Validate as the user types
                                }
                            }}
                            freeSolo // Allows the user to enter a city not in the options list (i.e., any city in the world)
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Location / City"
                                    name="location"
                                    fullWidth
                                    margin="normal"
                                    required
                                    error={!!locationError}
                                    helperText={locationError} // Display error message
                                    placeholder="Enter or choose a city"
                                />
                            )}
                        />
                    </Box>
                );

                case 'sound':
                    return (
                        <Box sx={{ p: 4 }}>
                            <Typography variant="h5" mb={2}>2. Sound & Gear</Typography>
                            
                            <Autocomplete
                                multiple
                                // Use POPULAR_GENRES as options
                                options={POPULAR_GENRES}
                                // The value is controlled by profile.genres
                                value={profile.genres}
                                // Update profile.genres when selection changes
                                onChange={(_event, newValue) => {
                                    // Limit selection to a maximum of 5 genres
                                    const genresToSet = newValue.slice(0, 5); 
                                    setProfile(prev => ({ ...prev, genres: genresToSet }));
                                }}
                                // Render the input field
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Select Your Genres (Max 5)"
                                        fullWidth
                                        margin="normal"
                                    />
                                )}
                                // Render the selected genres as Chips
                                renderValue={(value, getTagProps) =>
                                    value.map((option, index) => (
                                        <Chip
                                            variant="outlined"
                                            label={option}
                                            {...getTagProps({ index })}
                                            key={option}
                                            color="primary" // Changed to primary for visibility
                                        />
                                    ))
                                }
                                disableCloseOnSelect // Keep the dropdown open after selection
                            />

                            {/* Equipment List (Changed back to single line) */}
                            <TextField
                                label="Equipment List"
                                name="equipment"
                                value={profile.equipment}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                                // Removed multiline and rows={2}
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
                            {/* Changed label from Mixcloud to Instagram URL */}
                            <TextField
                                label="Instagram URL" 
                                name="instagramUrl" // Use the correct name if it exists in your profile interface, or keep mixcloudUrl if that's what the interface expects. Assuming it should be 'instagramUrl' now.
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
                            Your DJ portfolio is now live.
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
                                disabled={
                                    isSaving || 
                                    (step === 'identity' && (!profile.djName || !profile.location || !!locationError)) ||
                                    (step === 'sound' && profile.genres.length === 0) // <-- ADDED LINE
                                }
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