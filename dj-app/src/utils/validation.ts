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

export { validateEmail, validateUsername, validatePassword };
