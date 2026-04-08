/**
 * Flowbite Theme - WeJustice Brand
 *
 * Single source of truth for all Flowbite component styling.
 * Maps Flowbite's default blue/cyan to our brand red (#C20520).
 *
 * RULE: Every Flowbite component must get its colors from this theme.
 * Never use Flowbite color defaults - they produce blue/cyan parasites.
 *
 * Usage: Wrap app in <ThemeProvider theme={wejusticeTheme}>
 */
import { createTheme } from "flowbite-react";

export const wejusticeTheme = createTheme({
  /* ─── Button ─── */
  button: {
    color: {
      // "failure" = our primary CTA (brand red)
      failure:
        "border border-transparent bg-brand text-white focus:ring-4 focus:ring-primary-300 enabled:hover:opacity-90 dark:focus:ring-primary-800",
      // "light" = secondary CTA (neutral)
      light:
        "border border-gray-300 bg-white text-gray-900 focus:ring-4 focus:ring-primary-300 enabled:hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-gray-700 dark:enabled:hover:border-gray-600 dark:enabled:hover:bg-gray-700",
    },
  },

  /* ─── Progress bar ─── */
  progress: {
    color: {
      // Default progress = brand red (not blue)
      dark: "bg-brand",
      red: "bg-brand",
      // Keep other semantic colors
      green: "bg-green-600 dark:bg-green-500",
      yellow: "bg-yellow-400 dark:bg-yellow-300",
      blue: "bg-brand",
    },
  },

  /* ─── Badge ─── */
  badge: {
    root: {
      color: {
        failure:
          "bg-[var(--color-brand-softer)] text-brand group-hover:bg-[var(--color-brand-soft)]",
        info: "bg-[var(--color-brand-softer)] text-brand group-hover:bg-[var(--color-brand-soft)]",
      },
    },
  },

  /* ─── Card ─── */
  card: {
    root: {
      base: "flex rounded-lg border border-gray-200 bg-white dark:border-white/[0.08] dark:bg-gray-900",
      children: "flex h-full flex-col justify-center gap-4 p-6",
    },
  },

  /* ─── Navbar ─── */
  navbar: {
    link: {
      active: {
        on: "text-brand",
        off: "text-gray-900 hover:text-brand dark:text-white dark:hover:text-brand",
      },
    },
  },

  /* ─── DarkThemeToggle ─── */
  darkThemeToggle: {
    root: {
      base: "inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700",
    },
  },

  /* ─── Dropdown ─── */
  dropdown: {
    floating: {
      target: "w-fit",
      base: "z-10 w-fit divide-y divide-gray-100 rounded-lg shadow-lg focus:outline-none",
      content: "rounded-lg text-sm text-gray-700 dark:text-gray-200",
    },
  },

  /* ─── TextInput ─── */
  textInput: {
    field: {
      input: {
        colors: {
          gray: "border-gray-300 bg-gray-50 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500",
        },
      },
    },
  },
});
