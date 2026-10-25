import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

export default defineConfig({
    // Relative so the build works under the /lifters-log/ GitHub Pages subpath
    base: './',
    plugins: [preact()],
});
