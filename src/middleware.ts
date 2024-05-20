import { authMiddleware } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export default authMiddleware({
  publicRoutes: ['/site', '/api/uploadthing'],
  async beforeAuth(auth, req) {},
  async afterAuth(auth, req) {
    const url = req.nextUrl;
    const SEARCH_PARAMS = url.searchParams.toString();
    const HOSTNAME = req.headers;

    const PATH_WITH_SEARCH_PARAMS =
      url.pathname + (SEARCH_PARAMS.length > 0 ? `?${SEARCH_PARAMS}` : '');

    // se o subdomínio existir
    const CUSTOM_SUBDOMAIN = HOSTNAME.get('host')
      ?.split(`${process.env.NEXT_PUBLIC_DOMAIN}`)
      .filter(Boolean)[0];

    if (CUSTOM_SUBDOMAIN) {
      return NextResponse.rewrite(
        new URL(`/${CUSTOM_SUBDOMAIN}${PATH_WITH_SEARCH_PARAMS}`, req.url)
      );
    }

    if (url.pathname === '/sign-in' || url.pathname === '/sign-up') {
      return NextResponse.redirect(new URL('/agency/sign-in', req.url));
    }

    if (
      url.pathname === '/' ||
      (url.pathname === '/site' && url.host === process.env.NEXT_PUBLIC_DOMAIN)
    ) {
      return NextResponse.rewrite(new URL('/site', req.url));
    }

    if (
      url.pathname.startsWith('/agency') ||
      url.pathname.startsWith('/subaccount')
    ) {
      return NextResponse.rewrite(
        new URL(`${PATH_WITH_SEARCH_PARAMS}`, req.url)
      );
    }
  },
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
