import React from 'react';

const Search = ({ searchTerm, onHandleSearchChange }) => {
    return (
        <div className="flex items-center justify-center p-4">
            <input
                type="text"
                className="border rounded-lg p-2 w-full max-w-md"
                placeholder="Search products..."
                value={searchTerm}
                onChange={onHandleSearchChange}
            />
        </div>
    );
};

export default Search;
