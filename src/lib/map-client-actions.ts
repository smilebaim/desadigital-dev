'use client';
import { db } from '@/firebase/config';
import { 
    collection, 
    onSnapshot, 
    query, 
    orderBy
} from 'firebase/firestore';

export const getMarkersStream = (callback: (data: any[]) => void) => {
    const q = query(collection(db, "map_markers"), orderBy("name"));
    return onSnapshot(q, (querySnapshot) => {
        const data = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        callback(data);
    });
};

export const getPolygonsStream = (callback: (data: any[]) => void) => {
    const q = query(collection(db, "map_polygons"), orderBy("name"));
    return onSnapshot(q, (querySnapshot) => {
        const data = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        callback(data);
    });
};

export const getLayerCategoriesStream = (callback: (data: any[]) => void) => {
    const q = query(collection(db, "map_layer_categories"), orderBy("order"));
    return onSnapshot(q, (querySnapshot) => {
        const data = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        callback(data);
    });
};
