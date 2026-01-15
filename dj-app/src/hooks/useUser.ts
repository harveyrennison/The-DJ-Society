import { useEffect, useRef, useState } from "react";
import api from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";

export const useUser = () => {
    const { user: firebaseUser, loading: authLoading } = useAuth();
    const [userData, setUserData] = useState<any>(() => {
        const saved = localStorage.getItem("dbUser");
        return saved ? JSON.parse(saved) : null;
    });
    const [isLoading, setIsLoading] = useState(true);
    const fetchedUserIdRef = useRef<string | null>(null);

    useEffect(() => {
        const databaseUserId = localStorage.getItem("databaseUserId");

        if (authLoading) {
            return;
        }

        if (!firebaseUser || !databaseUserId) {
            setUserData(null);
            setIsLoading(false);
            localStorage.removeItem("dbUser");
            return;
        }

        // Only fetch if we haven't fetched this user yet
        if (fetchedUserIdRef.current === databaseUserId) {
            return;
        }

        const fetchAdditionalUserData = async () => {
            if (!userData) setIsLoading(true);

            try {
                const response = await api.get(`/users/${databaseUserId}`);
                const dbUserData = response.data;

                setUserData(dbUserData);
                localStorage.setItem("dbUser", JSON.stringify(dbUserData));

                fetchedUserIdRef.current = databaseUserId;
            } catch (error: any) {
                console.error("Axios Error:", error.message);
                setUserData(null);
                fetchedUserIdRef.current = null;
            } finally {
                setIsLoading(false);
            }
        };
        fetchAdditionalUserData();
    }, [firebaseUser?.uid, authLoading]);

    return { user: userData, isLoading, uid: firebaseUser?.uid };
};
