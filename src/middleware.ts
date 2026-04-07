import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ─────────────────────────────────────────────────────────────────────────────
// DesaHub Multi-Tenant Middleware
//
// Tiga aliran trafik utama:
//   (A) Domain Utama  — "localhost" / "www.desahub.id"
//       → Halaman landing SaaS + /developer dashboard
//   (B) Subdomain Tenant — "[nama-desa].desahub.id" / "[nama-desa].localhost"
//       → Web Publik desa & /dashboard khusus desa tersebut
//   (C) Direct Routes — /api, /_next, /favicon.ico (lalu-lintas teknis, tidak diubah)
// ─────────────────────────────────────────────────────────────────────────────

// Subdomains yang BUKAN tenant (dikecualikan dari rewrite)
const EXCLUDED_SUBDOMAINS = new Set(['www', 'localhost', '127', 'developer', 'app', 'api']);

function extractSubdomain(request: NextRequest): string | null {
  const hostHeader = request.headers.get('host') || '';
  const hostname = hostHeader.split(':')[0].toLowerCase();
  const parts = hostname.split('.');

  // Format single-part: "localhost" → tidak ada subdomain
  if (parts.length === 1) return null;

  // Format: "sukamaju.localhost" atau "sukamaju.desahub.id"
  const candidateSub = parts[0];
  if (EXCLUDED_SUBDOMAINS.has(candidateSub)) return null;

  // Cegah IP address (angka saja) dikira subdomain
  if (/^\d+$/.test(candidateSub)) return null;

  return candidateSub;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get('session');

  // ── (C) Technical / Static routes → pass through ─────────────────────────
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname === '/favicon.ico' ||
    pathname.startsWith('/icons') ||
    pathname.startsWith('/images')
  ) {
    return NextResponse.next();
  }

  // ── Identifikasi subdomain aktif ──────────────────────────────────────────
  const subdomain = extractSubdomain(request);
  const isTenantRequest = subdomain !== null;

  // ══════════════════════════════════════════════════════════════════════════
  // (B) ALIRAN TENANT: ada subdomain aktif
  // ══════════════════════════════════════════════════════════════════════════
  if (isTenantRequest) {
    const response = NextResponse.next();

    // Simpan tenant aktif di cookie untuk akses server-component
    response.cookies.set('x-tenant-id', subdomain, { path: '/', sameSite: 'lax' });

    // Proteksi: akses /dashboard di subdomain wajib login
    if (pathname.startsWith('/dashboard') && !session) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Jika sudah login dan coba buka /login → redirect ke /dashboard
    if (pathname.startsWith('/login') && session) {
      const callback = request.nextUrl.searchParams.get('callbackUrl') || '/dashboard';
      return NextResponse.redirect(new URL(callback, request.url));
    }

    // Rewrite path: / → /[tenant]/  |  /dashboard → /[tenant]/dashboard
    const url = request.nextUrl.clone();

    // Hindari double-rewrite (e.g., /_next sudah di-handle di atas)
    if (!pathname.startsWith(`/${subdomain}`)) {
      url.pathname = `/${subdomain}${pathname}`;
      const rewriteRes = NextResponse.rewrite(url);
      rewriteRes.cookies.set('x-tenant-id', subdomain, { path: '/', sameSite: 'lax' });
      return rewriteRes;
    }

    return response;
  }

  // ══════════════════════════════════════════════════════════════════════════
  // (A) ALIRAN DOMAIN UTAMA: tidak ada subdomain
  // ══════════════════════════════════════════════════════════════════════════

  // Bersihkan cookie tenant jika kembali ke domain utama
  const response = NextResponse.next();
  response.cookies.delete('x-tenant-id');

  // Proteksi rute /developer — wajib login
  if (pathname.startsWith('/developer')) {
    if (!session) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
    return response;
  }

  // /login di domain utama: jika sudah login, arahkan ke /developer
  if (pathname.startsWith('/login') && session) {
    const callback = request.nextUrl.searchParams.get('callbackUrl') || '/developer';
    return NextResponse.redirect(new URL(callback, request.url));
  }

  return response;
}

export const config = {
  matcher: [
    // Cocokkan semua path kecuali static Next.js assets
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
