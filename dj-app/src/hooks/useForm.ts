import { useState, type ChangeEvent } from "react";

export const useForm = <T extends Record<string, any>>(initialState: T) => {
    const [formData, setFormData] = useState<T>(initialState);
    const [formError, setFormError] = useState("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        
        if (formError) {
            setFormError("");
        }
    };

    return {
        formData,
        setFormData,
        formError,
        setFormError,
        handleChange,
    };
};
