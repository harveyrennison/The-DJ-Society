const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validatePassword = (password: string): boolean => {
    return password.length >= 6;
};

export { validateEmail, validatePassword };
