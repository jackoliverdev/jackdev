import type { Config } from "tailwindcss";

// Every colour points at a CSS variable in app/globals.css. Change it there.
const rgb = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;
const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
const scales = (names: string[]) =>
  Object.fromEntries(names.map((n) => [n, Object.fromEntries(steps.map((s) => [s, rgb(`${n}-${s}`)]))]));

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        // --- Site palette ---
        canvas: rgb("bg"),
        raised: rgb("raised"),
        well: rgb("well"),
        rule: { DEFAULT: rgb("rule"), strong: rgb("rule-strong") },
        fg: { DEFAULT: rgb("fg"), muted: rgb("fg-muted"), faint: rgb("fg-faint") },
        brand: { DEFAULT: rgb("brand"), hover: rgb("brand-hover"), ink: rgb("brand-ink") },
        "on-brand": rgb("on-brand"),
        signal: rgb("signal"),
        earth: { DEFAULT: rgb("earth"), ink: rgb("earth-ink") },

        // --- The five nature scales, 50 to 950, for anything the roles don't cover ---
        ...scales(["olive", "sage", "bone", "moss", "cocoa"]),

        // --- shadcn semantic tokens (dashboard and components/ui) ---
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          hover: "hsl(var(--primary-hover))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          hover: "hsl(var(--secondary-hover))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          secondary: "hsl(var(--accent-secondary))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
          border: "hsl(var(--card-border))",
        },

        // --- Older names kept so the dashboard keeps working ---
        ink: {
          950: "hsl(var(--ink-950))",
          900: "hsl(var(--ink-900))",
          800: "hsl(var(--ink-800))",
          700: "hsl(var(--ink-700))",
          600: "hsl(var(--ink-600))",
          500: "hsl(var(--ink-500))",
        },
        paper: {
          DEFAULT: "hsl(var(--paper))",
          dim: "hsl(var(--paper-dim))",
          faint: "hsl(var(--paper-faint))",
        },
        electric: {
          DEFAULT: "hsl(var(--electric))",
          bright: "hsl(var(--electric-bright))",
          deep: "hsl(var(--electric-deep))",
        },
        navy: {
          900: "hsl(var(--navy-900))",
          800: "hsl(var(--navy-800))",
          700: "hsl(var(--navy-700))",
          600: "hsl(var(--navy-600))",
        },
        grey: {
          50: "hsl(var(--grey-50))",
          100: "hsl(var(--grey-100))",
          200: "hsl(var(--grey-200))",
          300: "hsl(var(--grey-300))",
          400: "hsl(var(--grey-400))",
          500: "hsl(var(--grey-500))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "var(--radius-xl)",
        "2xl": "calc(var(--radius-xl) + 0.5rem)",
        frame: "var(--radius-frame)",
        control: "var(--radius-control)",
      },
      fontFamily: {
        sans: ["var(--font-archivo)", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        display: ["var(--font-archivo)", "ui-sans-serif", "sans-serif"],
      },
      fontSize: {
        // Fluid type scale. Headings get their tracking from globals.css.
        display: ["clamp(2.25rem, 5vw, 4.25rem)", { lineHeight: "1.02", letterSpacing: "-0.035em" }],
        h1: ["clamp(2rem, 4vw, 3.5rem)", { lineHeight: "1.04", letterSpacing: "-0.03em" }],
        h2: ["clamp(1.625rem, 2.8vw, 2.5rem)", { lineHeight: "1.08", letterSpacing: "-0.025em" }],
        h3: ["clamp(1.1875rem, 1.5vw, 1.375rem)", { lineHeight: "1.2", letterSpacing: "-0.015em" }],
        lead: ["clamp(1.0625rem, 1.3vw, 1.1875rem)", { lineHeight: "1.55", letterSpacing: "-0.005em" }],
        body: ["1rem", { lineHeight: "1.6" }],
        small: ["0.875rem", { lineHeight: "1.5" }],
        caption: ["0.8125rem", { lineHeight: "1.45" }],
      },
      maxWidth: {
        prose: "62ch",
        container: "var(--container)",
      },
      transitionTimingFunction: {
        out: "var(--ease-out)",
        "in-out": "var(--ease-in-out)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
