import type { DjProfileFormData } from "../interfaces/userTypes";

export const SIGNUP_LABELS = {
    join: 'Join The Society',
    portfolio: 'Create your portfolio in seconds',
    create: 'Create Account',
    already: 'Already have an account?',
    login: 'Log In'
};

export const BACKEND_URL = 'http://localhost:4941/api/v1';

export const TOKEN_KEY = 'token';
export const USER_ID_KEY = 'userId'; 

export const initialProfile: DjProfileFormData = {
    djName: '',
    bio: '',
    location: '',
    genres: [],
    equipment: '',
    soundcloudUrl: '',
    instagramUrl: '',
    avatarFile: 'https://placehold.co/128x128/333333/ffffff?text=AVATAR',
    bannerFile: 'https://placehold.co/1200x300/333333/ffffff?text=BANNER'
};