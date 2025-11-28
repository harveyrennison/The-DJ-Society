import {
    LocationOn,
    Search
} from '@mui/icons-material';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Chip,
    Container,
    Grid,
    InputAdornment,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import React, { useState } from 'react';

import { DJS } from '../data/mockData';
import type { DirectoryPageProps } from "../interfaces/props";
import type { DJ } from '../interfaces/types';


export const DirectoryPage: React.FC<DirectoryPageProps> = ({ onSelectDj }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredDjs: DJ[] = DJS.filter((dj: DJ) => 
    dj.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    dj.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ py: 8, minHeight: '100vh', pt: 12 }}>
      <Container>
        <Typography variant="h3" sx={{ mb: 1 }}>DJ Directory</Typography>
        <Typography color="text.secondary" sx={{ mb: 6 }}>Find the perfect sound for your next event.</Typography>
        
        <TextField 
          fullWidth 
          variant="outlined" 
          placeholder="Search by name or genre..." 
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          sx={{ mb: 6, '& .MuiOutlinedInput-root': { borderRadius: 4 } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search color="primary" />
              </InputAdornment>
            ),
          }}
        />

        <Grid container spacing={4}>
          {filteredDjs.map((dj) => (
            <Grid sx={{ pt: { xs: '12px', md: '4px', sm: '6px' } }} key={dj.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', transition: '0.3s', '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 10px 30px rgba(0,229,255,0.15)' } }}>
                <Box sx={{ position: 'relative' }}>
                  <CardMedia component="img" height="300" image={dj.image} alt={dj.name} />
                  <Chip label={dj.genre} size="small" sx={{ position: 'absolute', top: 16, right: 16, bgcolor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }} />
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" gutterBottom fontWeight="bold">{dj.name}</Typography>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2, color: 'text.secondary' }}>
                    <LocationOn fontSize="small" />
                    <Typography variant="body2">{dj.location}</Typography>
                  </Stack>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {dj.bio}
                  </Typography>
                  <Button fullWidth variant="outlined" color="primary" onClick={() => onSelectDj(dj)}>View Portfolio</Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};