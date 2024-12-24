import React from 'react';

const Pagination = ({ totalPages, currentPage, onHandleCurrentPage }) => {
    const handleFirstPage = () => {
        onHandleCurrentPage(1);
    };
    const handleLastPage = () => {
        onHandleCurrentPage(totalPages);
    };
    const handlePreviousChange = () => {
        if (currentPage > 1) {
            onHandleCurrentPage(currentPage - 1);
        }
    };
    const handleNextChange = () => {
        if (currentPage < totalPages) {
            onHandleCurrentPage(currentPage + 1);
        }
    };

    const getVisiblePageNumbers = () => {
        const visiblePages = 5;
        const pages = [];

        let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
        let endPage = Math.min(totalPages, startPage + visiblePages - 1);

        if (endPage - startPage < visiblePages - 1) {
            startPage = Math.max(1, endPage - visiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    };

    const visilePageNumbers = getVisiblePageNumbers();

    return (
        <div className="flex justify-center items-center space-x-2 mt-4">
            <button
                onClick={handleFirstPage}
                disabled={currentPage === 1}
                aria-label="First Page"
                className="px-3 py-1 border rounded disabled:opacity-50"
            >
                &laquo;&laquo;
            </button>
            <button
                onClick={handlePreviousChange}
                disabled={currentPage === 1}
                aria-label="Previous Page"
                className="px-3 py-1 border rounded disabled:opacity-50"
            >
                &laquo;
            </button>
            {visilePageNumbers.map(pageNumber => {
                return (
                    <button
                        key={pageNumber}
                        onClick={() => onHandleCurrentPage(pageNumber)}
                        className={`px-3 py-1 border rounded ${
                            currentPage === pageNumber
                                ? 'bg-blue-500 text-white'
                                : 'bg-white text-black'
                        }`}
                    >
                        {pageNumber}
                    </button>
                );
            })}
            <button
                onClick={handleNextChange}
                disabled={currentPage === totalPages}
                aria-label="Next Page"
                className="px-3 py-1 border rounded disabled:opacity-50"
            >
                &raquo;
            </button>
            <button
                onClick={handleLastPage}
                disabled={currentPage === totalPages}
                aria-label="Last Page"
                className="px-3 py-1 border rounded disabled:opacity-50"
            >
                &raquo;&raquo;
            </button>
        </div>
    );
};

export default Pagination;
