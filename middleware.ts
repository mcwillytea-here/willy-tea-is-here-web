import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Lokální paměť pro uchování IP adres (V produkčním Edge na Vercelu se doporučuje Upstash Redis)
const ipMap = new Map<string, { count: number, timestamp: number }>();
const RATE_LIMIT = 3; // Max 3 requesty
const WINDOW_MS = 15 * 60 * 1000; // 15 minut

export function middleware(request: NextRequest) {
  // Rate limiting pouze na POST akci (Odeslání hejtu v Bunkru)
  if (request.nextUrl.pathname === '/bunkr' && request.method === 'POST') {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '127.0.0.1';
    const now = Date.now();
    
    // Základní garbage collection pro zabránění memory leaku na dlouho běžících instancích
    if (Math.random() < 0.1) {
      for (const [key, value] of ipMap.entries()) {
        if (now - value.timestamp > WINDOW_MS) {
          ipMap.delete(key);
        }
      }
    }

    const record = ipMap.get(ip);
    if (record) {
      if (now - record.timestamp > WINDOW_MS) {
        ipMap.set(ip, { count: 1, timestamp: now });
      } else {
        record.count++;
        if (record.count > RATE_LIMIT) {
          // Server Actions zpracují vrácený status mimo 2xx jako chybu formuláře
          return new NextResponse(JSON.stringify({ error: 'Zpomal, tvůj limit hejtů byl uplynul. Zkus to za 15 minut.' }), {
            status: 429,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      }
    } else {
      ipMap.set(ip, { count: 1, timestamp: now });
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/bunkr'],
};
