'use client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface UserProfile {
  displayName: string;
  email: string;
  photoURL?: string;
}

export default function ProfilPage() {
    const { user, loading } = useAuth();
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (user) {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setUserProfile(docSnap.data() as UserProfile);
                } else {
                    console.log("No such document!");
                }
            }
        };

        if (!loading) {
            fetchUserProfile();
        }
    }, [user, loading]);

    if (loading || !userProfile) {
        return (
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Profil Admin</h1>
                <p>Memuat profil...</p>
            </div>
        );
    }

    return (
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Profil Admin</h1>
          <Card>
            <CardHeader>
                <CardTitle>Informasi Akun</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                        <AvatarFallback className="text-2xl">
                            {userProfile.displayName?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-xl font-semibold">{userProfile.displayName}</p>
                        <p className="text-muted-foreground">{userProfile.email}</p>
                    </div>
                </div>
            </CardContent>
          </Card>
        </div>
    )
}
