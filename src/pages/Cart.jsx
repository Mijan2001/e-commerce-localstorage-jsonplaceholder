import React, { useEffect, useState } from 'react';
import Checkout from '../payment/Checkout';
import { useNavigate } from 'react-router-dom';
import { useLocalStorageLength } from '../context/LocalStorage';

const Cart = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { flag, setFlag } = useLocalStorageLength();
    useEffect(() => {
        // Get product IDs from localStorage
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

        if (cartItems.length > 0) {
            // Fetch product details from jsonplaceholder API using the stored product IDs
            const fetchProducts = async () => {
                try {
                    const productRequests = cartItems.map(id =>
                        fetch(`https://dummyjson.com/products/${id}`).then(
                            res => res.json()
                        )
                    );
                    const productsData = await Promise.all(productRequests);
                    setProducts(productsData);
                } catch (error) {
                    setError('Failed to fetch products');
                } finally {
                    setLoading(false);
                }
            };

            fetchProducts();
        } else {
            setLoading(false);
        }
    }, []);

    // Handle delete product from the cart
    const handleDelete = productId => {
        const updatedCart = products.filter(
            product => product.id !== productId
        );
        setProducts(updatedCart);
        // Update the localStorage
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const updatedCartItems = cartItems.filter(id => id !== productId);
        localStorage.setItem('cart', JSON.stringify(updatedCartItems));
        setFlag(!flag);
    };

    // Handle image loading
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
                    Your Cart
                </h2>
                {products.length === 0 ? (
                    <p className="text-gray-500 text-center">
                        Your cart is empty.
                    </p>
                ) : (
                    <ul>
                        {products.map(product => (
                            <li
                                key={product.id}
                                className="flex justify-between items-center border-b p-4 space-x-4"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="w-1/3 h-full overflow-hidden rounded-lg relative">
                                        {!imageLoaded && (
                                            <div className="absolute inset-0 flex justify-center items-center bg-gray-200">
                                                <span className="text-gray-500">
                                                    Loading...
                                                </span>
                                            </div>
                                        )}
                                        <img
                                            src={product.images[0]}
                                            alt={product.title}
                                            className={`w-full h-full object-cover ${
                                                imageLoaded
                                                    ? 'opacity-100'
                                                    : 'opacity-0'
                                            }`}
                                            onLoad={handleImageLoad}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <h3 className="text-xl font-semibold text-gray-800">
                                            {product.title}
                                        </h3>
                                        <p className="text-gray-700">
                                            <strong>Category:</strong>{' '}
                                            {product.category}
                                        </p>
                                        <p className="text-gray-700">
                                            <strong>Price:</strong> $
                                            {product.price}
                                        </p>
                                        <p className="text-gray-700">
                                            <strong>Rating:</strong>{' '}
                                            {product.rating} / 5
                                        </p>
                                        <p className="text-gray-700">
                                            <strong>Brand:</strong>{' '}
                                            {product.brand}
                                        </p>
                                        <p className="text-gray-700">
                                            <strong>Description:</strong>{' '}
                                            {product.description?.substring(
                                                0,
                                                100
                                            )}
                                            ...
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDelete(product.id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {products.length > 0 && (
                <div className="mt-6 flex justify-center">
                    <button
                        onClick={() => {
                            localStorage.removeItem('cart');
                            setProducts([]);
                            navigate('/checkout');
                        }}
                        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Checkout with Stripe
                    </button>
                </div>
            )}
        </div>
    );
};

export default Cart;
