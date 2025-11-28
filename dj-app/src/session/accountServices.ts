// src/services/loginService.ts (or wherever you prefer to place services)

import axios from 'axios';
import { BACKEND_URL } from "../constants/strings";
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "./interfaces"; // Assuming LoginResponse is defined here

/**
 * Handles the user login API call.
 * @param data The email and password of the user.
 * @returns The login response containing token and userId.
 * @throws An error if the API call fails (e.g., 401, network error).
 */
export const LoginUser = async (data: LoginRequest): Promise<LoginResponse> => {
    try {
        const response = await axios.post<LoginResponse>(
            `${BACKEND_URL}/users/login`,
            data
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Handles the user registration API call.
 * @param data The email and password for the new user.
 * @returns The signup response containing token and userId.
 * @throws An error if the API call fails (e.g., 400 validation, network error).
 */
export const RegisterUser = async (data: RegisterRequest): Promise<RegisterResponse> => {
    try {
        const response = await axios.post<RegisterResponse>(
            `${BACKEND_URL}/users/register`,
            data
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const LogoutUser = async (token: string): Promise<void> => { // Use 'void' since the backend returns 200/no content
    try {
        await axios.post(
            `${BACKEND_URL}/users/logout`,
            {},
            {
                headers: {
                    'X-Authorization': token
                }
            }
        );
        return
    } catch (error) {
        // Re-throw the error for the component to handle (e.g., show an error message)
        throw error;
    }
};