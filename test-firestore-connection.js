
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, limit, query } = require('firebase/firestore');

const firebaseConfig = {
  projectId: "desa-lengkap-15157263-d704f",
  appId: "1:464864018017:web:e5a623572ff6a038ea7420",
  apiKey: "AIzaSyDddQU72zuGblsonoT_OSk8wPcDvHxTcK4",
  authDomain: "desa-lengkap-15157263-d704f.firebaseapp.com",
  messagingSenderId: "464864018017",
  storageBucket: "desa-lengkap-15157263-d704f.appspot.com",
};

async function testConnection() {
    console.log("Initializing Firebase with config...");
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    try {
        console.log("Attempting to fetch 'tenants' collection (limited to 1)...");
        const q = query(collection(db, "tenants"), limit(1));
        const querySnapshot = await getDocs(q);
        
        console.log(`Success! Fetched ${querySnapshot.size} document(s).`);
        if (querySnapshot.size > 0) {
            console.log("Document data:", querySnapshot.docs[0].data());
        } else {
            console.log("Collection 'tenants' is empty, but connection was successful.");
        }
    } catch (error) {
        console.error("Firestore Connection Failed:", error.message);
        if (error.code) console.error("Error Code:", error.code);
    }
}

testConnection();
