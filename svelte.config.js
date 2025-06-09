import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      // Opcional, para SPA puro:
      fallback: 'index.html'
    }),
    alias: {
      $stores: path.resolve('./src/stores'),
      $components: path.resolve('./src/lib/components'),
      $types: path.resolve('./src/lib/types')
    }
  }
};

export default config;
