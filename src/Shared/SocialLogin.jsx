import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAuth from "../Hook/useAuth";
import useAxiosPublic from "../Hook/useAxiosPublic";
import useManager from "../Hook/useManager";

const SocialLogin = () => {
  const axiosPublic = useAxiosPublic();
  const { googleSignIn } = useAuth();
  const navigate = useNavigate();
  const [manager] = useManager()

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((res) => {
        const userInfo = {
          name: res.user?.displayName,
          email: res.user?.email,
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          if (res.data.insertedId) {
            toast.success("User create successfully!");
          }
        });
        navigate(!manager ? "/dashboard/products":"/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div
      onClick={handleGoogleSignIn}
      className="btn btn-outline text-xl border-2 hover:bg-[#7cb518] hover:text-white hover:border-none border-[#7cb518] text-[#7cb518] w-full"
    >
      <FcGoogle className="text-2xl" /> Sign In with Google
    </div>
  );
};
export default SocialLogin;
