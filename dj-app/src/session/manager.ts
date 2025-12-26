import { LogoutUser } from "../pages/account/accountServices";
import type { LoginResponse, RegisterResponse } from "./interfaces";

// Define the keys used for localStorage consistently
const API_TOKEN_KEY = "token"; // CRITICAL: Matches the backend response key
const USER_ID_KEY = "userId";

/**
 * Saves the API token and user ID to localStorage after successful login/register.
 */
export const saveSession = (response: LoginResponse | RegisterResponse) => {
    // Saves the 'token' key from the response
    localStorage.setItem(API_TOKEN_KEY, response.token);
    localStorage.setItem(USER_ID_KEY, response.userId.toString());
};

/**
 * Retrieves the API token from localStorage for use in protected requests.
 */
export const getApiToken = (): string | null => {
    return localStorage.getItem(API_TOKEN_KEY);
};

/**
 * Retrieves the current user ID from localStorage.
 */
export const getUserId = (): number | null => {
    const id = localStorage.getItem(USER_ID_KEY);
    return id ? parseInt(id, 10) : null;
};

/**
 * Handles the complete client-side and server-side logout process.
 * Clears the token on the server and removes all local session data.
 */
export const handleClientSideLogout = async () => {
    console.log("Attempting client-side logout...");

    // 1. Retrieve the token from localStorage
    const apiToken = getApiToken();

    // 2. Server-side logout (if token exists)
    if (apiToken) {
        try {
            await LogoutUser(apiToken);
            console.log("Token successfully invalidated on server via API.");
        } catch (error) {
            // Log the error but proceed to clear local data.
            console.error("Server-side token invalidation failed:", error);
        }
    }

    // 3. CRITICAL: Clear all session data from localStorage
    localStorage.removeItem(API_TOKEN_KEY);
    localStorage.removeItem(USER_ID_KEY);

    console.log("Client-side session data cleared.");

    // 4. Implement state cleanup and redirection here
    // e.g., Set application-wide isLoggedIn state to false, redirect to '/login'
};
