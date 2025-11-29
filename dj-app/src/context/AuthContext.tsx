import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import config from "../../secrets/firebase-config.json"

// Declare global variables provided by the Canvas platform
declare const __firebase_config: string | undefined;
declare const __initial_auth_token: string | undefined;

// Firebase imports
import { initializeApp } from 'firebase/app';
import type { Auth, User } from 'firebase/auth';
import {
    getAuth,
    onAuthStateChanged,
    signInAnonymously,
    signInWithCustomToken,
    signOut,
} from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
// import { getAnalytics } from "firebase/analytics"; // Keep if planning to use analytics

import type { AuthContextType } from '../interfaces/types';

// Initialize context with an undefined default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// --- Firebase Initialization and Globals ---
const firebaseConfig = config
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

// Initialize Firebase services outside of the component to avoid re-initialization
const firebaseApp = initializeApp(firebaseConfig);
const authInstance: Auth = getAuth(firebaseApp);
const dbInstance: Firestore = getFirestore(firebaseApp);
(window as any).tempAuthInstance = authInstance;
// const analytics = getAnalytics(firebaseApp); // Uncomment if you intend to use Analytics

// dbInstance is accessed externally via useFirestore hook.


export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Derived state for convenience
    const userId = user ? user.uid : null;

    useEffect(() => {
        // 1. Set up Auth State Listener
        const unsubscribe = onAuthStateChanged(authInstance, (currentUser) => {
            setUser(currentUser);
            // Once the initial state is determined, stop loading
            setLoading(false);
        });

        // 2. Perform Initial Sign-in Attempt
        const initialSignIn = async () => {
            try {
                if (initialAuthToken) {
                    await signInWithCustomToken(authInstance, initialAuthToken);
                } else {
                    // Fallback to anonymous sign-in if no custom token is provided
                    await signInAnonymously(authInstance);
                }
            } catch (error) {
                console.error("Initial sign-in failed:", error);
            } finally {
                // Ensure loading is set to false even if sign-in failed
                setLoading(false); 
            }
        };

        initialSignIn();

        // Cleanup the listener when the component unmounts
        return () => unsubscribe();
    }, []); // Run only once on mount

    // --- CRITICAL STEP: FINAL LOGIN IMPLEMENTATION ---
    // This function receives the Custom Token minted by your backend and signs in the user.
    const login = async (token: string, newUserId: number) => {
        try {
            // newUserId is currently unused but kept for interface consistency
            console.log(`Received token for user ${newUserId}. Signing in with Firebase Custom Token...`);
            await signInWithCustomToken(authInstance, token);
            // The onAuthStateChanged listener will handle the state update upon success.
        } catch (error) {
            console.error("Firebase custom token sign-in failed:", error);
            throw new Error("Could not log in with token provided by backend.");
        }
    };

    const logout = async () => {
        try {
            await signOut(authInstance);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    // The context value now contains the Firebase User object and derived state
    const contextValue: AuthContextType = {
        user,
        userId,
        loading,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};