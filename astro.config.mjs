import { defineConfig } from "astro/config";
import { loadEnv } from "vite";

export default defineConfig({
  output: "static",
  vite: {
    server: {
      host: '0.0.0.0',
      port: 4321
    },
    plugins: [
      {
        name: 'vite-plugin-env',
        config(config, {mode}) {
          const env = loadEnv(mode, process.cwd());
          config.define = {
            'process.env': env,
          };
        }
      }
    ],
    build: {
      rollupOptions: {
        output: {
          assetFileNames: "assets/styles.[hash][extname]",
        },
      },
    },
  },
});
