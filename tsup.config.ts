import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'dist',
  format: ['cjs', 'esm'],
  dts: {
    resolve: false,
  },
  clean: true,
  splitting: false,
  treeshake: true,
});
