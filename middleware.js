import { next } from '@vercel/edge';
import { NextResponse } from 'next/server';

export default function middleware(req) {
  const url = req.nextUrl.clone();
  const token = req.cookies.get('auth_token')

  // Jika belum login dan mencoba akses /
  if (!token && url.pathname === '/') {
    url.pathname = '/index';
    return NextResponse.redirect(url);
  }else{
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
}
