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
    useMediaQuery
} from '@mui/material';
import React, { useState } from 'react';

import type { HeaderProps, Page } from '../interfaces/types';
import { GradientText, theme } from '../theme/theme';

export const Header: React.FC<HeaderProps> = ({ user, onNavigate, onLogout }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const navItems: { label: string, value: Page }[] = [
    { label: 'Home', value: 'home' },
    { label: 'Directory', value: 'directory' },
    { label: 'Events', value: 'events' },
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
                    <Avatar alt={user.name} src={user.avatar} />
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
                    <MenuItem onClick={() => { handleClose(); onLogout(); }}>
                      <ListItemIcon><Logout fontSize="small" color="error" /></ListItemIcon>
                      <ListItemText sx={{ color: 'error.main' }}>Logout</ListItemText>
                    </MenuItem>
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

      {/* Mobile Drawer */}
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
                <ListItem disablePadding><Button fullWidth onClick={() => onNavigate('profile')}>My Profile</Button></ListItem>
                <ListItem disablePadding><Button fullWidth color="error" onClick={onLogout}>Logout</Button></ListItem>
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
    </>
  );
};