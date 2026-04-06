import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const session = request.cookies.get('session');
  const url = request.nextUrl.clone();
  
  // 1. Multi-Tenancy Subdomain Detection
  const hostHeader = request.headers.get('host') || '';
  const hostname = hostHeader.split(':')[0]; // Strip port
  // e.g. "sukamaju.localhost" -> "sukamaju"
  let subdomain = hostname.split('.')[0].toLowerCase();
  
  // Exclude IP forms like "127.0.0.1" which resolves to "127"
  const isExcludedSubdomain = ['www', 'localhost', '127', 'developer'].includes(subdomain);
  
  // 2. Tentukan apakah ini Tenant Route
  const isTenantRoute = !isExcludedSubdomain && subdomain !== '';
  let activeTenant = isTenantRoute ? subdomain : null;

  // Paths yang tidak boleh di-rewrite ke dalam folder tenant
  const isDirectRoute = url.pathname.startsWith('/api') || 
                        url.pathname.startsWith('/_next') || 
                        url.pathname.startsWith('/login') ||
                        url.pathname.startsWith('/developer') ||
                        url.pathname === '/favicon.ico';

  // 3. RBAC & Auth Checks dengan `callbackUrl`
  // Proteksi Rute Super Admin
  if (url.pathname.startsWith('/developer')) {
    if (!session) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', url.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Proteksi Rute Tenant Khusus Dashboard
  if (url.pathname.startsWith('/dashboard')) {
    if (!session) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', url.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Handle halaman /login: jika sudah login, diarahkan sesuai callbackUrl atau dashboard
  if (url.pathname.startsWith('/login')) {
    if (session) {
      const callback = request.nextUrl.searchParams.get('callbackUrl') || '/dashboard';
      return NextResponse.redirect(new URL(callback, request.url));
    }
  }

  // 4. Lakukan Next.js Rewrite untuk Subdomain Tenant
  let response = NextResponse.next();
  
  if (isTenantRoute && !isDirectRoute) {
    // Rewrite path: dari `/dashboard` menjadi `/[tenant]/dashboard`
    url.pathname = `/${activeTenant}${url.pathname}`;
    response = NextResponse.rewrite(url);
  }

  // 5. Setting Cookie
  if (activeTenant) {
    response.cookies.set('x-tenant-id', activeTenant, { path: '/' });
  } else {
    response.cookies.delete('x-tenant-id');
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
