import React, { useState } from 'react';
import SuccessDialog from './SuccessDialog.jsx';
// firebase code start

import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
} from 'firebase/auth';
import { initializeApp } from 'firebase/app'; // Import the dialog component
import { useNavigate } from 'react-router-dom';
import GoogleLogin from './GoogleLogin.jsx';

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

// firebase code end
const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const navigate = useNavigate();
    const handleSignIn = e => {
        e.preventDefault();
        const auth = getAuth();

        const signinToFirebae = signInWithEmailAndPassword(
            auth,
            email,
            password
        )
            .then(() => {
                setError('');
                setIsDialogVisible(true); // Show success dialog
            })
            .catch(error => setError(error.message));

        if (signinToFirebae) {
            alert('User signed in successfully');
            if (localStorage.getItem('userEmail')) {
                alert('Email already exists in local storage');
            } else {
                localStorage.setItem('userEmail', email);
            }

            navigate('/');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
                <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
                <form onSubmit={handleSignIn}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Email:
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Password:
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring"
                    >
                        Sign In
                    </button>
                </form>
                <GoogleLogin />
            </div>
            <SuccessDialog
                isVisible={isDialogVisible}
                onClose={() => setIsDialogVisible(false)}
            />
        </div>
    );
};

export default SignIn;
