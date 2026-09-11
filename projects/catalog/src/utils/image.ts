export const getImageUrl = (path?: string): string => {
    if (!path) return `${import.meta.env.BASE_URL}images/no_photo.webp`;
    return `${import.meta.env.BASE_URL}${path}`;
};

export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = getImageUrl();
};