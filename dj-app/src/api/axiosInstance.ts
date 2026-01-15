import axios from "axios";
import { getAuth } from "firebase/auth";
import { BACKEND_URL } from "../constants/strings";

const api = axios.create({
    baseURL: BACKEND_URL,
});

api.interceptors.request.use(async (config) => {
    const user = getAuth().currentUser;
    if (user) {
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
