import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  Firestore
} from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';
import type { MapFeature } from './types';

let db: Firestore;

function getDb() {
  if (!db) {
    const { firestore } = initializeFirebase();
    db = firestore;
  }
  return db;
}


export const getMapFeatures = (callback: (features: MapFeature[]) => void) => {
  const db = getDb();
  const q = query(collection(db, 'mapFeatures'));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const features = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as MapFeature[];
    callback(features);
  });

  return unsubscribe;
};

export const addMapFeature = async (featureData: Omit<MapFeature, 'id'>) => {
  const db = getDb();
  await addDoc(collection(db, 'mapFeatures'), {
    ...featureData,
    createdAt: serverTimestamp(),
  });
};

export const updateMapFeature = async (id: string, featureData: Partial<MapFeature>) => {
  const db = getDb();
  const featureRef = doc(db, 'mapFeatures', id);
  await updateDoc(featureRef, {
    ...featureData,
    updatedAt: serverTimestamp()
  });
};

export const deleteMapFeature = async (id: string) => {
  const db = getDb();
  await deleteDoc(doc(db, 'mapFeatures', id));
};
