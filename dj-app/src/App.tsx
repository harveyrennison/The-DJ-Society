import {
    Box,
    CssBaseline
} from '@mui/material';
import {
    ThemeProvider
} from '@mui/material/styles';
import React, { useState } from 'react';

import { Header } from './components/Header';
import { DJS, MOCK_USER } from './data/mockData';
import type { DJ, User } from './interfaces/userTypes';
import type { Page } from './interfaces/types';
import { DirectoryPage } from './pages/Directory';
import { HomePage, } from './pages/Home';
import { LoginPage } from './pages/Login';
import { ProfilePage } from './pages/Profile';
import { SignupPage } from './pages/Register';
import { theme } from './theme/theme';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [user, setUser] = useState<User | null>(null); // null = guest
  const [selectedDj, setSelectedDj] = useState<DJ | null>(DJS[0]); // Default to first DJ for initial state check

  // Navigation Handler
  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  // Auth Handlers (Mock)
  const handleLogin = () => {
    setUser(MOCK_USER);
    handleNavigate('home');
  };

  const handleLogout = () => {
    setUser(null);
    handleNavigate('home');
  };

  const handleViewDj = (dj: DJ) => {
      setSelectedDj(dj);
      handleNavigate('dj-profile');
  };

  const renderPage = () => {
    // Ensure a DJ is selected before attempting to render ProfilePage
    if (currentPage === 'dj-profile' && !selectedDj) {
        return <DirectoryPage onSelectDj={handleViewDj} />;
    }

    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'directory':
        return <DirectoryPage onSelectDj={handleViewDj} />;
      case 'dj-profile':
        // TypeScript guarantees selectedDj is not null here due to the check above
        return <ProfilePage dj={selectedDj!} onBack={() => handleNavigate('directory')} isOwner={false} />;
      case 'profile':
        // Mocking the logged-in user's profile view
        const myProfile: DJ = { ...DJS[0], name: "ZENIATH" }; 
        return <ProfilePage dj={myProfile} onBack={() => handleNavigate('home')} isOwner={true} />;
      case 'login':
        // onSwitch navigates to the signup page
        return <LoginPage onLogin={handleLogin} onSwitch={() => handleNavigate('signup')} />;
      case 'signup':
        // onSwitch navigates to the login page
        return <SignupPage onLogin={handleLogin} onSwitch={() => handleNavigate('login')} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
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