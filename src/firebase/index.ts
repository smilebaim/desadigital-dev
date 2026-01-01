import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { firebaseApp, firebaseConfig } from './config';

export {
  FirebaseProvider,
  useFirebaseApp,
  useFirestore,
  useAuth,
} from './provider';
export { useUser } from './auth/use-user';
export { useCollection } from './firestore/use-collection';
export { useDoc } from './firestore/use-doc';
export { FirebaseClientProvider } from './client-provider';

let app, auth, firestore;

export function initializeFirebase() {
  if (auth && firestore) {
    return { auth, firestore };
  }

  app = firebaseApp;
  auth = getAuth(app);
  firestore = getFirestore(app);

  return { auth, firestore, app };
}
