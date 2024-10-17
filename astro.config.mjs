import { defineConfig } from "astro/config";
import { loadEnv } from "vite";

export default defineConfig({
  site: "https://happy-studio.netlify.app/",
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
  },
});