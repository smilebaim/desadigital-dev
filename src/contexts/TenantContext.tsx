'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { db } from '@/firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { TenantData } from '@/lib/tenant-actions';

interface TenantContextState {
    tenantId: string | null;
    tenantData: TenantData | null;
    isLoading: boolean;
}

const TenantContext = createContext<TenantContextState>({
    tenantId: null,
    tenantData: null,
    isLoading: true
});

export const TenantProvider = ({ children, initialTenantId }: { children: React.ReactNode, initialTenantId?: string | null }) => {
    const [tenantId, setTenantId] = useState<string | null>(initialTenantId || null);
    const [tenantData, setTenantData] = useState<TenantData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fallback for client side if not passed from server
        let activeTenant = initialTenantId;
        if (!activeTenant && typeof window !== 'undefined') {
            const hostname = window.location.hostname;
            const subdomain = hostname.split('.')[0].toLowerCase();
            const isExcluded = ['www', 'localhost', '127'].includes(subdomain);
            if (!isExcluded && subdomain) {
                activeTenant = subdomain;
                setTenantId(subdomain);
            }
        }

        if (activeTenant) {
            // Fetch tenant metadata
            const fetchTenant = async () => {
                try {
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
        <TenantContext.Provider value={{ tenantId, tenantData, isLoading }}>
            {children}
        </TenantContext.Provider>
    );
};

export const useTenant = () => useContext(TenantContext);
