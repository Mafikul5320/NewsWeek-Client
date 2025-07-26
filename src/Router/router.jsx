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
            },
            {
                path: "/all-articles",
                Component: AllArticles
            },
            {
                path: "/Articles-Details/:id",
                Component: ArticlesDetails
            },
            {
                path: "/subscription",
                Component: PlansSection
            },
            {
                path: "/payment/:id",
                Component: PaymentPage
            },
            {
                path: "/premium-articles",
                Component: PremiumArticles
            },
            {
                path: "/my-profile",
                Component: MyProfile
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
            }
        ]
    },
    {
        path: "/dashboard",
        Component: Dashboard,
        children: [
            {
                path: "/dashboard",
                Component: DashboardLayout
            },
            {
                path: "all-user",
                Component: AllUsers
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