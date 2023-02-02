import { defineConfig, presetIcons, presetUno } from "unocss";
import presetWebFonts from "@unocss/preset-web-fonts";

export default defineConfig({
  presets: [
    presetWebFonts({
      provider: "google",
      fonts: {
        nunito: "Nunito",
      },
    }),
  ],
});
