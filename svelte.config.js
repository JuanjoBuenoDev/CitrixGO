import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		alias: {
			$stores: path.resolve('./src/stores'),
			// opcionalmente:
			$components: path.resolve('./src/lib/components'),
			$types: path.resolve('./src/lib/types')
		}
	}
};

export default config;
