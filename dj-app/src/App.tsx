import {
    Box,
    Button,
    CssBaseline,
    Typography
} from '@mui/material';
import {
    ThemeProvider
} from '@mui/material/styles';
import React, { useState } from 'react';

import { Header } from './components/Header';
import { DJS, MOCK_USER } from './data/mockData';
import type { DJ, DjProfileFormData, User } from './interfaces/userTypes';
import type { Page } from './interfaces/types';
import { DirectoryPage } from './pages/Directory';
import { HomePage, } from './pages/Home';
import { LoginPage } from './pages/Login';
import { ProfilePage } from './pages/Profile';
import { SignupPage } from './pages/Register';
import { theme } from './theme/theme';
import { DjProfileBuilder } from './pages/DjProfileBuilder';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [user, setUser] = useState<User | null>(null); // null = guest
  const [myDjProfile, setMyDjProfile] = useState<DJ | null>(null);
  const [selectedDj, setSelectedDj] = useState<DJ | null>(DJS[0]); // Default to first DJ for initial state check

  // Navigation Handler
  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  // Auth Handlers (Mock)
    const handleLogin = () => {
        setUser(MOCK_USER);
        if (!MOCK_USER.isDjProfileComplete) {
            handleNavigate('create-profile');
        } else {
            handleNavigate('profile');
        }
    };

  const handleLogout = () => {
    setUser(null);
    setMyDjProfile(null);
    handleNavigate('home');
  };

  const handleViewDj = (dj: DJ) => {
      setSelectedDj(dj);
      handleNavigate('dj-profile');
  };

    const handleCreateProfileSuccess = (profileData: DjProfileFormData) => {
        const newProfile: DJ = {
            djId: Date.now(),            // temporary ID if you're mocking
            userId: user!.userId,        // every DJ must tie to a user
            isPublic: true,              // or false — whichever you want as default
            ...profileData,              // spreads djName, bio, urls, files, etc.
        };

        setMyDjProfile(newProfile);

        setUser(prev =>
            prev ? { ...prev, isDjProfileComplete: true } : null
        );

        handleNavigate('profile');
    };

  const renderPage = () => {
    // Ensure a DJ is selected before attempting to render ProfilePage
    if (currentPage === 'dj-profile' && !selectedDj) {
        return <DirectoryPage onSelectDj={handleViewDj} />;
    }
    if (user && !user.isDjProfileComplete && currentPage !== 'create-profile') {
            return (
                <Box sx={{ p: 4, textAlign: 'center' }}>
                    <Typography variant="h5" color="text.secondary" mb={4}>Welcome! Please complete your DJ profile to continue.</Typography>
                    <Button variant="contained" onClick={() => handleNavigate('create-profile')}>Start Profile Builder</Button>
                </Box>
            );
        }

    switch (currentPage) {
      case 'home': return <HomePage onNavigate={handleNavigate} />;
      case 'directory': return <DirectoryPage onSelectDj={handleViewDj} />;
      case 'dj-profile': return <ProfilePage dj={selectedDj!} onBack={() => handleNavigate('directory')} isOwner={false} />;
      case 'profile':
                let profileToShow: DJ;
                if (user && myDjProfile) {
                    profileToShow = myDjProfile;
                } else {
                    const mockName = user?.email.split('@')[0].toUpperCase() || 'DJ Placeholder';
                    profileToShow = { ...DJS[0], djName: mockName, userId: user?.userId ?? 0, djId: 99999 };
                }
                return <ProfilePage dj={profileToShow} onBack={() => handleNavigate('home')} isOwner={true} />;
      case 'login': return <LoginPage onLogin={handleLogin} onSwitch={() => handleNavigate('signup')} />;
      case 'signup': return <SignupPage onLogin={handleLogin} onSwitch={() => handleNavigate('login')} />;
      case 'create-profile': return <DjProfileBuilder onProfileComplete={handleCreateProfileSuccess} />;  
      default: return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', color: 'text.primary' }}>
        <Header user={user} onNavigate={handleNavigate} onLogout={handleLogout} />
        <Box component="main" sx={{ pt: { xs: '56px', sm: '64px' } }}>
          {renderPage()}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;