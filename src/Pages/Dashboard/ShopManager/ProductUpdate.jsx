import toast from "react-hot-toast";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";

const image_api_key = import.meta.env.VITE_IMAGE_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_api_key}`;


const ProductUpdate = () => {
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm();
    const params = useParams()

    
    const {data:singleProduct, isLoading} = useQuery({
        queryKey:["singleProduct"],
        queryFn: async()=>{
           const res = await axiosPublic.get(`/singleProduct/${params.id}`)
           return res?.data
        }
    })
    if (isLoading) {
      return (
        <div className="h-screen flex justify-center items-center">
          <progress className="progress w-56"></progress>
        </div>
      );
    }

    const onSubmit = async (data) => {
        const imageFile = { image: data.productImage[0] };
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
          headers: { "content-type": "multipart/form-data" },
        });
    
        if (res?.data?.success) {
          const profitMargin = parseFloat(data.profitMargin)
          const makingCost = parseFloat(data.makingCost)
         
          const productPrice = Math.floor( makingCost + (makingCost*0.075) + (makingCost*(profitMargin/100)))
    
          const productData = {
             productName: data?.productName,
             productImage: res.data?.data?.display_url,
             productQuantity: data?.productQuantity,   
             productLocation: data?.productLocation,
             profitMargin:profitMargin,
             makingCost:makingCost,
             productPrice: productPrice,
             productDiscount:data?.productDiscount,
             productDescription: data.productDescription,
          };
          
          const response = await axiosPublic.patch(`/productUpdate/${singleProduct._id}`, productData);
          if(!response.data.modifiedCount){
            return console.log(response.data);
          }
      if (response.data.modifiedCount) {
        toast.success("Product Updated");
        navigate('/dashboard/products')
      }
        }
      };

    const inputStyle =
    "focus:border-2 focus:border-[#7cb518] focus:outline-none text-[#7cb518] input border-2 border-zinc-300 w-full font-medium";
  return (
    <div className="min-h-screen flex justify-center items-center flex-col space-y-10 bg-zinc-100 ">
          <Helmet>
        <title>TrendLoom | Product Update</title>
      </Helmet>
      <h4 className="text-5xl font-bold text-[#373737]">Update Your Product!</h4>
      <div className="h-1/2 max-w-4xl md:w-3/4 flex flex-col md:flex-row shadow-2xl  shadow-zinc-400 rounded-lg bg-white">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card-body"
        >
          <div className="md:flex gap-6 mb-6">
             <div className="form-control flex-1">
                <label className="label">
            <span className="label-text">Product Name</span>
          </label>
            <input
              type="text"
              placeholder="Product Name"
              defaultValue={singleProduct?.productName}
              {...register("productName", { required: true })}
              className={inputStyle}
              required
            />
             </div>
             <div className="form-control flex-1">
                <label className="label">
            <span className="label-text">Product Image</span>
          </label>
            <input 
            type="file"
              {...register("productImage", { required: true })}
              placeholder="Upload Product Image"
              required  className={`file-input file-input-bordered w-full`} />
             </div>
          </div>
          <div className="md:flex gap-6 mb-6">
             <div className="form-control flex-1">
                <label className="label">
            <span className="label-text">Product Quantity</span>
          </label>
            <input
              type="number"
              placeholder="Product Quantity"
              defaultValue={singleProduct?.productQuantity}
              {...register("productQuantity", { required: true })}
              className={inputStyle}
              required
            />
             </div>
             <div className="form-control flex-1">
                <label className="label">
            <span className="label-text">Product Location</span>
          </label>
            <input
              type="text"
              defaultValue={singleProduct?.productLocation}
              {...register("productLocation", { required: true })}
              placeholder="Product Location"
              className={inputStyle}
              required
            />
             </div>
          </div>
          <div className="md:flex gap-6 mb-6">
             <div className="form-control flex-1">
                <label className="label">
            <span className="label-text">Making Cost</span>
          </label>
            <input
              type="number"
              placeholder="Product Making Cost"
              defaultValue={singleProduct?.makingCost}
              {...register("makingCost", { required: true })}
              className={inputStyle}
              required
            />
             </div>
             <div className="form-control flex-1">
                <label className="label">
            <span className="label-text">Profit Margin(%)</span>
          </label>
            <input
              type="number"
              placeholder="Profit Margin in Percentage(%)"
              defaultValue={singleProduct?.profitMargin}
              {...register("profitMargin", { required: true })}
              className={inputStyle}
              required
            />
             </div>
          </div>
          <div className="md:flex gap-6 mb-6">
             <div className="form-control flex-1">
                <label className="label">
            <span className="label-text">Discount Percentage(%)</span>
          </label>
            <input
              type="number"
              placeholder="Discount in Percentage(%)"
              defaultValue={singleProduct?.productDiscount}
              {...register("productDiscount", { required: true })}
              className={inputStyle}
              required
            />
             </div>
             <div className="form-control flex-1">
                <label className="label">
            <span className="label-text">Product Description</span>
          </label>
            <input
              type="text"
              placeholder="Product Description"
              defaultValue={singleProduct?.productDescription}
              {...register("productDescription", { required: true })}
              className={inputStyle}
              required
            />
             </div>
          </div>
          <div className="form-control flex-1 mt-6">
            <button type="submit" className="btn bg-[#7cb518] text-lg hover:text-[#7cb518] font-medium text-white">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default ProductUpdate;