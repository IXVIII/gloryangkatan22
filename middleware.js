import { next } from '@vercel/edge';
import { NextResponse } from 'next/server';

export default function middleware(req) {
  const url = req.nextUrl.clone();
  const token = req.cookies.get('auth_token'); // Ambil token dari cookie

  // Kalau user belum login dan mencoba ke halaman /
  if (!token && url.pathname === '/') {
    url.pathname = '/review'; // arahkan ke login
    return NextResponse.redirect(url);
  }

  // Kalau tidak ke halaman dashboard, lanjutkan
  const res = NextResponse.next();

  // Tambahkan header security seperti sebelumnya
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
