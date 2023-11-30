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
import AllProduct from "../Pages/Dashboard/ShopManager/AllProduct";
import AddProduct from "../Pages/Dashboard/ShopManager/AddProduct";
import ProductUpdate from "../Pages/Dashboard/ShopManager/ProductUpdate";
import Payments from "../Pages/Dashboard/ShopManager/Payments";
import CheckedProduct from "../Pages/Dashboard/ShopManager/CheckedProduct";
import DashboardRoute from "./DashboardRoute";
import SellSummary from "../Pages/Dashboard/ShopManager/SellSummary";
import Shops from "../Pages/Dashboard/SystemAdmin/Shops";
import AdminRoute from "./AdminRoute";
import AdminSellSummary from "../Pages/Dashboard/SystemAdmin/AdminSellSummary";
import WatchDemo from "../Pages/WatchDemo/WatchDemo";
import ForbiddenRoute from "./ForbiddenRoute";
import ShopAccess from "../Pages/Dashboard/ShopManager/ShopAccess";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/forbidden",
        element: <ForbiddenRoute></ForbiddenRoute>,
      },
      {
        path: "/watch-demo",
        element: <WatchDemo/>,
      },
      {
        path: "/login",
        element: <Login/>,
      },
      {
        path: "/sign-up",
        element: <Register></Register>,
      },
      {
        path: "/create-shop",
        element: (
          <PrivateRoutes>
            <CreateShop />
          </PrivateRoutes>
        ),
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <DashboardRoute>
        <Dashboard />
      </DashboardRoute>
    ),
    children: [
      {
        path: "products",
        element: <AllProduct />,
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },
      {
        path: "subscription-plan",
        element: <SubscriptionPage />,
      },
      {
        path: "manage-product",
        element: <ManageProduct />,
      },
      {
        path: "product-update/:id",
        element: <ProductUpdate />,
      },
      {
        path: "payment/:price",
        element: <Payments />,
      },
      {
        path: "checked-product",
        element: <CheckedProduct />,
      },
      {
        path: "shop-access",
        element: <ShopAccess />,
      },
      {
        path: "sell-summary",
        element: <SellSummary />,
      },
      {
        path: "all-shop",
        element: <AdminRoute><Shops /></AdminRoute>,
      },
      {
        path: "admin-sell-summary",
        element: <AdminRoute><AdminSellSummary /></AdminRoute>,
      },
    ],
  },
]);
export default Routes;
