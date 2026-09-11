import { getImageUrl } from './image';

export const preloadImages = (urls: string[], timeoutMs: number = 500): Promise<void> => {
    if (!urls.length) return Promise.resolve();

    const imagePromises: Promise<void>[] = urls.map((url: string) => {
        return new Promise<void>((resolve) => {
            const img = new Image();
            img.src = getImageUrl(url);
            img.onload = () => resolve();
            img.onerror = () => resolve();
        });
    });

    const timeoutPromise = new Promise<void>((resolve) => {
        setTimeout(resolve, timeoutMs);
    });

    return Promise.race([
        Promise.all(imagePromises),
        timeoutPromise,
    ]).then(() => undefined);
};