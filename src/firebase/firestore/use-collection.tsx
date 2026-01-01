'use client';
import { useState, useEffect } from 'react';
import {
  collection,
  onSnapshot,
  query,
  Query,
  DocumentData,
} from 'firebase/firestore';
import { useFirestore } from '@/firebase';

export const useCollection = <T extends DocumentData>(path: string) => {
  const db = useFirestore();
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!db) {
      return;
    }

    const collRef = collection(db, path);
    const q = query(collRef);

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs = snapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as T)
        );
        setData(docs);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
        console.error(`Error fetching collection ${path}:`, err);
      }
    );

    return () => unsubscribe();
  }, [db, path]);

  return { data, loading, error };
};
