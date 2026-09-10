import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig(({ mode }) => {
    const isSingleFile = mode === 'singlefile';

    return {
        plugins: [
            react(),
            isSingleFile && viteSingleFile(),
        ].filter(Boolean),
        // base: isSingleFile ? './' : '/',
        base: '/projects/zpo-naming/',
    };
});
