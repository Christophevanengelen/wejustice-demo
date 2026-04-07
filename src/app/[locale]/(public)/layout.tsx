import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { DemoToolbar } from "@/components/layout/DemoToolbar";
import { ScrollToTop } from "@/components/animations/ScrollToTop";

/**
 * Public layout — Navigation globale + Footer.
 * Utilisé par toutes les pages publiques (homepage, actions, blog, etc.)
 * Séparé du layout /compte qui utilise son propre sidebar Flowbite.
 */
export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <Navigation />
        <main className="flex-1 pt-[72px]">{children}</main>
        <Footer />
      </div>
      <DemoToolbar />
      <ScrollToTop />
    </>
  );
}
