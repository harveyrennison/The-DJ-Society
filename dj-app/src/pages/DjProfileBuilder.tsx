import {
    ArrowBack,
    ArrowForward,
    Check,
    CloudUpload,
    Link as LinkIcon
} from '@mui/icons-material';
import {
    Autocomplete,
    Avatar,
    Box,
    Button,
    Chip,
    CircularProgress,
    Container,
    InputAdornment,
    LinearProgress,
    TextField,
    Typography,
    Alert
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';

import { DJ_PROFILE_STORAGE_BUILDER, INITIAL_PROFILE, POPULAR_CITIES, POPULAR_GENRES } from '../constants/strings';
import type { DjProfileBuilderProps } from '../interfaces/props';
import type { BuilderStep } from '../interfaces/types';
import type { DJ, DjProfileFormData, Genre } from '../interfaces/userTypes';
import { GradientText, theme } from '../theme/theme';
import { validateLocation } from '../utils/validation';
import { CreateDjProfile } from '../session/profileServices';
import { useAuth } from '../context/AuthContext';

export const DjProfileBuilder: React.FC<DjProfileBuilderProps> = ({ onProfileComplete }) => {
    const { getIdToken } = useAuth();

    const [profile, setProfile] = useState<DjProfileFormData>(() => {
        try {
            const savedData = localStorage.getItem(DJ_PROFILE_STORAGE_BUILDER);
            if (savedData) {
                const parsed = JSON.parse(savedData);
                // Merge with INITIAL_PROFILE to ensure structure matches even if saved data is old
                return { ...INITIAL_PROFILE, ...parsed.profile };
            }
        } catch (e) {
            console.error('Error loading profile draft:', e);
        }
        return INITIAL_PROFILE;
    });

    const [step, setStep] = useState<BuilderStep>(() => {
        try {
            const savedData = localStorage.getItem(DJ_PROFILE_STORAGE_BUILDER);
            if (savedData) {
                const parsed = JSON.parse(savedData);
                // If they were at 'complete' previously, reset to 'identity' to avoid getting stuck
                // unless you specifically want them to see the success screen again.
                return parsed.step === 'complete' ? 'identity' : parsed.step;
            }
        } catch (e) {
            console.error('Error loading step draft:', e);
        }
        return 'identity';
    });

    const [isSaving, setIsSaving] = useState(false);
    const [locationError, setLocationError] = useState<string | null>(null);
    const [statusMessage, setStatusMessage] = useState<string | null>(null);
    const [statusSeverity, setStatusSeverity] = useState<'error' | 'success'>('error');
    const locationOptions = POPULAR_CITIES
    const steps: BuilderStep[] = ['identity', 'sound', 'visuals'];
    const currentStepIndex = steps.indexOf(step);

    useEffect(() => {
        if (step !== 'complete') {
            localStorage.setItem(DJ_PROFILE_STORAGE_BUILDER, JSON.stringify({
                profile,
                step
            }));
        }
    }, [profile, step]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        // Clear status message on input
        setStatusMessage(null);
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleNext = () => {
        // The button is disabled if the step is invalid, so we don't need to check here.
        // We only move forward.
        setStatusMessage(null);
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
        setStatusMessage(null);
        if (currentStepIndex > 0) {
            setStep(steps[currentStepIndex - 1]);
        }
    };

    const handleSaveProfile = async () => {
        setStatusMessage(null);
        const token = await getIdToken();
        if (!token) {
            console.error('Cannot save profile: Authentication token is missing or mocked. Please ensure the user is logged in.');
            setStatusSeverity('error');
            setStatusMessage('Error: You must be logged in to save your profile.');
            return;
        }
        setIsSaving(true);
        
        try {
            console.info('Attempting to save DJ Profile with token:', profile);
            
            // 1. Call the service function with the token and profile data
            const savedProfile: DJ = await CreateDjProfile(token, profile);
            
            console.info('✅ DJ Profile successfully saved:', savedProfile);

            // 2. Transition to the complete step and pass the final saved data
            setStatusSeverity('success');
            setStatusMessage('DJ Profile successfully created!');
            setStep('complete');
            
            // It's usually best practice to pass the data returned from the server
            // to the completion handler, as the server has the final IDs (djId, userId, etc.)
            onProfileComplete(savedProfile);

        } catch (error) {
            console.error('❌ Failed to save DJ Profile:', error);
            setStatusSeverity('error');
            setStatusMessage('Failed to save profile. Please check the console for network or validation errors.'); 

        } finally {
            setIsSaving(false);
        }
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
                        
                        <Autocomplete
                            multiple
                            // Use POPULAR_GENRES as options
                            options={POPULAR_GENRES}
                            // The value is controlled by profile.genres
                            value={profile.genres.map(g => g.genreName)}
                            getOptionLabel={(option) => option}
                            onChange={(_event, newValue: string[]) => {
                                // Limit selection to a maximum of 5 genres
                                const genresToSet: Genre[] = newValue
                                    .slice(0, 5)
                                    .map(genreName => ({
                                        // Assume genre_id 0 and subgenres null if not available from a better source
                                        genreId: 0, 
                                        genreName: genreName,
                                        subgenres: null
                                    }));
                                setProfile(prev => ({ ...prev, genres: genresToSet }));
                                setStatusMessage(null);
                            }}
                            // Render the input field
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Genres (Max 5)"
                                    required
                                    fullWidth
                                    margin="normal"
                                />
                            )}
                            // Render the selected genres as Chips
                            renderValue={(value, getValueProps) =>
                                value.map((option, index) => (
                                    <Chip
                                        variant="outlined"
                                        label={option}
                                        {...getValueProps({ index })}
                                        key={option}
                                        color="primary"
                                    />
                                ))
                            }
                            disableCloseOnSelect 
                        />
                        <Autocomplete
                            // Use the static list for suggestions
                            options={locationOptions}
                            value={profile.location}
                            // Handle selection from dropdown or when input is blurred/cleared
                            onChange={(_event, newValue) => {
                                setProfile(prev => ({ ...prev, location: newValue || '' }));
                                validateLocationAndSetError(newValue || ''); 
                                setStatusMessage(null);
                            }}
                            // Handle user typing
                            onInputChange={async (_event, newInputValue, reason) => {
                                if (reason === 'input') {
                                    setProfile(prev => ({ ...prev, location: newInputValue }));
                                    validateLocationAndSetError(newInputValue); // Validate as the user types
                                }
                                setStatusMessage(null);
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
                                label="Equipment List"
                                name="equipment"
                                value={profile.equipment}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                                placeholder="e.g., Pioneer CDJ-3000s, DDJ-FLX6"
                            />
                            <TextField
                                label="Instagram URL" 
                                name="instagramUrl" // Use the correct name if it exists in your profile interface, or keep mixcloudUrl if that's what the interface expects. Assuming it should be 'instagramUrl' now.
                                value={profile.instagramUrl}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                                slotProps = {{ input: <InputAdornment position="start"><LinkIcon color="disabled"/></InputAdornment> }}
                            />
                            <TextField
                                label="SoundCloud URL"
                                name="soundcloudUrl"
                                value={profile.soundcloudUrl}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                                slotProps = {{ input: <InputAdornment position="start"><LinkIcon color="disabled"/></InputAdornment> }}
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
    }, [step, profile, locationError, onProfileComplete, handleInputChange]);

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

            {statusMessage && (
                <Alert severity={statusSeverity} sx={{ mb: 4 }}>
                    {statusMessage}
                </Alert>
            )}

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
                                (step === 'identity' && (!profile.djName || profile.genres.length === 0 || !profile.location || !!locationError)) 
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