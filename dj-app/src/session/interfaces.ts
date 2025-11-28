/**
 * @fileoverview Interface for the response received after a successful login API call.
 */

export interface LoginResponse {
    firebaseToken: string;
    token: string;
    userId: number;
}

export interface RegisterResponse extends LoginResponse {
    message: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest extends LoginRequest {}

export interface LogoutResponse {
    message: string; 
}