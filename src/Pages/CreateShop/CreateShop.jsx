import useAxiosPublic from "../../Hook/useAxiosPublic";
import useAuth from "../../Hook/useAuth";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

const CreateShop = () => {
  const axiosPublic = useAxiosPublic()
  const navigate = useNavigate()
  const {user} = useAuth()
  console.log(user);
  const inputStyle =
    "focus:border-b-2 focus:border-[#7cb518] focus:outline-none text-[#7cb518] border-b-2 border-zinc-300 pb-3 w-full font-medium";

  const handleSubmit = (e) => {
    e.preventDefault();
    const shopName = e.target.shopName.value;
    const shopLogo = e.target.shopLogo.value;
    const shopInfo = e.target.shopInfo.value;
    const shopLocation = e.target.shopLocation.value;
    const shopOwnerName = user.displayName;
    const shopOwnerEmail = user.email;

      const shopData = {
      shopName,
      shopLogo,
      shopInfo,
      shopLocation,
      shopOwnerName,
      shopOwnerEmail,
      }
      
      axiosPublic.post('/shopData', shopData)
      .then(res=>{
        if(res.data.insertedId=== null){
          toast.error(res.data.message)
        }
        if(res.data.insertedId){
        const shopManager = {
          shopName,
          shopLogo,
          shopInfo,
          shopLocation,
          shopId: res.data.insertedId,
          role: "manager",
          
        }
        axiosPublic.patch(`/users/manager/${user.email}`, shopManager)
        .then((res) => {
          if(res?.data?.modifiedCount){
            navigate("/dashboard/products")
           toast.success('user created')
          }
        });
        }
      })
  };

  return (
    <div className="min-h-screen flex justify-center items-center flex-col space-y-10 bg-zinc-100 ">
        <Helmet>
        <title>TrendLoom | Create Shop</title>
      </Helmet>
      <h4 className="text-5xl font-bold text-[#373737]">Create Your Shop!</h4>
      <div className="h-1/2 max-w-4xl md:w-3/4 flex flex-col md:flex-row shadow-2xl  shadow-zinc-400 rounded-lg bg-white">
        <form
          onSubmit={handleSubmit}
          className="card-body"
        >
          <div className="md:flex gap-6 mb-6">
            <input
              type="text"
              name="shopName"
              placeholder="Shop Name"
              className={inputStyle}
              required
            />
            <input
              type="text"
              name="shopLogo"
              placeholder="Shop Logo"
              className={inputStyle}
              required
            />
          </div>
          <div className="md:flex gap-6 mb-6">
            <input
              type="text"
              name="shopInfo"
              placeholder="Shop Info"
              className={inputStyle}
              required
            />
            <input
              type="text"
              name="shopLocation"
              placeholder="Shop Location"
              className={inputStyle}
              required
            />
          </div>
          <div className="md:flex gap-6 mb-6">
            <input
              type="text"
              name="shopOwnerName"
              placeholder="Shop-Owner Name"
              disabled
              defaultValue={user.displayName}
              className={inputStyle}
              required
            />
            <input
              type="text"
              name="shopOwnerEmail"
              disabled
              defaultValue={user.email}
              placeholder="Shop-Owner Email"
              className={inputStyle}
              required
            />
          </div>
          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn bg-[#7cb518] text-lg hover:text-[#7cb518] font-medium text-white"
            >
              Create Shop
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CreateShop;
