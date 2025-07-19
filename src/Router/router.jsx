import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import HomeLayout from "../Layout/HomeLayout";
import AddArticles from "../Pages/AddArticles";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        children: [
            {
                path: "/",
                Component: HomeLayout
            },
            {
                path: "/add-articles",
                Component: AddArticles
            }
        ]
    }
])