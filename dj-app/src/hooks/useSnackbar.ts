import { useCallback, useState } from "react";

export type SnackbarSeverity = "success" | "error" | "info" | "warning";

interface SnackbarState {
    open: boolean;
    message: string;
    severity: SnackbarSeverity;
}

export const useSnackbar = () => {
    const [snackbar, setSnackbar] = useState<SnackbarState>({
        open: false,
        message: "",
        severity: "success",
    });

    const showSnackbar = useCallback(
        (message: string, severity: SnackbarSeverity = "success") => {
            setSnackbar({ open: true, message, severity });
        },
        []
    );

    const hideSnackbar = useCallback(() => {
        setSnackbar((prev) => ({ ...prev, open: false }));
    }, []);

    return { snackbar, showSnackbar, hideSnackbar };
};
