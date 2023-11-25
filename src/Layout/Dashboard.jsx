import { FaBars, FaList, FaShoppingBag } from "react-icons/fa";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { MdOutlineHome, MdOutlineSettings, MdOutlineSubscriptions } from "react-icons/md";
import useAuth from "../Hook/useAuth";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const Dashboard = () => {
  const navStyle =
    "bg-[#7cb518] flex justify-center items-center gap-1 font-medium text-white my-4 py-1 rounded w-full";
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const handleLogOut = () => {
    Swal.fire({
      title: "Logout?",
      text: "Do you want to logged out from here!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "LogOut",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then((result) => {
            console.log(result.user);
            Swal.fire({
              title: "Log Out!",
              text: "successfully Logged Out!",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/");
          })
          .catch((error) => {
            console.log(error.message);
          });
      }
    });
  };
  const dashLink = (
    <>
      <li>
        <NavLink
          className={navStyle}
          to="/dashboard/products"
        >
          <MdOutlineHome />
          Products
        </NavLink>
      </li>
      <li>
        <NavLink
          className={navStyle}
          to="/dashboard/manage-product"
        >
          <MdOutlineSettings />
          Manage Products
        </NavLink>
      </li>
      <li>
        <NavLink
          className={navStyle}
          to="/dashboard/subscription-plan"
        >
          <MdOutlineSubscriptions />
          Subscription
        </NavLink>
      </li>
      <li>
        <NavLink
          className={navStyle}
          to="/"
        >
          <MdOutlineHome />
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={navStyle}
          to="/our-menu"
        >
          <FaList />
          Menu
        </NavLink>
      </li>
      <li>
        <button
          className={navStyle}
          onClick={handleLogOut}
        >
          <FaShoppingBag />
          Sign Out
        </button>
      </li>
    </>
  );
  return (
    <div className="min-h-screen max-w-screen-2xl mx-auto flex text-center ">
        <Helmet>
        <title>TrendLoom | Dashboard</title>
      </Helmet>
      <div className="hidden lg:block w-64 bg-zinc-200 px-10 py-5 space-y-3">
        <span className="text-xl font-medium">TrendLoom</span>
        <ul>{dashLink}</ul>
      </div>

      <div className="lg:hidden">
        <div className="drawer ">
          <input
            id="my-drawer"
            type="checkbox"
            className="drawer-toggle "
          />
          <div className="drawer-content p-8 flex items-center gap-6">
            {/* Page content here */}
            <label
              htmlFor="my-drawer"
              className="drawer-button"
            >
              <FaBars className="text-xl" />
            </label>
            <span className="text-xl">TrendLoom </span>
          </div>
          <div className="drawer-side ">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className=" w-80 min-h-full px-10 bg-base-200 text-base-content">
              {dashLink}
            </ul>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <Outlet></Outlet>
      </div>
    </div>
  );
};
export default Dashboard;
