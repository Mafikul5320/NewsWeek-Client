import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import HomeLayout from "../Layout/HomeLayout";
import AddArticles from "../Pages/AddArticles";
import ArticlesDetails from "../Pages/ArticlesDetails";
import PlansSection from "../Home/PlansSection";
import PremiumArticles from "../Pages/PremiumArticles";
import MyProfile from "../Pages/MyProfile";
import UserArticles from "../Pages/UserArticles";
import Dashboard from "../Dashboard/Dashboard";
import DashboardLayout from "../Layout/DashboardLayout";
import AllUsers from "../Dashboard/AllUsers";
import AllArticlesDash from "../Dashboard/AllArticlesDash";
import AddPublisher from "../Dashboard/AddPublisher";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import AllArticles from "../Pages/AllArticle/AllArticles";
import PaymentPage from "../Pages/PaymentSystem/PaymentPage";
import ArticlesUpdate from "../Pages/ArticlesUpdate";
import PrivateRouter from "../Context/PrivateRoute";
import ForbiddenPage from "../Pages/ForbiddenPage ";
import AdminRouter from "../Context/AdminRouter";

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
                element: <PrivateRouter><AddArticles></AddArticles></PrivateRouter>
            },
            {
                path: "/all-articles",
                Component: AllArticles
            },
            {
                path: "/Articles-Details/:id",
                element: <PrivateRouter><ArticlesDetails></ArticlesDetails></PrivateRouter>
            },
            {
                path: "/subscription",
                element: <PrivateRouter><PlansSection></PlansSection></PrivateRouter>
            },
            {
                path: "/payment/:id",
                element: <PrivateRouter><PaymentPage></PaymentPage></PrivateRouter>
            },
            {
                path: "/premium-articles",
                element: <PrivateRouter><PremiumArticles></PremiumArticles></PrivateRouter>

            },
            {
                path: "/my-profile",

                element: <PrivateRouter><MyProfile></MyProfile></PrivateRouter>
            },
            {
                path: "/user-articles",
                Component: UserArticles
            },
            {
                path: "/login",
                Component: Login
            },
            {
                path: "/register",
                Component: Register
            },
            {
                path: "/forbidden",
                Component: ForbiddenPage
            },
            {
                path: "/article-update/:id",
                element: <PrivateRouter><ArticlesUpdate></ArticlesUpdate></PrivateRouter>
            }
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRouter><Dashboard></Dashboard></PrivateRouter>,
        children: [
            {
                path: "/dashboard",
                element: <AdminRouter><DashboardLayout></DashboardLayout></AdminRouter>
            },
            {
                path: "all-user",
                element: <AdminRouter><AllUsers></AllUsers></AdminRouter>
            },
            {
                path: "all-articles",
                Component: AllArticlesDash
            },
            {
                path: "add-publisher",
                Component: AddPublisher
            },
        ]
    }
])