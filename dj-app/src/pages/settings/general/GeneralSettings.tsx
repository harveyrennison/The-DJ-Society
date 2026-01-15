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
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useMemo, useRef } from "react";
import { useImageUpload } from "../../../helpers/useImageUpload";
import { validateGeneralSettings } from "../../../helpers/validation";
import { useForm } from "../../../hooks/useForm";
import type { User } from "../../../interfaces/userTypes";
import { UpdateUser } from "../../account/accountServices";
import {
    DATE_OF_BIRTH,
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
    user: User;
    onRegisterSave: (fn: () => Promise<void>, allowed: boolean) => void;
    isSavingChanges: boolean;
}

export const GeneralSettings = ({
    user,
    onRegisterSave,
    isSavingChanges,
}: GeneralSettingsProps) => {
    const initialValues = useMemo(
        () => ({
            firstName: user.firstName ?? null,
            lastName: user.lastName ?? null,
            email: user.email ?? null,
            dateOfBirth: user.dateOfBirth ?? null,
        }),
        [user.firstName, user.lastName, user.email, user.dateOfBirth]
    );

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

    const {
        formData,
        formErrors,
        setFormErrors,
        handleChange,
        setFieldValue,
        handleBlur,
        touched,
        touchAll,
    } = useForm(initialValues, (values) =>
        validateGeneralSettings(
            values.email,
            values.firstName,
            values.lastName,
            values.dateOfBirth
        )
    );

    const isDirty = useMemo(() => {
        return (
            (formData.firstName ?? null) !== (user.firstName ?? null) ||
            (formData.lastName ?? null) !== (user.lastName ?? null) ||
            (formData.email ?? null) !== (user.email ?? null) ||
            (formData.dateOfBirth ?? null) !== (user.dateOfBirth ?? null)
        );
    }, [formData, user]);

    const isValid = Object.keys(formErrors).length === 0;

    const handleUpdate = async () => {
        const errors = touchAll();

        if (Object.keys(errors).length > 0) return;

        try {
            await UpdateUser(user.userId, formData);
            const updatedUser = { ...user, ...formData };
            localStorage.setItem("dbUser", JSON.stringify(updatedUser));
            console.log("Saved and Cached!");
        } catch (error) {
            setFormErrors({
                form: "Failed to save changes. Please try again.",
            });
            throw error;
        }
    };

    const saveRef = useRef(handleUpdate);
    useEffect(() => {
        saveRef.current = handleUpdate;
    }, [handleUpdate]);

    useEffect(() => {
        onRegisterSave(async () => await saveRef.current(), isDirty && isValid);
    }, [onRegisterSave, isDirty, isValid]);

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
                <Typography variant="h6" mb={3}>
                    {GENERAL_INFO}
                </Typography>
                <Stack spacing={3}>
                    <Stack direction="row" spacing={2}>
                        <TextField
                            fullWidth
                            name="firstName"
                            label={FIRST_NAME}
                            value={formData.firstName || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.firstName && !!formErrors.firstName}
                            helperText={
                                touched.firstName && formErrors.firstName
                            }
                            disabled={isSavingChanges}
                        />
                        <TextField
                            fullWidth
                            name="lastName"
                            label={LAST_NAME}
                            value={formData.lastName || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.lastName && !!formErrors.lastName}
                            helperText={touched.lastName && formErrors.lastName}
                            disabled={isSavingChanges}
                        />
                    </Stack>
                    <TextField
                        fullWidth
                        label={EMAIL_ADDRESS}
                        name="email"
                        required
                        value={formData.email || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.email && !!formErrors.email}
                        helperText={touched.email && formErrors.email}
                        disabled={isSavingChanges}
                    />
                    <DatePicker
                        label={DATE_OF_BIRTH}
                        format="DD/MM/YYYY"
                        value={
                            formData.dateOfBirth
                                ? dayjs(formData.dateOfBirth)
                                : null
                        }
                        onChange={(newValue: Dayjs | null) => {
                            setFieldValue(
                                "dateOfBirth",
                                newValue && newValue.isValid()
                                    ? newValue.format("YYYY-MM-DD")
                                    : null
                            );
                        }}
                        maxDate={dayjs()}
                        slotProps={{
                            actionBar: {
                                actions: ["clear", "today"],
                            },
                            textField: {
                                fullWidth: true,
                                name: "dob",
                                onBlur: (e: any) => handleBlur(e),
                                error:
                                    touched.dateOfBirth &&
                                    !!formErrors.dateOfBirth,
                                helperText:
                                    (touched.dateOfBirth &&
                                        formErrors.dateOfBirth) ||
                                    " ",
                                disabled: isSavingChanges,
                            },
                        }}
                    />
                </Stack>
            </Paper>
        </Stack>
    );
};
