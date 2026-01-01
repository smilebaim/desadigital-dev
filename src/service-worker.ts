/// <reference lib="webworker" />

const CACHE_NAME = 'desa-remaubakotuo-cache-v1';
const MAP_DATA_CACHE = 'map-data-cache';

// Files to cache
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/logo.png'
];

// Install event
self.addEventListener('install', (event: ExtendableMessageEvent) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate event
self.addEventListener('activate', (event: ExtendableMessageEvent) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event
self.addEventListener('fetch', (event: FetchEvent) => {
  // Handle map data requests
  if (event.request.url.includes('/api/map-data')) {
    event.respondWith(
      caches.open(MAP_DATA_CACHE).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response) {
            // Return cached response
            return response;
          }

          // Fetch from network
          return fetch(event.request).then((networkResponse) => {
            // Cache the response
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        });
      })
    );
    return;
  }

  // Handle other requests
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }

      return fetch(event.request).then((networkResponse) => {
        // Check if we received a valid response
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }

        // Clone the response
        const responseToCache = networkResponse.clone();

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      });
    })
  );
});

// Background sync for offline changes
self.addEventListener('sync', (event: SyncEvent) => {
  if (event.tag === 'sync-map-data') {
    event.waitUntil(syncMapData());
  }
});

async function syncMapData() {
  try {
    const db = await openMapDataDB();
    const offlineChanges = await db.getAll('offlineChanges');
    
    for (const change of offlineChanges) {
      try {
        await fetch('/api/map-data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(change),
        });
        
        // Remove synced change
        await db.delete('offlineChanges', change.id);
      } catch (error) {
        console.error('Failed to sync change:', error);
      }
    }
  } catch (error) {
    console.error('Failed to sync map data:', error);
  }
}

// IndexedDB setup
function openMapDataDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('MapDataDB', 1);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains('offlineChanges')) {
        db.createObjectStore('offlineChanges', { keyPath: 'id', autoIncrement: true });
      }
    };
  });
} 