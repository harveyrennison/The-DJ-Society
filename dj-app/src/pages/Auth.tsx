import React, { useState, useCallback } from 'react';
import { LoginPage } from './Login'; // Assuming these are in the same directory or linked correctly
import { SignupPage } from './Signup';

// You can define a type for the possible views
type AuthView = 'login' | 'signup';

// Define the core functional component
export const Auth: React.FC = () => {
    // State to determine which component to show: 'login' or 'signup'
    const [currentView, setCurrentView] = useState<AuthView>('login');

    // Handler for switching the view (e.g., from Login to Signup)
    const handleSwitch = useCallback(() => {
        setCurrentView((prevView) => (prevView === 'login' ? 'signup' : 'login'));
    }, []);

    // Placeholder function for handling the form submission logic (login or signup)
    const handleSubmission = useCallback(() => {
        if (currentView === 'login') {
            console.log('Attempting to log in...');
            // Add actual login logic here
        } else {
            console.log('Attempting to create account (signup)...');
            // Add actual signup logic here
        }
    }, [currentView]);

    // Render the appropriate component based on the current state
    return (
        <>
            {currentView === 'login' ? (
                <LoginPage 
                    onLogin={handleSubmission} // Triggers login logic
                    onSwitch={handleSwitch} // Switches to signup view
                />
            ) : (
                <SignupPage
                    onLogin={handleSubmission} // Triggers signup logic
                    onSwitch={handleSwitch} // Switches to login view
                />
            )}
        </>
    );
};