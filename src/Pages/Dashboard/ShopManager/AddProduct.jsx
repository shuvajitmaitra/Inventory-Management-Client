import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import toast from "react-hot-toast";
import useAuth from "../../../Hook/useAuth";
import { useNavigate } from "react-router-dom";
import useManagerInfo from "../../../Hook/useManagerInfo";
import useProducts from "../../../Hook/useProducts";
import { Helmet } from "react-helmet-async";
const image_api_key = import.meta.env.VITE_IMAGE_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_api_key}`;

const AddProduct = () => {
  const axiosPublic = useAxiosPublic();
  const {user} = useAuth()
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate()
  const [managerInfo] = useManagerInfo()
  const [,refetch] = useProducts()
 

  const onSubmit = async (data) => {
    const imageFile = { image: data.productImage[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: { "content-type": "multipart/form-data" },
    });
    console.log(res.data.data.display_url);

    if (res?.data?.success) {
      const profitMargin = parseFloat(data.profitMargin)
      const makingCost = parseFloat(data.makingCost)
     
      const productPrice = makingCost + (makingCost*0.075) + (makingCost*(profitMargin/100))
      const currentDate = new Date().toJSON().slice(0, 10);

      const productData = {
         shopId: managerInfo?.shopId,
         shopName: managerInfo?.shopName,
         email: managerInfo?.email,
         productAddedDate: currentDate,
         productName: data?.productName,
         productImage: res.data?.data?.display_url,
         productQuantity: data?.productQuantity,
         productLocation: data?.productLocation,
         profitMargin: profitMargin,
         makingCost: makingCost,
         productPrice: productPrice,
         productDiscount: data.productDiscount,
         productDescription: data.productDescription,
         saleCount: 0,
      };
      
      const productLimit = parseInt(managerInfo.productLimit)
      if(productLimit>0){
         const response = await axiosPublic.post("/products", productData);
      if (response.data.insertedId) {
         const newProductLimit = {newProductLimit: productLimit -1}
         axiosPublic.patch(`/newProductLimit/${user.email}`, newProductLimit )
         .then((res) => {
            if(res?.data?.modifiedCount){
              refetch()
              navigate('/dashboard/products')
              toast.success("Product added");


          }
        });
      }
      }else{
         toast("You Product Limit Reach", {icon: "🤦‍♂️"})
         navigate('/dashboard/subscription-plan')
      }
    }
  };

  const inputStyle =
    "focus:border-b-2 focus:border-[#7cb518] focus:outline-none text-[#7cb518] border-b-2 border-zinc-300 pb-3 w-full font-medium";
  return (
    <div className="min-h-screen flex justify-center items-center flex-col space-y-10 bg-zinc-100 ">
        <Helmet>
        <title>TrendLoom | Product Add</title>
      </Helmet>
      <h4 className="text-5xl font-bold text-[#373737]">Add Your Product!</h4>
      <div className="h-1/2 max-w-4xl md:w-3/4 flex flex-col md:flex-row shadow-2xl  shadow-zinc-400 rounded-lg bg-white">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card-body"
        >
          <div className="md:flex gap-6 mb-6">
            <input
              type="text"
              placeholder="Product Name"
              {...register("productName", { required: true })}
              className={inputStyle}
              required
            />
            <input
              type="file"
              {...register("productImage", { required: true })}
              placeholder="Upload Product Image"
              className={inputStyle}
              required
            />
          </div>
          <div className="md:flex gap-6 mb-6">
            <input
              type="number"
              placeholder="Product Quantity"
              {...register("productQuantity", { required: true })}
              className={inputStyle}
              required
            />
            <input
              type="text"
              {...register("productLocation", { required: true })}
              placeholder="Product Location"
              className={inputStyle}
              required
            />
          </div>
          <div className="md:flex gap-6 mb-6">
            <input
              type="number"
              placeholder="Product Making Cost"
              {...register("makingCost", { required: true })}
              className={inputStyle}
              required
            />
            <input
              type="number"
              placeholder="Profit Margin in Percentage(%)"
              {...register("profitMargin", { required: true })}
              className={inputStyle}
              required
            />
          </div>
          <div className="md:flex gap-6 mb-6">
            <input
              type="number"
              placeholder="Discount in Percentage(%)"
              {...register("productDiscount", { required: true })}
              className={inputStyle}
              required
            />
            <input
              type="text"
              placeholder="Product Description"
              {...register("productDescription", { required: true })}
              className={inputStyle}
              required
            />
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn bg-[#7cb518] text-lg hover:text-[#7cb518] font-medium text-white">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddProduct;
