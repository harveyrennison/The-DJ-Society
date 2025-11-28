import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, CircularProgress } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import type { LogoutConfirmationProps } from '../../interfaces/props';

export const LogoutConfirmation = ({ confirmOpen, handleConfirmClose, handleConfirmLogout, isLoggingOut }: LogoutConfirmationProps) => {
  const theme = useTheme();

  return (
    <Dialog
      open={confirmOpen}
      onClose={handleConfirmClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        sx: {
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'rgba(255,255,255,0.2)',
          borderRadius: theme.shape.borderRadius,
          boxShadow: '0px 8px 24px rgba(0,0,0,0.5)',
          background: `linear-gradient(to bottom right, ${theme.palette.background.paper}, #1a1a2e 80%)`,
          position: 'relative',
        },
      }}
    >
      <DialogTitle
        sx={{
          color: 'primary.main',
          fontWeight: 'bold',
          fontSize: '1.4rem',
          pb: 1,
        }}
      >
        Confirm Logout
      </DialogTitle>

      <DialogContent sx={{ pb: 3 }}>
        <Typography variant="body1" color="text.secondary">
          Are you sure you want to log out of your account?
        </Typography>
      </DialogContent>

      <DialogActions
        sx={{
          p: 2,
          justifyContent: 'space-between',
          borderTop: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <Button
          onClick={handleConfirmClose}
          color="inherit"
          disabled={isLoggingOut}
          sx={{
            textTransform: 'none',
            fontWeight: 'bold',
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.08)',
            },
          }}
        >
          Cancel.
        </Button>

        <Button
          onClick={handleConfirmLogout}
          variant="contained"
          color="error"
          startIcon={
            isLoggingOut ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <Logout />
            )
          }
          disabled={isLoggingOut}
          sx={{
            textTransform: 'none',
            fontWeight: 'bold',
            py: 1,
            px: 3,
            background: isLoggingOut
              ? theme.palette.error.dark
              : `linear-gradient(45deg, ${theme.palette.error.main} 30%, #ff5252 90%)`,
            '&:hover': {
              boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
              background: isLoggingOut
                ? theme.palette.error.dark
                : `linear-gradient(45deg, ${theme.palette.error.dark} 30%, #ff6e6e 90%)`,
            },
          }}
        >
          {isLoggingOut ? 'Logging Out...' : 'Logout'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
