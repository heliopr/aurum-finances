import { resolve } from "path"
import { defineConfig } from "vite"

export default defineConfig(({ mode }) => {
    const BASE_URL = (mode == "development" ? "/" : "/aurum-finances/")

    return {
        base: BASE_URL,
        root: "src",
        envDir: "../",
        build: {
            outDir: "../dist",
            emptyOutDir: true,
            rollupOptions: {
                input: {
                    main: resolve(__dirname, "src/index.html"),
                    entrar: resolve(__dirname, "src/entrar/index.html"),
                    financas: resolve(__dirname, "src/financas/index.html"),
                    sobre: resolve(__dirname, "src/sobre/index.html")
                }
            }
        },
    }
})