import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import HomeLayout from "../Layout/HomeLayout";
import AddArticles from "../Pages/AddArticles";
import AllArticlesPage from "../Pages/AllArticles";
import ArticlesDetails from "../Pages/ArticlesDetails";
import PlansSection from "../Home/PlansSection";
import PaymentPage from "../Pages/PaymentPage";
import PremiumArticles from "../Pages/PremiumArticles";
import MyProfile from "../Pages/MyProfile";
import UserArticles from "../Pages/UserArticles";

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
                Component: AllArticlesPage
            },
            {
                path: "/Articles-Details",
                Component: ArticlesDetails
            },
            {
                path: "/subscription",
                Component: PlansSection
            },
            {
                path: "/payment",
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
            }
        ]
    }
])