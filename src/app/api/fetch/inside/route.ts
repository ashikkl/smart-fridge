import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { NextResponse } from "next/server";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
};


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const fridgeId = searchParams.get('fridgeId') || '';
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);

        // Create a reference to the file we want to download
        const storage = getStorage(app);
        const photoRef = ref(storage, `${fridgeId}/photo.jpg`);

        const url = await getDownloadURL(photoRef);

        if (url.length === 0) {
            // Handle case when no recipes are found
            return NextResponse.json({ url: '' });
        }

        // Continue with normal processing of recipes
        return NextResponse.json({ url });


}
