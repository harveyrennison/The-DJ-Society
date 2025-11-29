import { PROHIBITED_KEYWORDS } from "../../secrets/offensive_words.ts"

const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validateUsername = (username: string): boolean => {
    const usernameRegex = /^[A-Za-z0-9_.]+$/;
    return username.length >= 4 && usernameRegex.test(username);
}

const validatePassword = (password: string): boolean => {
    return password.length >= 6;
};

export const validateLocation = (location: string): string | null => {
    const trimmedLocation = location.trim();
    if (!trimmedLocation) {
        return 'Location cannot be empty.';
    }
    if (trimmedLocation.length > 50) {
        return 'Location name is too long (max 50 characters).';
    }
    
    const lowerLocation = trimmedLocation.toLowerCase();

    if (PROHIBITED_KEYWORDS.some(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'i');
        return regex.test(lowerLocation);
    })) {
        return 'Input contains inappropriate language.';
    }

    return null;
};

export { validateEmail, validateUsername, validatePassword };
