import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import react from "@vitejs/plugin-react";

const injectCodeFunction = (cssCode) => {
  try {
    if (typeof window === "undefined") return;

    var elementStyle = document.createElement("style");
    elementStyle.appendChild(document.createTextNode(cssCode));
    document.head.appendChild(elementStyle);
  } catch (e) {
    console.error("vite-plugin-css-injected-by-js", e);
  }
};

export default defineConfig({
  plugins: [
    react(),
    cssInjectedByJsPlugin({ injectCodeFunction }),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.tsx"),
      name: "react-native-voice-visualizer",
      fileName: "react-native-voice-visualizer",
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "react/jsx-runtime",
        },
      },
    },
  },
});
