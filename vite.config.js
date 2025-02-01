import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        product: resolve(__dirname, "src/product-pages/index.html"),
        listing: resolve(__dirname, "src/product-listing/index.html"),
        checkout: resolve(__dirname, "src/checkout/index.html"),
        checkedout: resolve(__dirname, "src/checkout/success.html"),
      },
    },
  },

  // Ensure Vite supports .mjs and .jsx files
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"), // Optional alias for cleaner imports
    },
  },

  server: {
    hmr: {
      overlay: false, // Optional: Disable HMR error overlay if it's blocking you
    },
  },

  // This plugin enables .mjs and JSX support (if needed)
  esbuild: {
    jsxFactory: "React.createElement", // Needed if you use React JSX
    jsxFragment: "React.Fragment", // Needed if you use React JSX
    loader: "jsx", // Allows JSX in .js files
  },
});
