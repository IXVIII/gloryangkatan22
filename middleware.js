import { next } from '@vercel/edge';

// Middleware utama
export function middleware(req) {
  const url = req.nextUrl.clone();
  const token = req.cookies.get('auth_token');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
  
  // Jika belum login dan mencoba akses /
  if (!token && url.pathname === '/') {
    url.pathname = '/review';
    return NextResponse.redirect(url);
  } else if (isLoggedIn) {
    return NextResponse.redirect(url);
  } 
  alert(url.pathname);
  alert(isLoggedIn);
  // Jika sudah login atau bukan halaman terproteksi
  const res = NextResponse.next();

  // Tambahkan security headers
  res.headers.set('Referrer-Policy', 'origin-when-cross-origin');
  res.headers.set('X-Frame-Options', 'DENY');
  res.headers.set('X-Content-Type-Options', 'nosniff');
  res.headers.set('X-DNS-Prefetch-Control', 'on');
  res.headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload'
  );

  return res;
}

// Matcher: tentukan halaman yang ingin diproteksi
export const config = {
  matcher: ['/', '/index'], // proteksi root dan dashboard
};
