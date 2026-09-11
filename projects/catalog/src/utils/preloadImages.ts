import { getImageUrl } from './image';

export const preloadImages = (urls, timeoutMs = 500) => {
    if (!urls.length) return Promise.resolve();
    const imagePromises = urls.map((url) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = getImageUrl(url);
            img.onload = () => resolve();
            img.onerror = () => resolve();
        });
    });
    const timeoutPromise = new Promise((resolve) => {
        setTimeout(resolve, timeoutMs);
    });
    return Promise.race([
        Promise.all(imagePromises),
        timeoutPromise,
    ]).then(() => undefined);
};