import { defineConfig } from "react-doctor/api";

export default defineConfig({
  ignore: {
    overrides: [
      {
        files: ["src/shared/ui/lightbox.tsx"],
        rules: ["react-doctor/no-giant-component"],
      },
      {
        files: [
          "src/shared/ui/badge.tsx",
          "src/shared/ui/button-group.tsx",
          "src/shared/ui/button.tsx",
          "src/shared/ui/toggle.tsx",
        ],
        rules: ["react-doctor/only-export-components"],
      },
    ],
  },
});
