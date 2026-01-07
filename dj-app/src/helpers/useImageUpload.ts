import { useCallback, useMemo, useRef, useState } from "react";

export interface UploadOptionsProps {
    maxSizeMB?: number;
    allowedTypes?: string[];
}

export const useImageUpload = ({
    maxSizeMB = 5,
    allowedTypes = ["image/jpg", "image/png", "image/jpeg"],
}: UploadOptionsProps) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const hasImage = useMemo(() => !!previewUrl, [previewUrl]);

    const handleTriggerUpload = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    const handleFileChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            if (!file) return;

            if (!allowedTypes.includes(file.type)) {
                alert("File type not supported. Please use JPG or PNG.");
                return;
            }

            if (file.size > maxSizeMB * 1024 * 1024) {
                alert(`File is too large. Max size is ${maxSizeMB}MB.`);
                return;
            }

            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }

            // INSTANT PREVIEW: Create local URL and save file reference
            const objectUrl = URL.createObjectURL(file);
            setPreviewUrl(objectUrl);
            setSelectedFile(file);
        },
        [previewUrl, allowedTypes, maxSizeMB]
    );

    const handleRemoveImage = () => {
        setPreviewUrl(null);
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return {
        previewUrl,
        selectedFile,
        fileInputRef,
        handleTriggerUpload,
        handleFileChange,
        handleRemoveImage,
        hasImage,
        allowedTypes,
        maxSizeMB,
    };
};
