import { defineConfig, type WxtViteConfig } from "wxt";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    permissions: ["contextMenus", "downloads", "tabs"],
    action: {},
  },
  webExt: {
    startUrls: ["https://the-formstore.com"],
  },
  modules: ["@wxt-dev/module-react"],
  alias: {
    "@": path.resolve(__dirname, "./src"), // or "./src" if using src directory
  },
  srcDir: "src",
  vite: () =>
    ({
      plugins: [tailwindcss()],
    } as WxtViteConfig),
});
