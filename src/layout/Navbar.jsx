import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useSearchParams } from 'react-router-dom';
import { useLocalStorageLength } from '../context/LocalStorage';
import { FaCartPlus } from 'react-icons/fa6';

const Navbar = () => {
    const { storageLength } = useLocalStorageLength();
    console.log('totalItems', storageLength);

    return (
        <>
            <nav className="bg-gray-800 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-white text-lg font-bold">
                        E-Commerce Store
                    </div>
                    <div className="flex space-x-4">
                        <NavLink
                            to="/"
                            exact
                            className="text-gray-300 hover:text-white"
                            activeClassName="text-white"
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/favourite"
                            className="text-gray-300 hover:text-white"
                            activeClassName="text-white"
                        >
                            Favourite
                        </NavLink>
                        <NavLink
                            to="/signup"
                            className="text-gray-300 hover:text-white"
                            activeClassName="text-white"
                        >
                            Sign Up
                        </NavLink>
                        <NavLink
                            to="/contact"
                            className="text-gray-300 hover:text-white"
                            activeClassName="text-white"
                        >
                            Contact
                        </NavLink>
                        <NavLink
                            to="/cart"
                            className="text-gray-300 hover:text-white flex "
                            activeClassName="text-white"
                        >
                            <FaCartPlus className="text-lg mt-1" />
                            {storageLength.length > 0 && (
                                <span className="ml-1 bg-red-500/25 text-white rounded-full w-2 h-2 -px-1  text-xs">
                                    {storageLength.length}
                                </span>
                            )}
                        </NavLink>
                    </div>
                </div>
            </nav>
            <Outlet />
        </>
    );
};

export default Navbar;
