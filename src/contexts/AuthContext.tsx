"use client";
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { 
  getAuth, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut,
  User as FirebaseUser
} from "firebase/auth";
import { useFirebase } from '@/firebase';

interface User {
  email: string | null;
  uid: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { auth } = useFirebase();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        setUser({ email: firebaseUser.email, uid: firebaseUser.uid });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Login Berhasil",
        description: "Selamat datang kembali!",
      });
      setLoading(false);
      return true;
    } catch (error: any) {
      toast({
        title: "Login Gagal",
        description: "Email atau password salah!",
        variant: "destructive",
      });
      setLoading(false);
      return false;
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      toast({
        title: "Logout Berhasil",
        description: "Anda telah keluar dari sistem!",
      });
    } catch (error) {
      toast({
        title: "Logout Gagal",
        description: "Terjadi kesalahan saat keluar.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
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
