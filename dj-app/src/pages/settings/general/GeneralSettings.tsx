import { CloudUpload } from "@mui/icons-material";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { alpha } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useEffect, useRef } from "react";
import { useImageUpload } from "../../../helpers/useImageUpload";
import { validateGeneralSettings } from "../../../helpers/validation";
import { useForm } from "../../../hooks/useForm";
import {
    DEFAULT_IMAGE_ALLOWED_TYPES,
    DELETE,
    EMAIL_ADDRESS,
    FIRST_NAME,
    GENERAL_INFO,
    LAST_NAME,
    PROFILE_PICTURE,
    UPLOAD,
} from "../../strings";

interface GeneralSettingsProps {
    onRegisterSave: (fn: () => Promise<void>) => void;
    isSavingChanges: boolean;
}

export const GeneralSettings = ({
    onRegisterSave,
    isSavingChanges,
}: GeneralSettingsProps) => {
    const {
        previewUrl,
        selectedFile,
        fileInputRef,
        handleTriggerUpload,
        handleFileChange,
        handleRemoveImage,
        hasImage,
        allowedTypes,
        maxSizeMB,
    } = useImageUpload({
        maxSizeMB: 5,
        allowedTypes: DEFAULT_IMAGE_ALLOWED_TYPES,
    });

    const { formData, formError, setFormError, handleChange } = useForm({
        firstName: "Zeniath",
        lastName: "Producer",
        email: "zeniath@djsociety.com",
    });

    const handleUpdate = async () => {
        const errorMessage = validateGeneralSettings(
            formData.firstName,
            formData.lastName,
            formData.email
        );

        if (errorMessage) {
            setFormError(errorMessage);
            return;
        }

        try {
            setFormError("");
            if (selectedFile) {
                console.log("Uploading file to server now:", selectedFile.name);
                // Example: const formData = new FormData();
                // formData.append('file', selectedFile);
                // await axios.post('/upload', formData);
            }

            console.log("Saving General Info...", formData);
        } catch (error) {
            setFormError("Failed to save changes. Please try again.");
        }
    };

    const saveRef = useRef(handleUpdate);
    useEffect(() => {
        saveRef.current = handleUpdate;
    });

    useEffect(() => {
        onRegisterSave(async () => await saveRef.current());
    }, [onRegisterSave]);

    return (
        <Stack spacing={4}>
            <Paper
                sx={{
                    p: 4,
                    bgcolor: "background.paper",
                    border: "1px solid rgba(255,255,255,0.05)",
                }}
            >
                <Stack direction="row" spacing={4} alignItems="center">
                    <input
                        type="file"
                        hidden
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept={allowedTypes.join(",")}
                    />

                    <Box position="relative">
                        <Avatar
                            src={previewUrl || ""}
                            sx={{
                                width: 100,
                                height: 100,
                                boxShadow: `0 0 20px ${alpha("#00e5ff", 0.2)}`,
                                border: "2px solid",
                                borderColor: "primary.main",
                                opacity: isSavingChanges ? 0.4 : 1,
                                transition: "opacity 0.2s ease",
                            }}
                        />
                        {isSavingChanges && (
                            <CircularProgress
                                size={40}
                                sx={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    mt: "-20px",
                                    ml: "-20px",
                                }}
                            />
                        )}
                    </Box>
                    <Stack spacing={0.5}>
                        <Typography variant="h6">{PROFILE_PICTURE}</Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            pb={1}
                        >
                            {" "}
                            Allowed Image Types:{" "}
                            {allowedTypes
                                .map((t) => t.split("/")[1].toUpperCase())
                                .join(", ")}
                            . Max size of {maxSizeMB}MB.
                        </Typography>
                        <Stack
                            direction="row"
                            spacing={2}
                            justifyContent="flex-start"
                        >
                            <Button
                                variant="outlined"
                                endIcon={<CloudUpload />}
                                size="small"
                                onClick={handleTriggerUpload}
                                disabled={isSavingChanges}
                            >
                                {UPLOAD}
                            </Button>
                            <Button
                                color="error"
                                size="small"
                                onClick={handleRemoveImage}
                                disabled={!hasImage || isSavingChanges}
                            >
                                {DELETE}
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>
            </Paper>
            <Paper
                sx={{
                    p: 4,
                    bgcolor: "background.paper",
                    border: "1px solid rgba(255,255,255,0.05)",
                }}
            >
                <Typography variant="h6" sx={{ mb: 3 }}>
                    {GENERAL_INFO}
                </Typography>
                <Stack spacing={3}>
                    {formError && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {formError}
                        </Alert>
                    )}
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                        <TextField
                            fullWidth
                            name="firstName"
                            label={FIRST_NAME}
                            value={formData.firstName}
                            onChange={handleChange}
                            error={
                                !!formError &&
                                formError.toLowerCase().includes("name")
                            }
                        />
                        <TextField
                            fullWidth
                            label={LAST_NAME}
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            error={
                                !!formError &&
                                formError.toLowerCase().includes("name")
                            }
                        />
                    </Stack>
                    <TextField
                        fullWidth
                        label={EMAIL_ADDRESS}
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={
                            !!formError &&
                            formError.toLowerCase().includes("email")
                        }
                    />
                </Stack>
            </Paper>
        </Stack>
    );
};
