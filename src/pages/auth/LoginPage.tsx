"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, LogIn } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    if (!email || !password) {
      setError("Mohon isi semua kolom");
      setIsLoading(false);
      return;
    }

    const success = await login(email, password);
    if (success) {
      router.push("/dashboard");
    } else {
      setError("Email atau password salah.");
    }
    setIsLoading(false);
  };

  if (isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <Link href="/" className="inline-flex items-center mb-6 text-sm text-gray-600 hover:text-primary">
          <ArrowLeft size={16} className="mr-2" />
          Kembali ke Beranda
        </Link>
        
        <Card>
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl">Login Admin</CardTitle>
            <CardDescription>
              Masukkan email dan password untuk mengakses dashboard admin
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@desaremaubakotuo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                {error && (
                  <div className="text-red-500 text-sm">{error}</div>
                )}
                <Button type="submit" className="w-full flex items-center gap-2" disabled={isLoading}>
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                  ) : (
                    <LogIn size={18} />
                  )}
                  <span>{isLoading ? "Memproses..." : "Login"}</span>
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="text-center text-sm text-gray-600">
            <p className="w-full">
              Portal Admin Desa Remau Bakotuo
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
