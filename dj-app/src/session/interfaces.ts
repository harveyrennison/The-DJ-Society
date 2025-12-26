export interface LoginResponse {
    firebaseToken: string;
    token: string;
    userId: string;
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
