import { createBrowserRouter, redirect } from "react-router-dom";

import { LoginPage } from "./pages/login";
import { DashboardPage } from "./pages/dashboard";

import { StaticsPage } from "./pages/dashboard/pages/statics";
import { ProductsPage } from "./pages/dashboard/pages/products";
import { UsersPage } from "./pages/dashboard/pages/users";

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

        children: [
            { path: '', element: <StaticsPage />  },
            { path: 'users', element: <UsersPage />  },
            { path: 'products', element: <ProductsPage />  },
        ]
    }
]);
