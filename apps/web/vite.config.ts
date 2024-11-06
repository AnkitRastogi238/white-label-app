import { sveltekit } from '@sveltejs/kit/vite';

import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [sveltekit()],
  test: {
    exclude: [...configDefaults.exclude, 'e2e/*'],
    coverage: {
      provider: 'istanbul', // or 'c8'
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './tests/unit/coverage',
      include: ['src/lib/**'],
      exclude: ['src/lib/**/*-info.ts', 'src/lib/**/component-factory.ts', 'src/lib/**/*.info.ts'],
    },
    globals: true,
    environment: 'jsdom',
  },
  build: {
    commonjsOptions: {
      include: [/@white-label\/ui/, /node_modules/],
    },
  },
});
