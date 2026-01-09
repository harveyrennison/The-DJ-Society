export const BACKEND_URL = "http://localhost:4941/api/v1";

// UI Strings
export const CONFIRM_LOGOUT = "Confirm Logout";
export const LOGOUT_ACCOUNT_QUESTION = "Log out of your account?";
export const CANCEL = "Cancel";
export const LOGOUT = "Logout";
export const LOGGING_OUT_LOADING = "Logging Out...";
export const LOGIN = "Login";
export const MY_PROFILE = "My Profile";
export const JOIN_NOW = "Join Now";
export const SETTINGS = "Settings";
export const PROFILE = "Profile";
export const DJ_CAPS = "DJ";
export const SOCIETY_CAPS = "SOCIETY";

// Validation Rules
export const PASSWORD_LENGTH = 8;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const NAME_REGEX =
    /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;

// Error Messages
export const ERR_EMAIL_REQUIRED = "Email address is required";
export const ERR_EMAIL_INVALID = "Enter a valid email address";
export const ERR_PASSWORD_REQUIRED = "Password is required";
export const ERR_CURRENT_PASSWORD_REQUIRED = "Current password is required";
export const ERR_NEW_PASSWORD_REQUIRED = "New password is required";
export const ERR_PASSWORD_TOO_SHORT = `Password must be at least ${PASSWORD_LENGTH} characters long`;
export const ERR_PASSWORDS_MATCH =
    "New password must be different from current password";
export const ERR_NAME_INVALID = "Name contains invalid characters";

// DOB Error Messages
export const ERR_DOB_REQUIRED = "Date of birth is required";
export const ERR_DOB_INVALID_FORMAT = "Please enter a valid date";
export const ERR_DOB_FUTURE = "Date of birth cannot be in the future";
export const ERR_DOB_UNDERAGE = "You must be at least 18 years old";
export const ERR_DOB_TOO_OLD = "Please enter a valid year";
