'use client';
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { 
  Auth,
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut
} from 'firebase/auth';
import { useToast } from '@/components/ui/use-toast';
import { useAuth as useFirebaseAuth } from '@/firebase';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const auth = useFirebaseAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    }, (error) => {
      console.error("Auth state error:", error);
      toast({
        title: "Error Autentikasi",
        description: "Gagal memuat status login.",
        variant: "destructive",
      });
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, toast]);


  const login = async (email: string, password: string): Promise<boolean> => {
    if (!auth) {
      toast({
        title: "Login Gagal",
        description: "Layanan autentikasi tidak tersedia.",
        variant: "destructive",
      });
      return false;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Login Berhasil",
        description: "Selamat datang kembali!",
      });
      return true;
    } catch (error: any) {
      if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          toast({
            title: "Akun Baru Dibuat",
            description: "Akun baru telah berhasil dibuat dan Anda telah login.",
          });
          return true;
        } catch (creationError: any) {
          toast({
            title: "Pembuatan Akun Gagal",
            description: creationError.message || "Gagal membuat akun baru.",
            variant: "destructive",
          });
          console.error("Account creation error:", creationError.message);
          return false;
        }
      } else {
        toast({
          title: "Login Gagal",
          description: "Email atau password salah!",
          variant: "destructive",
        });
        console.error("Login error:", error.message);
        return false;
      }
    }
  };

  const logout = async () => {
    if (!auth) {
      toast({
        title: "Logout Gagal",
        description: "Layanan autentikasi tidak tersedia.",
        variant: "destructive",
      });
      return;
    }
    try {
      await firebaseSignOut(auth);
      toast({
        title: "Logout Berhasil",
        description: "Anda telah keluar dari sistem!",
      });
    } catch (error: any) {
      toast({
        title: "Logout Gagal",
        description: "Terjadi kesalahan saat keluar.",
        variant: "destructive",
      });
      console.error("Logout error:", error.message);
    }
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !loading && !!user,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
