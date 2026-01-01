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
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const hasImage = useMemo(() => !!previewUrl, [previewUrl]);

    // 1. Trigger the hidden file input
    const handleTriggerUpload = useCallback(() => {
        fileInputRef.current?.click();
    }, []);
    // 2. Process the file

    const handleFileChange = useCallback(
        async (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            if (!file) return;

            // 1. Validation Logic
            if (!allowedTypes.includes(file.type)) {
                alert("File type not supported. Please use JPG or PNG.");
                return;
            }

            if (file.size > maxSizeMB * 1024 * 1024) {
                alert(`File is too large. Max size is ${maxSizeMB}MB.`);
                return;
            }

            // 2. State Sync: Update preview and start loading simultaneously
            const objectUrl = URL.createObjectURL(file);
            setPreviewUrl(objectUrl);
            setIsUploading(true);

            // 3. Execution
            try {
                // Simulated Upload Logic (Replace with your Axios call later)
                await new Promise((resolve) => setTimeout(resolve, 1500));
                console.log("Uploaded successfully:", file.name);
            } catch (error) {
                console.error("Upload failed", error);
                // Optional: Reset preview if the server-side upload fails
                setPreviewUrl(null);
            } finally {
                setIsUploading(false);
            }
        },
        [allowedTypes, maxSizeMB]
    ); // Dependencies for memoization

    const handleRemoveImage = async () => {
        try {
            // Add axios.delete logic here if needed
            setPreviewUrl(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
            console.log("Image removed");
        } catch (error) {
            console.error("Removal failed", error);
        }
    };

    return {
        previewUrl,
        isUploading,
        fileInputRef,
        handleTriggerUpload,
        handleFileChange,
        handleRemoveImage,
        hasImage,
        setPreviewUrl,
    };
};

// export const UploadProfilePicture = async (
//     data: ProfilePictureRequest,
//     userId: string
// ): Promise<ProfilePictureResponse> => {
//     try {
//         const response = await axios.post<ProfilePictureResponse>(
//             `${BACKEND_URL}/users/${userId}/image?timestamp=${Date.now()}`,
//             data
//         );
//         return response.data;
//     } catch (error) {
//         throw error;
//     }
// };
