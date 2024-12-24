import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the styles

const Checkout = () => {
    const navigate = useNavigate();

    const handleCheckout = e => {
        e.preventDefault();
        // Show a success toast with a blue tick mark and smooth transition
        toast.success(
            <div className="flex items-center">
                <svg
                    className="w-6 h-6 text-blue-500 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        d="M7.629 9.021a1 1 0 011.415 0L10 10.293l1.957-1.957a1 1 0 111.414 1.414l-2.707 2.707a1 1 0 01-1.414 0L7.629 10.021a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
                Payment Successful!
            </div>,
            {
                position: 'top-center',
                autoClose: 3000, // Auto close after 3 seconds
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                className: 'bg-green-500 text-white', // Custom background color
                icon: false // Don't show the default icon
            }
        );
        navigate('/');
    };

    return (
        <div>
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
                <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
                    Checkout
                </h2>
                <form onSubmit={handleCheckout}>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="name"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Your Name"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Your Email"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="address"
                        >
                            Address
                        </label>
                        <input
                            type="text"
                            id="address"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Your Address"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="cardNumber"
                        >
                            Card Number
                        </label>
                        <input
                            type="text"
                            id="cardNumber"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Card Number"
                        />
                    </div>
                    <div className="flex mb-4">
                        <div className="w-1/2 pr-2">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="expiryDate"
                            >
                                Expiry Date
                            </label>
                            <input
                                type="text"
                                id="expiryDate"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="MM/YY"
                            />
                        </div>
                        <div className="w-1/2 pl-2">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="cvv"
                            >
                                CVV
                            </label>
                            <input
                                type="text"
                                id="cvv"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="CVV"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 w-full"
                    >
                        Pay Now
                    </button>
                </form>
            </div>

            {/* React Toastify Container */}
            <ToastContainer />
        </div>
    );
};

export default Checkout;
