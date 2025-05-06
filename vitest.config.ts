import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['**/*.test.{js,ts,jsx,tsx}'],
    exclude: ['node_modules', 'dist', 'cypress', '**/.{idea,git,cache,output,temp}/**'],
  },
});