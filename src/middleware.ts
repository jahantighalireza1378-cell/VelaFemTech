import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
const PROTECTED_ROUTES = ['/dashboard', '/box-builder', '/checkout', '/account'];
const AUTH_ROUTES = ['/auth/login', '/auth/verify'];
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthenticated = request.cookies.has('vela-auth-token');
  if (PROTECTED_ROUTES.some(route => pathname.startsWith(route)) && !isAuthenticated) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('redirect_to', pathname);
    return NextResponse.redirect(loginUrl);
  }
  if (AUTH_ROUTES.some(route => pathname.startsWith(route)) && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  return NextResponse.next();
}
export const config = { matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images).*)'] };