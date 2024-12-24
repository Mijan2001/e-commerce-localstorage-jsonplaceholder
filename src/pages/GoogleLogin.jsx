import React from 'react';
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth';
import { initializeApp } from 'firebase/app'; // Import the dialog component
import { useNavigate } from 'react-router-dom';

const firebaseConfig = {
    apiKey: 'AIzaSyC_9ARAc4f07y9hMme2NjeC75Ws0hmml5k',
    authDomain: 'basic-authintication.firebaseapp.com',
    projectId: 'basic-authintication',
    storageBucket: 'basic-authintication.firebasestorage.app',
    messagingSenderId: '590468893860',
    appId: '1:590468893860:web:f919bcf2eb5da865aa6a31',
    measurementId: 'G-JRMW6H19FW'
};
const app = initializeApp(firebaseConfig);

const GoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            alert(`Welcome ${user.displayName}`);
            if (user) {
                navigate('/');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <button
            onClick={handleGoogleSignIn}
            className="bg-blue-500 w-full mt-1 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
        >
            Sign in with Google
        </button>
    );
};

export default GoogleLogin;
