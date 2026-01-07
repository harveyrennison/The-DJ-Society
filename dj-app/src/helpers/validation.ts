import { EMAIL_REGEX, NAME_REGEX, PASSWORD_LENGTH } from "../constants/strings";

export const validateAccountForm = (
    email: string,
    password: string
): string | null => {
    if (!email || !password) {
        return "Enter both an email and password.";
    }

    if (!EMAIL_REGEX.test(email)) {
        return "Enter a valid email address.";
    }

    if (password.length < PASSWORD_LENGTH) {
        return "Password must be at least 8 characters long.";
    }

    return null;
};

export const validateNewPasswordForm = (
    password: string,
    newPassword: string
): string | null => {
    if (!password || !newPassword) {
        return "Enter your current and new password.";
    }

    if (password.length < PASSWORD_LENGTH) {
        return "Password must be at least 8 characters long.";
    }

    return null;
};

export const validateGeneralSettings = (
    firstName: string,
    lastName: string,
    email: string
): string | null => {
    if (firstName.trim() && !NAME_REGEX.test(firstName)) {
        return "First name contains invalid characters.";
    }

    if (lastName.trim() && !NAME_REGEX.test(lastName)) {
        return "Last name contains invalid characters.";
    }

    if (!email) {
        return "Email address is required.";
    }
    if (!EMAIL_REGEX.test(email)) {
        return "Enter a valid email address.";
    }

    return null;
};
