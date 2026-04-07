/**
 * next-intl middleware - required for locale-prefixed routing.
 * Without this, sub-routes like /fr/actions 404 or redirect to /.
 */
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except internal Next.js paths and static files
  matcher: ['/((?!_next|api|images|fonts|favicon.ico|Logo_wejustice.svg|robots.txt|sitemap.xml|llms.txt|llms-full.txt).*)'],
};
