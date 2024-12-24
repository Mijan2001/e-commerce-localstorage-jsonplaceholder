import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between items-center">
                    <div className="w-full md:w-1/3 text-center md:text-left mb-4 md:mb-0">
                        <h2 className="text-xl font-bold">E-Commerce Store</h2>
                        <p className="text-sm">© 2023 All rights reserved.</p>
                    </div>
                    <div className="w-full md:w-1/3 text-center mb-4 md:mb-0">
                        <ul className="flex justify-center space-x-4">
                            <li>
                                <a href="#" className="hover:text-gray-400">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-gray-400">
                                    Shop
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-gray-400">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-gray-400">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/3 text-center md:text-right">
                        <ul className="flex justify-center md:justify-end space-x-4">
                            <li>
                                <a href="#" className="hover:text-gray-400">
                                    Facebook
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-gray-400">
                                    Twitter
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-gray-400">
                                    Instagram
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-gray-400">
                                    LinkedIn
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
