import { createBrowserRouter, redirect } from "react-router-dom";

import { LoginPage } from "./pages/login";
import { DashboardPage } from "./pages/dashboard";

import { StaticsPage } from "./pages/dashboard/pages/statics";
import { ProductsPage } from "./pages/dashboard/pages/products";
import { UsersPage } from "./pages/dashboard/pages/users";
import { ProductDetailsPage } from "./pages/dashboard/pages/products/details";
import { ProductsCategoriesPage } from './pages/dashboard/pages/products/categories'
import { AddProductCategoryPage } from "./pages/dashboard/pages/products/categories/add";
import { AddUserPage } from "./pages/dashboard/pages/users/add";


import { useAuthStore } from './states/auth';
import { validateToken } from './utils/token'

const moddlewareAuth = () => {
    const { accessToken, logoutUser } = useAuthStore.getState();

    if (!validateToken(accessToken)) {
        logoutUser();
        return redirect('/login');
    }

    return null;
}


export const router = createBrowserRouter([
    {
        path: "/",
        loader: () => redirect("/login")
    },
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/dashboard",
        element: <DashboardPage />,
        loader: moddlewareAuth,

        children: [
            { path: '', element: <StaticsPage />  },
            { path: 'users', element: <UsersPage />  },
            { path: 'products', element: <ProductsPage />  },
            
            { path: 'categories', element: <ProductsCategoriesPage /> },
            { path: 'categories/add', element: <AddProductCategoryPage /> },

            { path: 'products/add', element: <AddProductPage /> },
            { path: 'products/:id', element: <ProductDetailsPage />  },
            { path: 'users/add', element: <AddUserPage /> },
        ]
    }
]);
