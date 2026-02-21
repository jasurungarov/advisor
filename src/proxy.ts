import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const handleI18nRouting = createMiddleware(routing);

// Next.js 16: proxy.ts replaces middleware.ts — export must be named "proxy"
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protected routes that require authentication
  const protectedRoutes = ['/dashboard'];
  
  // Check for session token (NextAuth.js / Auth.js v5 sets this cookie)
  const hasSessionToken =
    request.cookies.has('authjs.session-token') ||
    request.cookies.has('__Secure-authjs.session-token');

  // Handle i18n routing first (adds locale prefix, detects language, etc.)
  const response = handleI18nRouting(request);

  // If the i18n middleware issued a redirect (e.g. / → /en), return immediately.
  if (response.headers.get('location')) {
    return response;
  }

  // Safely extract locale from path: /en/dashboard → "en"
  const segments = pathname.split('/');
  const locale = segments[1];
  const pathWithoutLocale = '/' + segments.slice(2).join('/');

  const VALID_LOCALES = ['en', 'ru', 'kg', 'uz'];
  const targetLocale = locale && VALID_LOCALES.includes(locale) ? locale : 'en';

  // Redirect unauthenticated users away from protected routes
  const isProtectedRoute = protectedRoutes.some(
    (route) => pathWithoutLocale.startsWith(route) || pathWithoutLocale === route
  );

  if (isProtectedRoute && !hasSessionToken) {
    const loginUrl = new URL(`/${targetLocale}/login`, request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: [
    '/',
    '/(en|ru|kg|uz)/:path*',
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
