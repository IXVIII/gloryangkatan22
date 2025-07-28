import { next } from '@vercel/edge';

export default function middleware(req) {
  const url = request.nextUrl.clone();
  const token = request.cookies.get('auth_token');
  // Jika belum login dan mencoba akses /
  if (!token && url.pathname === '/') {
    url.pathname = '/review';
    return NextResponse.redirect(url);
  }
  
  return next({
    headers: {
      'Referrer-Policy': 'origin-when-cross-origin',
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'X-DNS-Prefetch-Control': 'on',
      'Strict-Transport-Security':
        'max-age=31536000; includeSubDomains; preload',
    },
  });
}
