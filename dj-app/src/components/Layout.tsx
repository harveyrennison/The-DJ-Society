import { Box } from '@mui/material';
import type { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    return (
        <Box>
            {children}
        </Box>
    );
};

export default Layout;
