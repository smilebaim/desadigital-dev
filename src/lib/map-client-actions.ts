'use client';
import { db } from '@/firebase/config';
import { 
    collection, 
    onSnapshot, 
    query, 
    orderBy,
    where
} from 'firebase/firestore';

export const getMarkersStream = (callback: (data: any[]) => void, tenantId?: string | null) => {
    let q;
    if (tenantId) {
        q = query(
            collection(db, "map_markers"), 
            where("tenantId", "==", tenantId),
            orderBy("name")
        );
    } else {
        q = query(collection(db, "map_markers"), orderBy("name"));
    }
    
    return onSnapshot(q, (querySnapshot) => {
        const data = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        callback(data);
    });
};

export const getPolygonsStream = (callback: (data: any[]) => void, tenantId?: string | null) => {
    let q;
    if (tenantId) {
        q = query(
            collection(db, "map_polygons"), 
            where("tenantId", "==", tenantId),
            orderBy("name")
        );
    } else {
        q = query(collection(db, "map_polygons"), orderBy("name"));
    }
    
    return onSnapshot(q, (querySnapshot) => {
        const data = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        callback(data);
    });
};

export const getLayerCategoriesStream = (callback: (data: any[]) => void, tenantId?: string | null) => {
    let q;
    if (tenantId) {
        q = query(
            collection(db, "map_layer_categories"), 
            where("tenantId", "==", tenantId),
            orderBy("order")
        );
    } else {
        q = query(collection(db, "map_layer_categories"), orderBy("order"));
    }
    
    return onSnapshot(q, (querySnapshot) => {
        const data = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        callback(data);
    });
};
