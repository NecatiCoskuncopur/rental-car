import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('access_token')?.value;
  const { pathname } = req.nextUrl;

  if (pathname === '/bookingSuccess') {
    const bookingAllowed = req.cookies.get('bookingSuccessAllowed')?.value;
    if (bookingAllowed !== 'true') {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  const protectedRoutes = ['/userDashboard', '/userBookings', '/settings', '/adminDashboard'];

  if (token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      const decodedToken = JSON.parse(jsonPayload);

      if (!decodedToken.isAdmin && pathname.startsWith('/adminDashboard')) {
        return NextResponse.redirect(new URL('/', req.url));
      }

      if (pathname === '/login' || pathname === '/register') {
        return NextResponse.redirect(new URL('/', req.url));
      }

      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  } else {
    if (protectedRoutes.some((route) => pathname === route || pathname.startsWith(route))) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/register', '/adminDashboard/:path*', '/userDashboard', '/userBookings', '/settings', '/bookingSuccess'],
};
