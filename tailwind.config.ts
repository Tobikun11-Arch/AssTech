import type { Config } from "tailwindcss";
const plugin = require("tailwindcss/plugin");

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		backgroundImage: {
  			'custom-pattern': 'repeating-radial-gradient(circle at 0 0, transparent 0, #22abd5 32px), repeating-linear-gradient(#171b88, #171b88)'
  		},
  		minWidth: {
  			'380': '380px'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
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
      require("tailwindcss-animate")
],
} satisfies Config;
