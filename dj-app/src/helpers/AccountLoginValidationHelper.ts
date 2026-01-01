import { EMAIL_REGEX, PASSWORD_LENGTH } from "../constants/strings";

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

    return null; // No errors
};
