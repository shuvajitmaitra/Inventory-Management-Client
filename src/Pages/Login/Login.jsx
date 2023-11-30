import { Link, useNavigate } from "react-router-dom";
import loginBg from "../../assets/Sign/login.png";
import toast from "react-hot-toast";
import useAuth from "../../Hook/useAuth";
import SocialLogin from "../../Shared/SocialLogin";
import useManager from "../../Hook/useManager";
import { Helmet } from "react-helmet-async";
import useAdmin from "../../Hook/useAdmin";
import { useState } from "react";
import RouteTitle from "../../Components/RouteTitle";

const Login = () => {
  const [logged, setLogged] = useState(false);
  const navigate = useNavigate();
  const { userSignIn } = useAuth();
  const [isManager] = useManager();
  const [isAdmin] = useAdmin();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    userSignIn(email, password)
      .then(() => {
        toast.success("Successfully user logged in!");
        setLogged(true);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Email/Password invalid");
      });
  };

  if (logged) {
    if(isManager !== undefined || isAdmin !== undefined){
      navigate(
        !isManager && !isAdmin
      ? "/create-shop"
      : isManager
      ? "/dashboard/products"
      : isAdmin
      ? "/dashboard/all-shop"
      : "/"
      )

    }else{
      navigate(
        "/" 
      );
    }
  }
  return (
    <div className="min-h-screen flex justify-center items-center flex-col space-y-10 bg-zinc-100 ">
      <Helmet>
        <title>TrendLoom | Login</title>
      </Helmet>
      <RouteTitle heading="SignIn Now!" />
      <div className="h-1/2 max-w-4xl md:w-3/4 flex flex-col md:flex-row shadow-2xl  shadow-zinc-400 rounded-lg bg-white">
        <div className="h-96 flex-1 hidden md:flex items-center">
          <img
            src={loginBg}
            className="p-6 block right-0 left-0 h-full object-contain"
          />
        </div>
        <form
          onSubmit={handleSubmit}
          className="card-body flex-1"
        >
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              name="email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="password"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn bg-[#7cb518]"
            >
              Login
            </button>
          </div>
          <div className="font-medium">
            <h3>
              New here?
              <Link
                to={"/sign-up"}
                className="text-primary"
              >
                Sign Up
              </Link>
            </h3>
          </div>
          <div className="divider"></div>
          <div>
            <SocialLogin></SocialLogin>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
