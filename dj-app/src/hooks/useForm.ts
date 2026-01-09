import { useEffect, useState, type ChangeEvent, type FocusEvent } from "react";

export const useForm = <T extends Record<string, any>>(
    initialState: T,
    validate?: (values: T) => Record<string, string>
) => {
    const [formData, setFormData] = useState<T>(initialState);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    useEffect(() => {
        if (validate) {
            const errors = validate(formData);
            setFormErrors(errors);
        }
    }, [formData, validate]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const setFieldValue = (name: keyof T, value: any) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
        const { name } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
    };

    const touchAll = () => {
        const allTouched = Object.keys(formData).reduce((acc, key) => {
            acc[key] = true;
            return acc;
        }, {} as Record<string, boolean>);

        setTouched(allTouched);

        return validate ? validate(formData) : {};
    };

    return {
        formData,
        setFormData,
        formErrors,
        setFormErrors,
        touched,
        setTouched,
        handleChange,
        setFieldValue,
        handleBlur,
        touchAll,
    };
};
