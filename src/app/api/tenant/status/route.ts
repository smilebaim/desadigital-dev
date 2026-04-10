import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { db } from '@/firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore';

/**
 * GET /api/tenant/status?tenantId={subdomain}
 * 
 * Mengambil status tenant dari Firestore dan menyimpannya ke cookie.
 * Dipanggil dari TenantProvider saat pertama kali load untuk memungkinkan
 * middleware mengecek status suspend di request berikutnya.
 */
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const tenantId = searchParams.get('tenantId');

    if (!tenantId) {
        return NextResponse.json({ error: 'tenantId is required' }, { status: 400 });
    }

    try {
        const q = query(
            collection(db, 'tenants'), 
            where('subdomain', '==', tenantId)
        );
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            return NextResponse.json({ status: 'not_found' }, { status: 404 });
        }

        const tenantData = snapshot.docs[0].data();
        const status = tenantData.status || 'active';

        // Set cookie status agar middleware bisa mengeceknya
        const cookieStore = await cookies();
        cookieStore.set('x-tenant-status', status, { 
            path: '/', 
            sameSite: 'lax',
            maxAge: 60 * 5 // 5 menit — re-check berkala
        });
        cookieStore.set('x-tenant-status-for', tenantId, { 
            path: '/', 
            sameSite: 'lax',
            maxAge: 60 * 5
        });

        return NextResponse.json({ 
            tenantId, 
            status,
            name: tenantData.name || tenantId
        });

    } catch (error: any) {
        console.error('Error fetching tenant status:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
