import { EMAIL_REGEX, NAME_REGEX, PASSWORD_LENGTH } from "../constants/strings";

export const validateAccountForm = (
    email: string,
    password: string
): Record<string, string> => {
    const errors: Record<string, string> = {};

    if (!email || !email.trim()) {
        errors.email = "Email address is required.";
    } else if (!EMAIL_REGEX.test(email.trim())) {
        errors.email = "Enter a valid email address.";
    }

    if (!password) errors.password = "Password is required.";
    else if (password.length < PASSWORD_LENGTH) {
        errors.password = `Password must be at least ${PASSWORD_LENGTH} characters long.`;
    }

    return errors;
};

export const validateNewPasswordForm = (
    password: string,
    newPassword: string
): Record<string, string> => {
    const errors: Record<string, string> = {};

    if (!password && !newPassword) return errors;

    if (!password) errors.password = "Current password is required.";

    if (!newPassword) {
        errors.newPassword = "New password is required.";
    } else if (newPassword.length < PASSWORD_LENGTH) {
        errors.newPassword = `Password must be at least ${PASSWORD_LENGTH} characters long.`;
    }

    if (password && newPassword && password === newPassword) {
        errors.newPassword =
            "New password must be different from current password.";
    }

    return errors;
};

export const validateGeneralSettings = (
    firstName: string,
    lastName: string,
    email: string
): Record<string, string> => {
    const errors: Record<string, string> = {};

    if (firstName?.trim() && !NAME_REGEX.test(firstName.trim())) {
        errors.firstName = "First name contains invalid characters.";
    }

    if (lastName?.trim() && !NAME_REGEX.test(lastName.trim())) {
        errors.lastName = "Last name contains invalid characters.";
    }

    if (!email || !email.trim()) {
        errors.email = "Email address is required.";
    } else if (!EMAIL_REGEX.test(email.trim())) {
        errors.email = "Enter a valid email address.";
    }

    return errors;
};
