import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import validUserRoute from '../routes/validUserRoute';
import { useLocalStorageLength } from '../context/LocalStorage';

const ProductDetails = () => {
    const { flag, setFlag } = useLocalStorageLength();
    const { state } = useLocation();
    const [product, setProduct] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const { id } = useParams();

    const addToCart = async product => {
        console.log('userData', validUserRoute);
        if (!validUserRoute) {
            alert('Please sign in to add product to cart');
            navigate('/signup');
        } else {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            if (cart.includes(product.id)) {
                alert('Product is already in the cart');
            } else {
                cart.push(product.id);
                localStorage.setItem('cart', JSON.stringify(cart));
                alert('Product added to cart');
            }
            setFlag(!flag);
            navigate('/');
        }
    };

    const fetchData = () => {
        setIsLoading(true);
        setError(null);
        fetch(`https://dummyjson.com/products/${id}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Data could not be fetched');
                }
                return res.json();
            })
            .then(data => {
                setProduct(data);
            })
            .catch(error => setError(error.message))
            .finally(() => setIsLoading(false));
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="container mx-auto p-6 bg-white rounded-lg shadow-md max-w-2xl">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    Product Details
                </h2>
                {isLoading && (
                    <p className="text-gray-500 text-center">
                        Product is loading...
                    </p>
                )}
                {error && (
                    <p className="text-red-500 text-center">Error: {error}</p>
                )}
                {!isLoading && !error && (
                    <article className="space-y-6">
                        <div className="w-full h-64 overflow-hidden rounded-lg">
                            <img
                                src={product.images && product.images[0]}
                                alt={product.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-800">
                            {product.title}
                        </h3>
                        <p className="text-gray-700">
                            <strong className="font-medium text-gray-900">
                                Category:
                            </strong>{' '}
                            {product.category}
                        </p>
                        <p className="text-gray-700">
                            <strong className="font-medium text-gray-900">
                                Price:
                            </strong>{' '}
                            ${product.price}
                        </p>
                        <p className="text-gray-700">
                            <strong className="font-medium text-gray-900">
                                Rating:
                            </strong>{' '}
                            {product.rating} / 5
                        </p>
                        <p className="text-gray-700">
                            <strong className="font-medium text-gray-900">
                                Brand:
                            </strong>{' '}
                            {product.brand}
                        </p>
                        <p className="text-gray-700">
                            <strong className="font-medium text-gray-900">
                                Description:
                            </strong>{' '}
                            {product.description &&
                                `${product.description.substring(0, 100)}...`}
                        </p>
                        <Link
                            onClick={() => addToCart(product)}
                            className="block text-center text-blue-600 hover:underline font-medium"
                        >
                            Add to Cart
                        </Link>
                    </article>
                )}
            </div>
        </div>
    );
};

export default ProductDetails;
