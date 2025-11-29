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

export const INITIAL_PROFILE: DjProfileFormData = {
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

export const POPULAR_CITIES: string[] = [
    // Major Global Hubs
    'London, UK',
    'New York, USA',
    'Tokyo, Japan',
    'Berlin, Germany',
    'Sydney, Australia',
    'Rio de Janeiro, Brazil',
    'Cape Town, South Africa',
    'Mumbai, India',
    'Paris, France',
    'Shanghai, China',

    // Detailed New Zealand Cities (as requested)
    'Auckland, New Zealand',
    'Wellington, New Zealand',
    'Christchurch, New Zealand',
    'Hamilton, New Zealand',
    'Tauranga, New Zealand',
    'Dunedin, New Zealand',
    'Napier-Hastings, New Zealand',
    'Palmerston North, New Zealand',
    'Nelson, New Zealand',
    'Rotorua, New Zealand',
    'New Plymouth, New Zealand',
    'Invercargill, New Zealand',
    'Whangārei, New Zealand',
    'Gisborne, New Zealand',
];