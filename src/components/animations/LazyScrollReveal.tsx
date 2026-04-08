"use client";
import dynamic from "next/dynamic";

const ScrollReveal = dynamic(
  () => import("./ScrollReveal").then((mod) => ({ default: mod.ScrollReveal })),
  { ssr: false, loading: () => null }
);

export { ScrollReveal as LazyScrollReveal };
