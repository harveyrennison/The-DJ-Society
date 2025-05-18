import React from "react";
import { Box, Typography, Button, Grid, Card, CardContent, CardMedia, useTheme } from "@mui/material";
import { MusicNote, Event, Group, LibraryMusic } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <Box sx={{ p: 4 }}>
            {/* Hero Section */}
            <Box
                sx={{
                    textAlign: "center",
                    mb: 6,
                    py: 6,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    borderRadius: 4,
                    color: "white",
                    boxShadow: 12,
                    textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
                }}
            >
                <Typography variant="h3" fontWeight="bold" gutterBottom>
                    Welcome to The DJ Society
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Unite, create, and perform. Where DJs meet music enthusiasts.
                </Typography>
                <Button
                    variant="contained"
                    size="large"
                    sx={{ mt: 3,
                        background: `linear-gradient(120deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                        "&:hover": {
                            boxShadow: 6
                        },
                        
                     }}
                    onClick={() => navigate("/register")}
                >
                    <Typography
                        component="span"
                        sx={{
                        transition: "font-size 0.3s ease",
                        "&:hover": {
                            fontSize: "1.1rem",
                        },
                        }}
                    >
                        Join the Community
                    </Typography>
                </Button>
            </Box>
        </Box>
    );
};

export default Home;
