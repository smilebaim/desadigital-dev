'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { db } from '@/firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { TenantData } from '@/lib/tenant-actions';
import { extractSubdomain } from '@/lib/subdomain';

interface TenantContextState {
    tenantId: string | null;
    tenantData: TenantData | null;
    isLoading: boolean;
    isSuspended: boolean;
}

const TenantContext = createContext<TenantContextState>({
    tenantId: null,
    tenantData: null,
    isLoading: true,
    isSuspended: false,
});

export const TenantProvider = ({ children, initialTenantId }: { children: React.ReactNode, initialTenantId?: string | null }) => {
    const [tenantId, setTenantId] = useState<string | null>(initialTenantId || null);
    const [tenantData, setTenantData] = useState<TenantData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSuspended, setIsSuspended] = useState(false);

    useEffect(() => {
        // Fallback for client side if not passed from server
        let activeTenant = initialTenantId;
        if (!activeTenant && typeof window !== 'undefined') {
            const detectedSub = extractSubdomain(window.location.hostname);
            if (detectedSub) {
                activeTenant = detectedSub;
                setTenantId(detectedSub);
            }
        }

        if (activeTenant) {
            const fetchTenant = async () => {
                try {
                    // 1. Panggil API untuk set cookie status (untuk middleware suspend check)
                    const statusRes = await fetch(`/api/tenant/status?tenantId=${activeTenant}`);
                    if (statusRes.ok) {
                        const statusData = await statusRes.json();
                        if (statusData.status === 'suspended') {
                            setIsSuspended(true);
                            // Redirect ke halaman suspended
                            if (typeof window !== 'undefined') {
                                window.location.href = '/suspended';
                            }
                            return;
                        }
                    }

                    // 2. Ambil data lengkap tenant dari Firestore
                    const q = query(collection(db, "tenants"), where("subdomain", "==", activeTenant));
                    const snapshots = await getDocs(q);
                    if (!snapshots.empty) {
                        setTenantData({ id: snapshots.docs[0].id, ...snapshots.docs[0].data() } as TenantData);
                    }
                } catch (e) {
                    console.error("Failed fetching tenant:", e);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchTenant();
        } else {
            setIsLoading(false);
        }
    }, [initialTenantId]);

    return (
        <TenantContext.Provider value={{ tenantId, tenantData, isLoading, isSuspended }}>
            {children}
        </TenantContext.Provider>
    );
};

export const useTenant = () => useContext(TenantContext);
