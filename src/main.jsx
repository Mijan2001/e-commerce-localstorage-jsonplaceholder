import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Cart from './pages/Cart.jsx';
import Navbar from './layout/Navbar.jsx';

import ProductDetails from './pages/ProductDetails.jsx';
import Contact from './pages/Contact.jsx';
import Products from './pages/Products.jsx';
import SignUp from './pages/SignUp.jsx';
import SignIn from './pages/SignIn.jsx';
import NotFound from './pages/NotFoud';
import Checkout from './payment/Checkout.jsx';
import { LocalStorageProvider } from './context/LocalStorage.jsx';
import Favourite from './pages/Favourite.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Navbar />,
        errorElement: <NotFound />,
        children: [
            {
                path: '/',
                element: <Products />
            },
            {
                path: '/signin',
                element: <SignIn />
            },
            {
                path: '/signup',
                element: <SignUp />
            },

            {
                path: '/products/:id',
                element: <ProductDetails />
            },
            {
                path: '/contact',
                element: <Contact />
            },

            {
                path: '/cart',
                element: <Cart />
            },
            {
                path: '/checkout',
                element: <Checkout />
            },
            {
                path: '/favourite',
                element: <Favourite />
            }
            // {
            //     path: '/dashboard/user',
            //     element: <ProtectedRoute />,
            //     children: [
            //         {
            //             path: 'profile',
            //             element: <UserProfile />
            //         },
            //         {
            //             path: 'orders',
            //             element: <UserOrder />
            //         }
            //     ]
            // },
            // {
            //     path: '/dashboard/admin',
            //     element: <AdminRoute />,
            //     children: [
            //         {
            //             path: 'profile',
            //             element: <AdminProfile />
            //         },
            //         {
            //             path: 'products',
            //             element: <AdminProducts />
            //         },
            //         {
            //             path: 'categories',
            //             element: <AdminCategories />
            //         },
            //         {
            //             path: 'users',
            //             element: <AdminManageUsers />
            //         }
            //     ]
            // }
        ]
    }
]);

createRoot(document.getElementById('root')).render(
    <LocalStorageProvider>
        <StrictMode>
            <RouterProvider router={router} />
        </StrictMode>
    </LocalStorageProvider>
);
