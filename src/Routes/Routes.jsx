import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import ErrorPage from "../Shared/ErrorPage";
import CreateShop from "../Pages/CreateShop/CreateShop";
import SubscriptionPage from "../Components/SubscriptionPage";
import ManageProduct from "../Pages/Dashboard/ShopManager/ManageProduct";



const Routes = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout/>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/sign-up',
                element: <Register></Register>
            },
            {
                path: '/create-shop',
                element: <CreateShop></CreateShop>
            },
        ]

    },
    {
        path: 'subscription-plan',
        element: <SubscriptionPage></SubscriptionPage>
    },
    {
        path: 'manage-product',
        element: <ManageProduct/>
    },
])
export default Routes;