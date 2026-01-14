import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { AuthProvider } from "./context/AuthContext";
import { NavigationProvider } from "./context/NavigationContext";
import "./index.css";
import "./utils/firebase";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AuthProvider>
            <NavigationProvider>
                <App />
            </NavigationProvider>
        </AuthProvider>
    </StrictMode>
);
