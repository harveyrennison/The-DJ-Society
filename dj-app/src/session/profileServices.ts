import axios from 'axios';
import { BACKEND_URL } from "../constants/strings";

import type { DJ } from "../interfaces/userTypes"; // <-- NEW: Import shared types
import type { DjProfileFormData } from '../interfaces/userTypes';

export const CreateDjProfile = async (
    token: string, 
    profileData: DjProfileFormData // <-- Uses the form data type
): Promise<DJ> => { // <-- Uses the full DJ model type
    try {
        const response = await axios.post<DJ>(
            `${BACKEND_URL}/profile`, // Assuming the profile endpoint is at /profiles
            profileData,
            {
                headers: {
                    'X-Authorization': token,
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const GetMyDjProfile = async (token: string): Promise<DJ> => {
    try {
        const response = await axios.get<DJ>(
            `${BACKEND_URL}/profile/me`,
            {
                headers: {
                    'X-Authorization': token
                }
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const GetDjProfileById = async (profileId: number): Promise<DJ> => {
    try {
        const response = await axios.get<DJ>(
            `${BACKEND_URL}/profile/${profileId}`
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};