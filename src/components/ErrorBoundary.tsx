'use client';

import React from 'react';
import { RefreshCw, WifiOff, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log ke console — bisa diganti dengan logging service seperti Sentry
    console.error('[ErrorBoundary] Caught error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      const isFirebaseError =
        this.state.error?.message?.toLowerCase().includes('firebase') ||
        this.state.error?.message?.toLowerCase().includes('firestore') ||
        this.state.error?.message?.toLowerCase().includes('network');

      return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
          <div className="max-w-md w-full text-center space-y-6">
            {/* Icon */}
            <div className="flex justify-center">
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center ${isFirebaseError ? 'bg-amber-500/10' : 'bg-red-500/10'}`}>
                {isFirebaseError ? (
                  <WifiOff className="w-10 h-10 text-amber-400" />
                ) : (
                  <AlertTriangle className="w-10 h-10 text-red-400" />
                )}
              </div>
            </div>

            {/* Text */}
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-white">
                {isFirebaseError ? 'Koneksi Bermasalah' : 'Terjadi Kesalahan'}
              </h1>
              <p className="text-slate-400 leading-relaxed">
                {isFirebaseError
                  ? 'Aplikasi tidak dapat terhubung ke server. Periksa koneksi internet Anda dan coba lagi.'
                  : 'Terjadi kesalahan tidak terduga pada aplikasi. Tim kami telah diberitahu.'}
              </p>
            </div>

            {/* Error Detail (dev mode only) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-left">
                <p className="text-xs font-mono text-red-400 break-all">
                  {this.state.error.message}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={this.handleReset}
                className="bg-emerald-600 hover:bg-emerald-500 text-white gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Coba Lagi
              </Button>
              <Button
                variant="outline"
                onClick={() => window.location.href = '/'}
                className="border-slate-700 text-slate-300 hover:bg-slate-800 gap-2"
              >
                Kembali ke Beranda
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
