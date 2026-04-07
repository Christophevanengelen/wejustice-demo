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
        "border border-transparent bg-primary-700 text-white focus:ring-4 focus:ring-primary-300 enabled:hover:bg-primary-800 dark:bg-primary-600 dark:focus:ring-primary-800 dark:enabled:hover:bg-primary-700",
      // "light" = secondary CTA (neutral)
      light:
        "border border-gray-300 bg-white text-gray-900 focus:ring-4 focus:ring-primary-300 enabled:hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-gray-700 dark:enabled:hover:border-gray-600 dark:enabled:hover:bg-gray-700",
    },
  },

  /* ─── Progress bar ─── */
  progress: {
    color: {
      // Default progress = brand red (not blue)
      dark: "bg-primary-700 dark:bg-primary-500",
      red: "bg-primary-700 dark:bg-primary-500",
      // Keep other semantic colors
      green: "bg-green-600 dark:bg-green-500",
      yellow: "bg-yellow-400 dark:bg-yellow-300",
      blue: "bg-primary-700 dark:bg-primary-500",
    },
  },

  /* ─── Badge ─── */
  badge: {
    root: {
      color: {
        failure:
          "bg-primary-100 text-primary-800 group-hover:bg-primary-200 dark:bg-primary-900 dark:text-primary-300",
        info: "bg-primary-100 text-primary-800 group-hover:bg-primary-200 dark:bg-primary-900 dark:text-primary-300",
      },
    },
  },

  /* ─── Navbar ─── */
  navbar: {
    link: {
      active: {
        on: "text-primary-700 dark:text-primary-500",
        off: "text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500",
      },
    },
  },

  /* ─── DarkThemeToggle ─── */
  darkThemeToggle: {
    root: {
      base: "rounded-lg p-2.5 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700",
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
