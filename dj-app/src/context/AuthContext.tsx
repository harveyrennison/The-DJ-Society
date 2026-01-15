import { initializeApp } from "firebase/app";
import type { Auth, User } from "firebase/auth";
import {
    getAuth,
    onAuthStateChanged,
    signInWithCustomToken,
    signOut,
} from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import config from "../../secrets/firebase-config.json";
import type { AuthContextType } from "../interfaces/types";

declare const __firebase_config: string | undefined;
declare const __initial_auth_token: string | undefined;

const firebaseConfig = config;
const initialAuthToken =
    typeof __initial_auth_token !== "undefined" ? __initial_auth_token : null;

const firebaseApp = initializeApp(firebaseConfig);
const authInstance: Auth = getAuth(firebaseApp);
export const dbInstance: Firestore = getFirestore(firebaseApp);

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(() => {
        const saved = localStorage.getItem("firebaseUser");
        return saved ? JSON.parse(saved) : null;
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(authInstance, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                setError(false);
                localStorage.setItem(
                    "firebaseUser",
                    JSON.stringify(currentUser)
                );
            } else {
                setUser(null);
                localStorage.removeItem("firebaseUser");
                localStorage.removeItem("dbUser");
                localStorage.removeItem("databaseUserId");
            }
            setLoading(false);
        });

        if (initialAuthToken && !authInstance.currentUser) {
            signInWithCustomToken(authInstance, initialAuthToken).catch(
                (err) => {
                    console.error(err);
                    setError(true);
                    setLoading(false);
                }
            );
        } else {
            setLoading(false);
        }

        return () => unsubscribe();
    }, []);

    const login = async (token: string, databaseUserId: string) => {
        setError(false);
        try {
            await signInWithCustomToken(authInstance, token);
            localStorage.setItem("databaseUserId", databaseUserId);
        } catch (error) {
            setError(true);
            throw new Error("Authentication failed");
        }
    };

    const logout = async () => {
        try {
            await signOut(authInstance);
            localStorage.removeItem("databaseUserId");
            localStorage.removeItem("firebaseUser");
            localStorage.removeItem("dbUser");
            setUser(null);
        } catch (error) {
            console.error(error);
        }
    };

    const value: AuthContextType = {
        user,
        userId: user?.uid || null,
        loading,
        error,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};
