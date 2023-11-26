import { useLocation, useNavigate } from "react-router-dom";
import loginBg from "../../assets/login-tree.jpg";
import toast from "react-hot-toast";
import useAuth from "../../Hook/useAuth";
import SocialLogin from "../../Shared/SocialLogin";
import useManager from "../../Hook/useManager";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userSignIn } = useAuth();
  const [manager] = useManager()

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    userSignIn(email, password)
      .then(() => {
        toast.success("Successfully user logged in!");

        navigate(location?.state ? location?.state?.from : manager ? "/dashboard/products":"/");
      })
      .catch((error) => {
        toast.error(error.message.firebase, "Email/Password invalid");
      });
  };
  return (
    <div className="min-h-screen flex justify-center items-center flex-col space-y-10 bg-zinc-100 ">
        <Helmet>
        <title>TrendLoom | Login</title>
      </Helmet>
      <h4 className="text-5xl font-bold text-[#373737]">Login Now!</h4>
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
            <button type="submit" className="btn bg-[#7cb518]">Login</button>
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
