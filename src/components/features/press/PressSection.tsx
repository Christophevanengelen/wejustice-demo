"use client";

/**
 * PressSection - "On en parle dans la presse"
 *
 * Displays press coverage with outlet names, article titles, and links.
 * Desktop: 3-column grid (featured + 2 columns of 3).
 * Mobile: stacked cards.
 *
 * Uses same data as production fallback press articles.
 * Part of the component library (features/press/).
 */

import { LogoFigma } from "@/components/ui/LogoFigma";

interface PressItem {
  id: string;
  publisher: string;
  title: string;
  excerpt: string;
  url: string;
  image: string | null;
  featured: boolean;
}

const PRESS_ARTICLES: PressItem[] = [
  {
    id: "p-1",
    publisher: "TF1",
    title: "WeJustice revolutionne la justice collective en France",
    excerpt: "La plateforme permet aux citoyens de se regrouper pour des actions juridiques, rendant la justice accessible a tous.",
    url: "#",
    image: null,
    featured: true,
  },
  {
    id: "p-2",
    publisher: "BFM TV",
    title: "WeJustice : quand le collectif change la donne face aux geants",
    excerpt: "Des milliers de Francais se mobilisent via WeJustice pour faire valoir leurs droits.",
    url: "#",
    image: null,
    featured: false,
  },
  {
    id: "p-3",
    publisher: "France 24",
    title: "Justice collective : une revolution citoyenne pour tous",
    excerpt: "WeJustice democratise l'acces a la justice en permettant des actions collectives a grande echelle.",
    url: "#",
    image: null,
    featured: false,
  },
  {
    id: "p-4",
    publisher: "Le Parisien",
    title: "David contre Goliath : ces citoyens qui font trembler les grandes entreprises",
    excerpt: "Grace aux actions collectives, des milliers de consommateurs obtiennent reparation.",
    url: "#",
    image: "/press/le-parisien.jpg",
    featured: false,
  },
  {
    id: "p-5",
    publisher: "Le Figaro",
    title: "Actions collectives : le modele WeJustice seduit de plus en plus",
    excerpt: "Avec plus de 300 000 signatures, la plateforme s'impose comme un acteur incontournable.",
    url: "#",
    image: "/press/le-figaro-article.jpg",
    featured: false,
  },
  {
    id: "p-6",
    publisher: "Les Echos",
    title: "WeJustice leve le voile sur les pratiques abusives des entreprises",
    excerpt: "La startup juridique a deja permis de recuperer plusieurs millions d'euros pour ses membres.",
    url: "#",
    image: "/press/les-echos-article.jpg",
    featured: false,
  },
  {
    id: "p-7",
    publisher: "Liberation",
    title: "Un modele innovant pour rendre la justice accessible a tous les citoyens",
    excerpt: "WeJustice prouve que le collectif est plus fort que l'individu face aux injustices.",
    url: "#",
    image: "/press/liberation-article.jpg",
    featured: false,
  },
];

export function PressSection() {
  const featured = PRESS_ARTICLES.find((a) => a.featured);
  const others = PRESS_ARTICLES.filter((a) => !a.featured);
  const col1 = others.slice(0, 3);
  const col2 = others.slice(3, 6);

  return (
    <section className="bg-gray-50 py-16 dark:bg-gray-800 lg:py-24">
      <div className="mx-auto max-w-screen-xl px-4 lg:px-6">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white lg:text-4xl">
            On en parle dans la presse
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            Les medias couvrent les actions collectives WeJustice
          </p>
        </div>

        {/* Desktop: 3-column grid */}
        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Featured */}
          {featured && (
            <div className="flex flex-col justify-center">
              {/* WeJustice picto - same size/position as prod: h-48 w-48, centered */}
              <div className="mb-6 flex justify-center">
                <LogoFigma showText={false} size="lg" className="h-48 w-48" />
              </div>
              <p className="mb-2 text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                {featured.publisher}
              </p>
              <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
                {featured.title}
              </h3>
              <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                {featured.excerpt}
              </p>
              <a href={featured.url} className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-400">
                Lire l&apos;article →
              </a>
            </div>
          )}

          {/* Column 1 */}
          <div className="space-y-6 border-l border-gray-200 pl-8 dark:border-gray-700">
            {col1.map((item) => (
              <PressCard key={item.id} item={item} />
            ))}
          </div>

          {/* Column 2 */}
          <div className="space-y-6 border-l border-gray-200 pl-8 dark:border-gray-700">
            {col2.map((item) => (
              <PressCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* Mobile: stacked cards */}
        <div className="space-y-4 lg:hidden">
          {PRESS_ARTICLES.map((item) => (
            <div key={item.id} className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
              <p className="mb-1 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                {item.publisher}
              </p>
              <h3 className="mb-2 text-base font-bold text-gray-900 dark:text-white">
                {item.title}
              </h3>
              <a href={item.url} className="text-xs font-medium text-primary-600 hover:underline dark:text-primary-400">
                Lire l&apos;article →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PressCard({ item }: { item: PressItem }) {
  return (
    <div>
      <p className="mb-1 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
        {item.publisher}
      </p>
      <h4 className="mb-1 text-sm font-bold text-gray-900 dark:text-white">
        {item.title}
      </h4>
      <p className="mb-2 text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
        {item.excerpt}
      </p>
      <a href={item.url} className="text-xs font-medium text-primary-600 hover:underline dark:text-primary-400">
        Lire l&apos;article →
      </a>
    </div>
  );
}
