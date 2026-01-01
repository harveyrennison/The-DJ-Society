import Logout from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import { LOGGING_OUT_LOADING } from "../constants/strings";
import { theme } from "../theme/theme";

export interface DialogProps {
    open: boolean;
    disabled: boolean;
    dialogTitle: string;
    dialogContent: string;
    buttonLeftText: string;
    buttonRightText: string;
    buttonLeftPress: () => void;
    buttonRightPress: () => void;
}

export const DialogHelper = ({
    open,
    disabled,
    dialogTitle,
    dialogContent,
    buttonLeftText,
    buttonRightText,
    buttonLeftPress,
    buttonRightPress,
}: DialogProps) => {
    return (
        <Dialog
            open={open}
            onClose={buttonLeftPress}
            fullWidth
            maxWidth="xs"
            PaperProps={{
                sx: {
                    bgcolor: "background.paper",
                    border: "1px solid",
                    borderColor: "rgba(255,255,255,0.2)",
                    borderRadius: theme.shape.borderRadius,
                    boxShadow: "0px 8px 24px rgba(0,0,0,0.5)",
                    background: `linear-gradient(to bottom right, ${theme.palette.background.paper}, #1a1a2e 80%)`,
                    position: "relative",
                },
            }}
        >
            <DialogTitle
                pb={1}
                sx={{
                    color: "primary.main",
                    fontWeight: "bold",
                    fontSize: "1.4rem",
                }}
            >
                {dialogTitle}
            </DialogTitle>
            <DialogContent sx={{ pb: 3 }}>
                <Typography variant="body1" color="text.secondary">
                    {dialogContent}
                </Typography>
            </DialogContent>
            <DialogActions
                sx={{
                    p: 2,
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(255,255,255,0.08)",
                }}
            >
                <Button
                    onClick={buttonLeftPress}
                    color="inherit"
                    disabled={disabled}
                    sx={{
                        textTransform: "none",
                        fontWeight: "bold",
                        "&:hover": { bgcolor: "rgba(255,255,255,0.08)" },
                    }}
                >
                    {buttonLeftText}
                </Button>
                <Button
                    onClick={buttonRightPress}
                    variant="contained"
                    color="error"
                    startIcon={
                        disabled ? (
                            <CircularProgress size={20} color="inherit" />
                        ) : (
                            <Logout />
                        )
                    }
                    disabled={disabled}
                    sx={{
                        textTransform: "none",
                        fontWeight: "bold",
                        py: 1,
                        px: 3,
                        background: disabled
                            ? theme.palette.error.dark
                            : `linear-gradient(45deg, ${theme.palette.error.main} 30%, #ff5252 90%)`,
                        "&:hover": {
                            boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
                            background: disabled
                                ? theme.palette.error.dark
                                : `linear-gradient(45deg, ${theme.palette.error.dark} 30%, #ff6e6e 90%)`,
                        },
                    }}
                >
                    {disabled ? LOGGING_OUT_LOADING : buttonRightText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
