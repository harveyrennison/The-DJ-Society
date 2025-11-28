import { LogoutUser } from './accountServices';
import type { LoginResponse, RegisterResponse } from './interfaces';
import { TOKEN_KEY, USER_ID_KEY } from '../constants/strings'

/**
 * Saves the API token and user ID to localStorage after successful login/register.
 */
export const saveSession = (response: LoginResponse | RegisterResponse) => {
    // Saves the 'token' key from the response
    localStorage.setItem(TOKEN_KEY, response.token); 
    localStorage.setItem(USER_ID_KEY, response.userId.toString());
};


export const getToken = (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
};


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
    
    const token = getToken(); 
    
    if (token) {
        try {
            await LogoutUser(token);
            console.log("Token successfully invalidated on server via API.");
        } catch (error) {
            console.error("Server-side token invalidation failed:", error);
        }
    }

    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_ID_KEY); 
    
    console.log("Client-side session data cleared.");
    
    // 4. Implement state cleanup and redirection here
    // e.g., Set application-wide isLoggedIn state to false, redirect to '/login'
};