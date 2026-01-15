export const splitDisplayName = (displayName: string | null) => {
    if (!displayName) return { firstName: "", lastName: "" };

    const parts = displayName.trim().split(/\s+/);
    const firstName = parts[0] || "";
    const lastName = parts.length > 1 ? parts.slice(1).join(" ") : "";

    return { firstName, lastName };
};
