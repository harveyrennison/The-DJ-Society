// src/services/loginService.ts (or wherever you prefer to place services)

import axios from "axios";
import { BACKEND_URL } from "../../constants/strings";
import type {
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
} from "../../session/interfaces"; // Assuming LoginResponse is defined here

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

export const RegisterUser = async (
    data: RegisterRequest
): Promise<RegisterResponse> => {
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

export const LogoutUser = async (token: string): Promise<void> => {
    // Use 'void' since the backend returns 200/no content
    try {
        await axios.post(
            `${BACKEND_URL}/users/logout`,
            {},
            {
                headers: {
                    "X-Authorization": token,
                },
            }
        );
        return;
    } catch (error) {
        throw error;
    }
};
