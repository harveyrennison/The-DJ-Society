import {
    useEffect,
    useRef,
    useState,
    type ChangeEvent,
    type FocusEvent,
} from "react";

export const useForm = <T extends Record<string, any>>(
    initialState: T,
    validate?: (values: T) => Record<string, string>
) => {
    const [formData, setFormData] = useState<T>(initialState);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    const validateRef = useRef(validate);
    useEffect(() => {
        validateRef.current = validate;
    }, [validate]);

    useEffect(() => {
        if (validateRef.current) {
            const errors = validateRef.current(formData);
            if (JSON.stringify(errors) !== JSON.stringify(formErrors)) {
                setFormErrors(errors);
            }
        }
    }, [formData]);

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
