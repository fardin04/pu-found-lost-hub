import { initializeApp } from 'firebase/app'
    import { getAuth } from 'firebase/auth'
    import { getFirestore } from 'firebase/firestore'
    // REMOVED: import { getStorage } from 'firebase/storage'

    const {
        VITE_FIREBASE_API_KEY,
        VITE_FIREBASE_AUTH_DOMAIN,
        VITE_FIREBASE_PROJECT_ID,
        // REMOVED: VITE_FIREBASE_STORAGE_BUCKET,
        VITE_FIREBASE_APP_ID,
    } = import.meta.env

    const firebaseConfig = {
        apiKey: VITE_FIREBASE_API_KEY,
        authDomain: VITE_FIREBASE_AUTH_DOMAIN,
        projectId: VITE_FIREBASE_PROJECT_ID,
        // REMOVED: storageBucket: VITE_FIREBASE_STORAGE_BUCKET,
        appId: VITE_FIREBASE_APP_ID,
    }

    const requiredKeys = [
        'VITE_FIREBASE_API_KEY',
        'VITE_FIREBASE_AUTH_DOMAIN',
        'VITE_FIREBASE_PROJECT_ID',
        // REMOVED: 'VITE_FIREBASE_STORAGE_BUCKET',
        'VITE_FIREBASE_APP_ID',
    ]

    const missingKeys = requiredKeys.filter((key) => !import.meta.env[key])

    if (missingKeys.length > 0) {
        console.warn(
            `[firebase] Missing environment variables: ${missingKeys.join(', ')}. ` +
                'Firebase services may fail to initialize.'
        )
    }

    const firebaseApp = initializeApp(firebaseConfig)

    const auth = getAuth(firebaseApp)
    const db = getFirestore(firebaseApp)
    // REMOVED: const storage = getStorage(firebaseApp)

    export {  auth, db } // REMOVED: storage