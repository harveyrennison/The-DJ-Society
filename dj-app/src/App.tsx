import {
    Box,
    CssBaseline,
} from '@mui/material';
import {
    ThemeProvider
} from '@mui/material/styles';
import React, { useCallback, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'; // Key router imports

import { Header } from './components/Header';
import { DJS, MOCK_USER } from './data/mockData';
import type { DJ, DjProfileFormData, User } from './interfaces/userTypes';
import type { NavState } from './interfaces/props'; // Import NavState
import type { Page } from './interfaces/types';
import { DirectoryPage } from './pages/Directory';
import { HomePage } from './pages/Home';
import { LoginPage } from './pages/Login';
import { ProfilePage } from './pages/Profile';
import { SignupPage } from './pages/Register';
import { theme } from './theme/theme';
import { DjProfileBuilder } from './pages/DjProfileBuilder';

export const App: React.FC = () => {
  // Removed: currentPage state, handleNavigate function
  const navigate = useNavigate(); // Hook for programmatic navigation
  
  const [user, setUser] = useState<User | null>(null); // null = guest
  const [myDjProfile, setMyDjProfile] = useState<DJ | null>(null);
  const [selectedDj, setSelectedDj] = useState<DJ | null>(DJS[0]);

  // Auth Handlers
  const handleLogin = useCallback((token: string, userId: string, navState?: NavState) => {
    // 1. Update app user state (can be removed if using firebase auth state listener)
    setUser(MOCK_USER); 
    
    if (navState && navState.showWelcomeModal) {
      navigate('/', { state: navState }); // Navigate to home with the modal trigger state
    } else if (MOCK_USER.isDjProfileComplete) {
      // If user logs in normally and has a profile, go to their profile
      navigate('/profile');
    } else {
      // If user logs in normally but needs a profile, go to Home (where the modal will eventually check for completion)
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = useCallback(() => {
    setUser(null);
    setMyDjProfile(null);
    navigate('/'); // Navigate to home on logout
  }, [navigate]);

  const handleViewDj = useCallback((dj: DJ) => {
      setSelectedDj(dj);
      navigate(`/dj/${dj.djId}`); // Navigate using a route parameter
  }, [navigate]);

  const handleCreateProfileSuccess = useCallback((profileData: DjProfileFormData) => {
      const newProfile: DJ = {
          djId: Date.now(),
          userId: user!.userId,
          isPublic: true,
          ...profileData,
      };

      setMyDjProfile(newProfile);

      setUser(prev =>
          prev ? { ...prev, isDjProfileComplete: true } : null
      );

      navigate('/profile'); // Navigate to the finished profile view
  }, [navigate, user]);
  
  // Helper function to handle navigation via string (used by Header)
  const routerNavigate = useCallback((page: Page) => {
    switch (page) {
        case 'home': navigate('/'); break;
        case 'directory': navigate('/directory'); break;
        case 'profile': navigate('/profile'); break;
        case 'settings': navigate('/settings'); break;
        case 'login': navigate('/login'); break;
        case 'signup': navigate('/signup'); break;
        case 'profile-builder': navigate('/profile-builder'); break;
        default: navigate('/'); break;
    }
    window.scrollTo(0, 0);
  }, [navigate]);
  
  // Resolve the DJ to display for the owner's profile page
  const getOwnerProfile = () => {
      if (user && myDjProfile) return myDjProfile;
      
      const mockName = user?.email.split('@')[0].toUpperCase() || 'DJ Placeholder';
      return { 
          ...DJS[0], 
          djName: mockName, 
          userId: user?.userId ?? 0, 
          djId: 99999 
      };
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', color: 'text.primary' }}>
        <Header user={user} onNavigate={routerNavigate} onLogout={handleLogout} />
        <Box component="main" sx={{ pt: { xs: '56px', sm: '64px' } }}>
            {/* THIS IS THE KEY FIX: Using Routes and Route */}
            <Routes>
                <Route path="/" element={<HomePage onNavigate={routerNavigate} />} />
                
                <Route path="/directory" element={<DirectoryPage onSelectDj={handleViewDj} />} />
                
                <Route path="/dj/:djId" element={
                    // Placeholder for a detailed profile view (using selectedDj for now)
                    <ProfilePage 
                        dj={selectedDj!} 
                        onBack={() => navigate('/directory')} 
                        isOwner={false} 
                    />
                } />
                
                <Route path="/profile" element={
                    <ProfilePage 
                        dj={getOwnerProfile()} 
                        onBack={() => navigate('/')} 
                        isOwner={true} 
                    />
                } />
                
                <Route path="/login" element={
                    <LoginPage 
                        onLogin={handleLogin} 
                        onSwitch={() => navigate('/signup')} 
                    />
                } />
                
                <Route path="/signup" element={
                    <SignupPage 
                        onLogin={handleLogin} 
                        onSwitch={() => navigate('/login')} 
                    />
                } />
                
                <Route path="/profile-builder" element={
                    <DjProfileBuilder onProfileComplete={handleCreateProfileSuccess} />  
                } />
                
                {/* Fallback route */}
                <Route path="*" element={<HomePage onNavigate={routerNavigate} />} />
            </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;