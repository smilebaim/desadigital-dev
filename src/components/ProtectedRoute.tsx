'use client';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import React, { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !isAuthenticated && pathname.startsWith('/dashboard')) {
      router.replace("/login");
    }
  }, [isAuthenticated, loading, router, pathname]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Memuat...</div>;
  }
  
  if (!isAuthenticated && pathname.startsWith('/dashboard')) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
