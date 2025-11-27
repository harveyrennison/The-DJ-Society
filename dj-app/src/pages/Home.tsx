import {
    GraphicEq,
    PlayArrow
} from '@mui/icons-material';
import {
    Box,
    Button,
    Card,
    CardMedia,
    Chip,
    Container,
    Grid,
    Stack,
    Typography
} from '@mui/material';
import React from 'react';

import { DJS } from '../data/mockData';
import type { HomePageProps } from '../interfaces/types';
import { GradientText, HeroSection } from '../theme/theme';


export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <HeroSection>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
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
                onClick={() => onNavigate('directory')}
                sx={{ py: 1.5, px: 4 }}
              >
                Explore DJs
              </Button>
              <Button 
                variant="outlined" 
                size="large"
                onClick={() => onNavigate('signup')}
                sx={{ py: 1.5, px: 4, borderColor: 'rgba(255,255,255,0.2)' }}
              >
                Create Portfolio
              </Button>
            </Stack>
          </Grid>
          <Grid sx={{ pt: { xs: '12px', md: '6px' }, position: 'relative', display: { xs: 'none', md: 'block' } }}>
            {/* Abstract Visual Elements */}
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
                 <CardMedia component="img" height="420" image={DJS[0].image} alt="DJ" />
                 <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: 2, background: 'linear-gradient(to top, black, transparent)' }}>
                    <Typography variant="h6">{DJS[0].name}</Typography>
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
                 <CardMedia component="img" height="420" image={DJS[1].image} alt="DJ" />
                  <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: 2, background: 'linear-gradient(to top, black, transparent)' }}>
                    <Typography variant="h6">{DJS[1].name}</Typography>
                 </Box>
               </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </HeroSection>
  );
};