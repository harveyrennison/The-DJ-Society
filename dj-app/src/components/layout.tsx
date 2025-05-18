import React, { ReactNode } from 'react';
import { Box } from "@mui/material";
import { useTheme } from '@mui/material/styles';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                pb: 6,
                minHeight: '100vh',
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            }}
        >
            {children}
        </Box>
    );
};

export default Layout;
