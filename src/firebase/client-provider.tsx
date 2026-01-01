'use client';
import { initializeFirebase, FirebaseProvider } from '@/firebase';
import { ReactNode, useEffect, useState } from 'react';

export function FirebaseClientProvider({ children }: { children: ReactNode }) {
  const [firebaseInstances, setFirebaseInstances] = useState(null);

  useEffect(() => {
    const instances = initializeFirebase();
    setFirebaseInstances(instances as any);
  }, []);

  if (!firebaseInstances) {
    // You can return a loader here
    return <div>Loading Firebase...</div>;
  }

  return <FirebaseProvider {...(firebaseInstances as any)}>{children}</FirebaseProvider>;
}
