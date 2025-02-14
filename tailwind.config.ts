import type { Config } from "tailwindcss";
const plugin = require("tailwindcss/plugin");

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        'custom-pattern': 'repeating-radial-gradient(circle at 0 0, transparent 0, #22abd5 32px), repeating-linear-gradient(#171b88, #171b88)',
      },
      minWidth: {
        '380': '380px', 
      },
    },
  },
  plugins: [
    require("daisyui"),
    plugin(function ({ addUtilities }: { addUtilities: (utilities: Record<string, any>) => void }) {
      addUtilities({
        ".custom-bg": {
          background: `
            47px 47px/calc(2*47px) calc(2*47px) conic-gradient(at calc(500%/6) 50%,#47d3ff 25%,#0000 0),
            0 0/calc(2*47px) calc(2*47px) conic-gradient(at calc(500%/6) 50%,#47d3ff 25%,#0000 0),
            47px 47px/calc(2*47px) calc(2*47px) conic-gradient(at calc(200%/3) 50%,#5f61b0 25%,#0000 0),
            0 0/calc(2*47px) calc(2*47px) conic-gradient(at calc(200%/3) 50%,#5f61b0 25%,#0000 0),
            repeating-conic-gradient(#383971 0 25%,#0000 0 50%) 0 0/calc(2*47px) calc(2*47px),
            linear-gradient(#383971 calc(100%/3),#5f61b0 0 calc(200%/3),#47d3ff 0) 0 0/47px 47px
          `,
        },
      });
    }),
  ],
} satisfies Config;
