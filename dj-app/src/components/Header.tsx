import {
    Close as CloseIcon,
    GraphicEq,
    LibraryMusic,
    Logout,
    Menu as MenuIcon,
    Person,
    Settings,
} from '@mui/icons-material';
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Container,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
    useMediaQuery,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import React, { useState } from 'react';

import type { HeaderProps } from "../interfaces/props";
import type { Page } from '../interfaces/types';
import { GradientText, theme } from '../theme/theme';
import { LogoutButton } from './logout/LogoutButton';
import { handleClientSideLogout } from '../session/manager'; 
import { DesktopLogoutMenuItem } from './logout/DesktopLogout';

// --- Header Component ---

export const Header: React.FC<HeaderProps> = ({ user, onNavigate, onLogout }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false); 
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleConfirmOpen = () => setConfirmOpen(true);
  const handleConfirmClose = () => setConfirmOpen(false);

  const handleConfirmLogout = async () => {
    setConfirmOpen(false); // Close the modal
    setIsLoggingOut(true); 

    try {
        await handleClientSideLogout();
        onLogout(); 
    } catch (error) {
        console.error("Logout error (local session cleared anyway):", error);
        onLogout(); 
    } finally {
        setIsLoggingOut(false);
    }
  };

  const navItems: { label: string, value: Page }[] = [
    { label: 'Home', value: 'home' }
  ];

  return (
    <>
      <AppBar position="fixed" elevation={0}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: { xs: 1, md: 0 }, mr: 4, cursor: 'pointer' }} onClick={() => onNavigate('home')}>
              <LibraryMusic sx={{ color: 'primary.main', fontSize: 32, mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                sx={{
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.1rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                DJ<GradientText>SOCIETY</GradientText>
              </Typography>
            </Box>

            {/* Desktop Nav */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  onClick={() => onNavigate(item.value)}
                  sx={{ my: 2, color: 'text.secondary', display: 'block', '&:hover': { color: 'primary.main' } }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>

            {/* User Menu / Auth Buttons */}
            <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
              {user ? (
                <>
                  <Button 
                    startIcon={<GraphicEq />} 
                    variant="outlined" 
                    color="primary"
                    onClick={() => onNavigate('create')}
                    size="small"
                  >
                    Publish Mix
                  </Button>
                  <IconButton onClick={handleMenu} sx={{ p: 0, border: '2px solid transparent', '&:hover': { border: '2px solid #00e5ff' } }}>
                    <Avatar />
                  </IconButton>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    keepMounted
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    PaperProps={{ sx: { bgcolor: 'background.paper', border: '1px solid rgba(255,255,255,0.1)' } }}
                  >
                    <MenuItem onClick={() => { handleClose(); onNavigate('profile'); }}>
                      <ListItemIcon><Person fontSize="small" /></ListItemIcon>
                      <ListItemText>Profile</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={() => { handleClose(); onNavigate('create'); }}>
                      <ListItemIcon><Settings fontSize="small" /></ListItemIcon>
                      <ListItemText>Settings</ListItemText>
                    </MenuItem>
                    <Divider />
                    <DesktopLogoutMenuItem 
                        onClose={handleClose} 
                        onOpenConfirm={handleConfirmOpen} 
                    />
                  </Menu>
                </>
              ) : (
                <>
                  <Button color="inherit" onClick={() => onNavigate('login')}>Login</Button>
                  <Button variant="contained" color="primary" onClick={() => onNavigate('signup')}>Join Now</Button>
                </>
              )}
            </Box>

            {/* Mobile Menu Icon */}
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton size="large" onClick={handleDrawerToggle} color="inherit">
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer (Using existing LogoutButton logic) */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250, bgcolor: 'background.default' },
        }}
      >
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', pt: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', pr: 2 }}>
            <IconButton onClick={handleDrawerToggle}><CloseIcon /></IconButton>
          </Box>
          <List>
            {navItems.map((item) => (
              <ListItem key={item.label} disablePadding>
                <Button fullWidth onClick={() => onNavigate(item.value)} sx={{ py: 1.5, color: 'text.primary' }}>
                  {item.label}
                </Button>
              </ListItem>
            ))}
            <Divider sx={{ my: 2 }} />
            {user ? (
               <>
                <ListItem disablePadding>
                  <Button fullWidth onClick={() => onNavigate('profile')}>My Profile</Button>
                </ListItem>
                <ListItem disablePadding sx={{ px: 2, pb: 2 }}>
                  <LogoutButton 
                    onLogoutSuccess={() => { onLogout(); handleDrawerToggle(); }} 
                    fullWidth 
                  />
                </ListItem>
               </>
            ) : (
               <>
                <ListItem disablePadding><Button fullWidth onClick={() => onNavigate('login')}>Login</Button></ListItem>
                <ListItem disablePadding><Button fullWidth variant="contained" onClick={() => onNavigate('signup')}>Join Now</Button></ListItem>
               </>
            )}
          </List>
        </Box>
      </Drawer>
      
      {/* Logout Confirmation Dialog with modern styling */}
      <Dialog 
        open={confirmOpen} 
        onClose={handleConfirmClose} 
        fullWidth 
        maxWidth="xs"
        PaperProps={{ 
            sx: { 
                bgcolor: 'background.paper', 
                // Enhanced border for a more defined look
                border: '1px solid',
                borderColor: 'rgba(255,255,255,0.2)', 
                borderRadius: theme.shape.borderRadius, // Use theme's border radius
                boxShadow: '0px 8px 24px rgba(0,0,0,0.5)', // Deeper shadow
                background: `linear-gradient(to bottom right, ${theme.palette.background.paper}, #1a1a2e 80%)`, // Subtle gradient background
                position: 'relative', // Needed for pseudo-elements if we go with more complex border effects
            } 
        }}
      >
        <DialogTitle sx={{ 
            color: 'primary.main', // Changed to primary for a "confirm" feel, not "error" yet
            fontWeight: 'bold', 
            fontSize: '1.4rem',
            pb: 1, // Less padding at bottom
        }}>
            Confirm Logout
        </DialogTitle>
        <DialogContent sx={{ pb: 3 }}> {/* Increased bottom padding */}
            <Typography variant="body1" color="text.secondary">Are you sure you want to log out of your account?</Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2, justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.08)' }}> {/* Spaced out buttons, subtle divider */}
            <Button 
                onClick={handleConfirmClose} 
                color="inherit" 
                disabled={isLoggingOut}
                sx={{ 
                    // Custom style for cancel button
                    textTransform: 'none', 
                    fontWeight: 'bold',
                    '&:hover': {
                        bgcolor: 'rgba(255,255,255,0.08)',
                    }
                }}
            >
                Cancel.
            </Button>
            <Button 
                onClick={handleConfirmLogout} 
                variant="contained" 
                color="error" // Keep error for the "destructive" action
                startIcon={isLoggingOut ? <CircularProgress size={20} color="inherit" /> : <Logout />}
                disabled={isLoggingOut}
                sx={{ 
                    textTransform: 'none', 
                    fontWeight: 'bold',
                    py: 1, // Slightly more vertical padding
                    px: 3, // More horizontal padding
                    // Custom gradient for the button if desired, or stick to default contained
                    background: isLoggingOut ? theme.palette.error.dark : `linear-gradient(45deg, ${theme.palette.error.main} 30%, #ff5252 90%)`,
                    '&:hover': {
                         boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                         // Keep background on hover for gradient effect
                         background: isLoggingOut ? theme.palette.error.dark : `linear-gradient(45deg, ${theme.palette.error.dark} 30%, #ff6e6e 90%)`,
                    }
                }}
            >
                {isLoggingOut ? 'Logging Out...' : 'Logout'}
            </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};