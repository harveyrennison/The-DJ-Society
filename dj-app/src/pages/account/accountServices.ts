import axios from "axios";
import api from "../../api/axiosInstance";
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

export const GoogleLoginUser = async (
    idToken: string
): Promise<LoginResponse> => {
    try {
        const response = await axios.post<LoginResponse>(
            `${BACKEND_URL}/users/google-login`,
            { idToken }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const LogoutUser = async (): Promise<void> => {
    try {
        await api.post("/users/logout", {});
        return;
    } catch (error) {
        throw error;
    }
};

export const UpdateUser = async (
    userId: string,
    formData: any
): Promise<void> => {
    try {
        await api.patch(`/users/${userId}`, formData);
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.error("Backend Validation Error:", error.response.data);
        }
        throw error;
    }
};
