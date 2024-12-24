import React from 'react';

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
                Welcome to the E-Commerce Store Admin
            </h1>
            <p className="text-lg text-gray-600">
                Manage your store efficiently and effectively.
            </p>
            <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Get Started
            </button>
        </div>
    );
};

export default Home;
