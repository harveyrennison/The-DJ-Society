import {
    EMAIL_REGEX,
    ERR_CURRENT_PASSWORD_REQUIRED,
    ERR_DOB_FUTURE,
    ERR_DOB_INVALID_FORMAT,
    ERR_DOB_TOO_OLD,
    ERR_DOB_UNDERAGE,
    ERR_EMAIL_INVALID,
    ERR_EMAIL_REQUIRED,
    ERR_NAME_INVALID,
    ERR_NEW_PASSWORD_REQUIRED,
    ERR_PASSWORD_REQUIRED,
    ERR_PASSWORD_TOO_SHORT,
    ERR_PASSWORDS_MATCH,
    NAME_REGEX,
    PASSWORD_LENGTH,
} from "../constants/strings";

export const validateDOB = (dob: string): string | null => {
    if (!dob) return null;

    const birthDate = new Date(dob);
    const today = new Date();

    if (isNaN(birthDate.getTime())) {
        return ERR_DOB_INVALID_FORMAT;
    }

    if (birthDate > today) {
        return ERR_DOB_FUTURE;
    }

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
    }

    if (age < 18) {
        return ERR_DOB_UNDERAGE;
    }

    if (age > 120) {
        return ERR_DOB_TOO_OLD;
    }

    return null;
};

export const validateAccountForm = (
    email: string,
    password: string
): Record<string, string> => {
    const errors: Record<string, string> = {};

    if (!email || !email.trim()) {
        errors.email = ERR_EMAIL_REQUIRED;
    } else if (!EMAIL_REGEX.test(email.trim())) {
        errors.email = ERR_EMAIL_INVALID;
    }

    if (!password) {
        errors.password = ERR_PASSWORD_REQUIRED;
    } else if (password.length < PASSWORD_LENGTH) {
        errors.password = ERR_PASSWORD_TOO_SHORT;
    }

    return errors;
};

export const validateNewPasswordForm = (
    password: string,
    newPassword: string
): Record<string, string> => {
    const errors: Record<string, string> = {};

    if (!password && !newPassword) return errors;

    if (!password) errors.password = ERR_CURRENT_PASSWORD_REQUIRED;

    if (!newPassword) {
        errors.newPassword = ERR_NEW_PASSWORD_REQUIRED;
    } else if (newPassword.length < PASSWORD_LENGTH) {
        errors.newPassword = ERR_PASSWORD_TOO_SHORT;
    }

    if (password && newPassword && password === newPassword) {
        errors.newPassword = ERR_PASSWORDS_MATCH;
    }

    return errors;
};

export const validateGeneralSettings = (
    firstName: string,
    lastName: string,
    email: string,
    dob: string
): Record<string, string> => {
    const errors: Record<string, string> = {};

    if (firstName.trim() && !NAME_REGEX.test(firstName.trim())) {
        errors.firstName = ERR_NAME_INVALID;
    }

    if (lastName.trim() && !NAME_REGEX.test(lastName.trim())) {
        errors.lastName = ERR_NAME_INVALID;
    }

    if (!email || !email.trim()) {
        errors.email = ERR_EMAIL_REQUIRED;
    } else if (!EMAIL_REGEX.test(email.trim())) {
        errors.email = ERR_EMAIL_INVALID;
    }

    const dobError = validateDOB(dob);
    if (dobError) {
        errors.dob = dobError;
    }

    return errors;
};
