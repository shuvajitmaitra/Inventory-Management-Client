import toast from "react-hot-toast";
import loginBg from "../../assets/login-tree.jpg";
import useAuth from "../../Hook/useAuth";
import { useForm } from "react-hook-form";
import { updateProfile } from "firebase/auth";
import auth from "../../Firebase/firebase.config";
import SocialLogin from "../../Shared/SocialLogin";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Register = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { createUser, logOut } = useAuth();
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        updateProfile(auth.createUser, {
          name: data.name,
        })
          .then(() => {
            logOut()
              .then(() => {
                const userInfo = {
                  name: data.name,
                  email: data.email,
                };
                axiosPublic.post("/users", userInfo).then((res) => {
                  if (res.data.insertedId) {
                    toast.success("Successfully user created!");
                    navigate("/login");
                  }
                });
              })
              .catch((error) => {
                console.log(error.message);
              });
          })
          .catch((error) => {
            console.log(error.message);
          });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="min-h-screen flex py-20 justify-center items-center flex-col space-y-10 bg-zinc-100 ">
        <Helmet>
        <title>TrendLoom | Sing Up</title>
      </Helmet>
      <h4 className="text-5xl font-bold text-[#373737]">SignUp Now!</h4>
      <div className="min-h-1/2 max-w-4xl md:w-3/4 flex flex-col md:flex-row shadow-2xl  shadow-zinc-400 rounded-lg bg-white">
        <div className=" flex-1 hidden md:flex items-center">
          <img
            src={loginBg}
            className="p-6 block right-0 left-0 h-full object-contain"
          />
        </div>
        <form
           onSubmit={handleSubmit(onSubmit)}
          className="card-body flex-1"
        >
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="name"
              {...register("name", { required: true })}
              name="name"
              className="input input-bordered"
              required
            />
            {/* {errors.name && (
              <span className="text-red-500">Name is required</span>
            )} */}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              {...register("email", { required: true })}
              name="email"
              className="input input-bordered"
              required
            />
            {/* {errors.email && (
              <span className="text-red-500">Email is required</span>
            )} */}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Image url</span>
            </label>
            <input
              type="text"
              placeholder="image url"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              {...register("password", {
                required: true,
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
              })}
              type="password"
              name="password"
              placeholder="password"
              className="input input-bordered"
              required
            />
            {/* {errors.password?.type == "pattern" && (
              <span className="text-red-500">Password Pattern not matched</span>
            )}
            {errors.password?.type == "required" && (
              <span className="text-red-500">Password is required</span>
            )} */}
          </div>
          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn bg-[#7cb518]"
            >
              Sign Up
            </button>
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
export default Register;
