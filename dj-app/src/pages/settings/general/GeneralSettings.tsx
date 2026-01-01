import { CloudUpload } from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { alpha } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useImageUpload } from "../../../helpers/useImageUpload";
import {
    DELETE,
    EMAIL_ADDRESS,
    FIRST_NAME,
    GENERAL_INFO,
    LAST_NAME,
    PROFILE_PICTURE,
    UPLOAD,
} from "../../strings";

export const GeneralSettings = () => {
    const {
        previewUrl,
        isUploading,
        fileInputRef,
        handleTriggerUpload,
        handleFileChange,
        handleRemoveImage,
        hasImage,
    } = useImageUpload({
        maxSizeMB: 5,
        allowedTypes: ["image/jpeg", "image/jpg", "image/png"],
    });

    return (
        <Stack spacing={4}>
            {/* SECTION: AVATAR */}
            <Paper
                sx={{
                    p: 4,
                    bgcolor: "background.paper",
                    border: "1px solid rgba(255,255,255,0.05)",
                }}
            >
                <Stack direction="row" spacing={4} alignItems="center">
                    {/* Hidden File Input linked to hook ref */}
                    <input
                        type="file"
                        hidden
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/jpeg, image/png"
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
                                // Dim the image while uploading
                                opacity: isUploading ? 0.4 : 1,
                                transition: "opacity 0.2s ease",
                            }}
                        />
                        {isUploading && (
                            <CircularProgress
                                size={40}
                                sx={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    marginTop: "-20px",
                                    marginLeft: "-20px",
                                    color: "primary.main",
                                }}
                            />
                        )}
                    </Box>
                    
                    <Box>
                        <Typography variant="h6" mb={1}>
                            {PROFILE_PICTURE}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 2 }}
                        >
                            JPG, GIF or PNG. Max size of 2MB.
                        </Typography>
                        <Stack
                            direction="row"
                            spacing={2}
                            justifyContent={{ xs: "center", sm: "flex-start" }}
                        >
                            <Button
                                variant="outlined"
                                startIcon={<CloudUpload />}
                                size="small"
                                onClick={handleTriggerUpload}
                                disabled={isUploading}
                            >
                                {isUploading ? "..." : UPLOAD}
                            </Button>
                            <Button
                                color="error"
                                size="small"
                                onClick={handleRemoveImage}
                                // Disabled if no image exists or if currently uploading
                                disabled={!hasImage || isUploading}
                            >
                                {DELETE}
                            </Button>
                        </Stack>
                    </Box>
                </Stack>
            </Paper>

            {/* SECTION: GENERAL INFO */}
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
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                        <TextField
                            fullWidth
                            label={FIRST_NAME}
                            defaultValue="Zeniath"
                        />
                        <TextField
                            fullWidth
                            label={LAST_NAME}
                            defaultValue="Producer"
                        />
                    </Stack>
                    <TextField
                        fullWidth
                        label={EMAIL_ADDRESS}
                        defaultValue="zeniath@djsociety.com"
                    />
                </Stack>
            </Paper>
        </Stack>
    );
};
