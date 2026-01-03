'use client';

import { db } from './firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

// Function to get map markers in real-time
export const getMarkersStream = (callback: (markers: any[]) => void) => {
    const q = query(
        collection(db, 'mapMarkers'),
        orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const markers = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        callback(markers);
    }, (error) => {
        console.error("Error getting markers stream: ", error);
    });

    return unsubscribe;
};

// Function to get map layer categories in real-time
export const getLayerCategoriesStream = (callback: (categories: any[]) => void) => {
    const q = query(
        collection(db, 'mapLayerCategories'),
        orderBy('order', 'asc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const categories = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        callback(categories);
    }, (error) => {
        console.error("Error getting layer categories stream: ", error);
    });

    return unsubscribe;
}
