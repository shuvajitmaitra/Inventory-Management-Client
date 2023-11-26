import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import ErrorPage from "../Shared/ErrorPage";
import CreateShop from "../Pages/CreateShop/CreateShop";
import SubscriptionPage from "../Pages/Dashboard/ShopManager/SubscriptionPage";
import ManageProduct from "../Pages/Dashboard/ShopManager/ManageProduct";
import PrivateRoutes from "./PrivateRoutes";
import Dashboard from "../Layout/Dashboard";
import ManagerRoute from "./ManagerRoute";
import AllProduct from "../Pages/Dashboard/ShopManager/AllProduct";
import AddProduct from "../Pages/Dashboard/ShopManager/AddProduct";
import ProductUpdate from "../Pages/Dashboard/ShopManager/ProductUpdate";
import Payments from "../Pages/Dashboard/ShopManager/Payments";
import CheckedProduct from "../Pages/Dashboard/ShopManager/CheckedProduct";



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
                element: <PrivateRoutes><CreateShop/></PrivateRoutes>
            },
        ]

    },
    
    {
        path: '/dashboard',
        element: <ManagerRoute><Dashboard/></ManagerRoute>,
        children: [
            {
                path: "products",
                element: <AllProduct/>
            },
            {
                path: "add-product",
                element: <AddProduct/>
            },
            {
                path: 'subscription-plan',
                element: <SubscriptionPage/>
            },
            {
                path: 'manage-product',
                element: <ManageProduct/>
            },
            {
                path: 'product-update/:id',
                element: <ProductUpdate/>
            },
            {
                path: 'payment/:price',
                element: <Payments/>
            },
            {
                path: 'checked-product',
                element: <CheckedProduct/>
            },

        ]
    },
])
export default Routes;