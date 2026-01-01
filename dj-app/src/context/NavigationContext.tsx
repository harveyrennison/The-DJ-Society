import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import type { Page } from "../interfaces/types";

interface NavigationContextType {
    currentPage: Page;
    navigate: (page: Page) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(
    undefined
);

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
    const getPageFromUrl = (): Page => {
        const path = window.location.pathname.replace("/", "");
        return (path || "home") as Page;
    };

    const [currentPage, setCurrentPage] = useState<Page>(getPageFromUrl());

    useEffect(() => {
        const handlePopState = () => setCurrentPage(getPageFromUrl());
        window.addEventListener("popstate", handlePopState);
        return () => window.removeEventListener("popstate", handlePopState);
    }, []);

    const navigate = (page: Page) => {
        const path = `/${page}`;
        window.history.pushState({}, "", path);
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    return (
        <NavigationContext.Provider value={{ currentPage, navigate }}>
            {children}
        </NavigationContext.Provider>
    );
};

// Hook for components to use
export const useUrlBuilder = () => {
    const context = useContext(NavigationContext);
    if (!context)
        throw new Error("useUrlBuilder must be used within NavigationProvider");
    return context;
};
