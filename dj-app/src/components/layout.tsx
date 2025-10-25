import React, { ReactNode } from 'react';
import { Box } from "@mui/material";

type LayoutProps = {
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
