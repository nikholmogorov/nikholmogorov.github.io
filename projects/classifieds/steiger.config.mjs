import fsd from "@feature-sliced/steiger-plugin";
import { defineConfig } from "steiger";

export default defineConfig([
  ...fsd.configs.recommended,
  {
    rules: {
      // Один потребитель сам по себе не делает слайс лишним.
      "fsd/insignificant-slice": "off",

      // Названия сегментов оцениваем с учётом контекста проекта.
      "fsd/segments-by-purpose": "off",

      // _pages — намеренное решение для совместимости FSD с Next.js.
      "fsd/typo-in-layer-name": "off",
    },
  },
]);
