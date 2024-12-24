import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination';
import Search from '../components/Search.jsx';
import Sort from '../components/Sort';
import { MdFavorite } from 'react-icons/md';
import { useLocalStorageLength } from '../context/LocalStorage.jsx';
const Products = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [favouriteProduct, setFavouriteProduct] = useState(false);
    const { flag, setFlag } = useLocalStorageLength();

    // pagination
    const itemsPerPage = 12;
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    // serach
    const [searchTerm, setSearchTerm] = useState('');

    const [sortCriteria, setSortCriteria] = useState('');

    const fetchData = (currentPage, searchTerm, sortCriteria) => {
        setIsLoading(true);
        setError(null);
        let url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${
            (currentPage - 1) * itemsPerPage
        }`;
        if (searchTerm !== '') {
            url = `https://dummyjson.com/products/search?q=${searchTerm}&limit=${itemsPerPage}&skip=${
                (currentPage - 1) * itemsPerPage
            }`;
        }
        if (sortCriteria) {
            // title-asc
            const spiltSortCriteria = sortCriteria.split('-');
            console.log(spiltSortCriteria);
            url += `&sortBy=${spiltSortCriteria[0]}&order=${spiltSortCriteria[1]}`;
        }
        fetch(url)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Data could not be fetched');
                }
                return res.json();
            })
            .then(data => {
                setProducts(data.products);
                // console.log(data.products);
                // console.log(currentPage);
                setTotalPages(Math.ceil(data.total / itemsPerPage));
            })
            .catch(error => setError(error.message))
            .finally(() => setIsLoading(false));
    };
    useEffect(() => {
        fetchData(currentPage, searchTerm, sortCriteria);
    }, [currentPage, searchTerm, sortCriteria]);

    useEffect(() => {}, []);

    // const handleCurrentPage = (index) => {
    //   setCurrentPage(index + 1);
    // };

    const handleSearchChange = event => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // reset to first page on new search
    };

    // search in the same page
    // const filterProducts = products.filter((product) =>
    //   product.title.toLowerCase().includes(searchTerm.toLowerCase())
    // );

    const handleSortChange = event => {
        setSortCriteria(event.target.value);
    };

    const addToFavourite = async product => {
        setFavouriteProduct(!favouriteProduct);

        const favourite = JSON.parse(localStorage.getItem('favourite')) || [];
        if (favourite.includes(product.id)) {
            alert('Product is already in the favourite');
        } else {
            favourite.push(product.id);
            localStorage.setItem('favourite', JSON.stringify(favourite));
            alert('Product added to favourite');
        }
        setFlag(!flag);
    };
    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">All Products</h2>
            <div className="flex justify-between mb-4">
                <Search
                    searchTerm={searchTerm}
                    onHandleSearchChange={handleSearchChange}
                />
                <Sort
                    sortCriteria={sortCriteria}
                    onHandleSortChange={handleSortChange}
                />
            </div>
            {isLoading && (
                <p className="text-center">Products are loading...</p>
            )}
            {error && <p className="text-center text-red-500">{error}</p>}
            {!isLoading && !error && (
                <>
                    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {products &&
                            products.length > 0 &&
                            products.map(product => {
                                const {
                                    id,
                                    title,
                                    description,
                                    price,
                                    category,
                                    images
                                } = product;
                                return (
                                    <article
                                        key={id}
                                        className="border p-4 rounded shadow"
                                    >
                                        <img
                                            src={images[0]}
                                            alt={title}
                                            className="w-full h-48 object-cover mb-4"
                                        />
                                        <h3 className="text-lg font-semibold">
                                            {title}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Category: {category}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            Price: ${price}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            {description &&
                                                description.substring(0, 100)}
                                            ...
                                        </p>
                                        <div className="flex justify-between items-center mt-4">
                                            <Link
                                                to={`/products/${id}`}
                                                state={product}
                                                className="text-blue-500 hover:underline mt-2 inline-block"
                                            >
                                                Show Details
                                            </Link>
                                            <span>
                                                <button
                                                    className={`hover:text-red-700 text-red-300 text-lg active:bg-blue-500 transition duration-300`}
                                                >
                                                    <MdFavorite
                                                        onClick={() =>
                                                            addToFavourite(
                                                                product
                                                            )
                                                        }
                                                        className="size-8"
                                                    />
                                                </button>
                                            </span>
                                        </div>
                                    </article>
                                );
                            })}
                    </section>

                    <Pagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onHandleCurrentPage={setCurrentPage}
                    />
                </>
            )}
        </div>
    );
};

export default Products;
