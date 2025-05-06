import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom', // or 'node' based on your test requirements
    include: ['**/*.{test,spec}.[jt]sx?'],
    exclude: ['node_modules', 'dist', 'cypress', '**/.{idea,git,cache,output,temp}/**'],
  },
});