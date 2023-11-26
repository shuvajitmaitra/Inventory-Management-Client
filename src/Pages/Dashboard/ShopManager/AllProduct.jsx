import { Link, useNavigate } from "react-router-dom";
import useProducts from "../../../Hook/useProducts";
import { FaSearch } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { IoBagCheckOutline } from "react-icons/io5";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";


const AllProduct = () => {
  const [products, isLoading] = useProducts();
  const [allProducts, setAllProducts] = useState(products)
  const axiosPublic = useAxiosPublic()
  const navigate = useNavigate()

  useEffect(() => {
  setAllProducts(products)
}, [products])

if (isLoading) {
  return (
    <div className="h-screen flex justify-center items-center">
      <progress className="progress w-56"></progress>
    </div>
  );
}

  const handleCheckOut = (product)=>{
    if(product.productQuantity <=0){
      navigate('/dashboard/manage-product')
      return toast("Insufficient Product Quantity",{icon: "🥲"})
    }
    const checkedProducts = {
    
    productId: product._id,
    shopName:product.shopName,
    shopId:product.shopId, 
    email:product.email,
    productAddedDate:product.productAddedDate,
    productName:product.productName,
    productImage:product.productImage,
    productQuantity:product.productQuantity,
    productLocation:product.productLocation,
    profitMargin:product.profitMargin,
    makingCost:product.makingCost,
    productPrice:product.productPrice,
    productDiscount:product.productDiscount,
    productDescription:product.productDescription,
    saleCount:product.saleCount
    }
    axiosPublic.post("/product-check-out",checkedProducts )
    .then(res=>{
      if(res.data.insertedId){
        toast.success("Checked Out")
        navigate("/dashboard/checked-product")
      }
    })
  }

  const handleSearch = (e)=>{
    e.preventDefault()
    const id = e.target.search.value
    const filter = products?.filter(item=>item._id === id)
    setAllProducts(filter)
 

  }

  return (
    <div className="min-h-screen bg-zinc-100 lg:px-10">
        <Helmet>
        <title>TrendLoom | Sales Collection</title>
      </Helmet>
      {products.length ? (
        <div className="space-y-7 py-10">
            <h3 className="text-5xl text-center font-medium">All Product are here</h3>
          <div>
           <form onSubmit={handleSearch}>
           <span className="relative w-fit">
           <input type="text" name="search" className="w-1/2 mx-auto py-3 rounded-full " />
            <button ><FaSearch className="absolute top-1 right-4" /></button>
           </span>
           </form>
          </div>
          <div className=" p-10 m-10 lg:m-0 rounded-lg bg-[#7bb51862]">
            <div className="overflow-x-auto rounded-lg ">
              <table className="table">
                {/* head */}
                <thead className="bg-[#b1f044]">
                  <tr>
                    <th> #</th>
                    <th>Product Image</th>
                    <th>Product Name</th>
                    <th>Product ID</th>
                    <th>Product Quantity</th>
                    <th>Product Discount</th>
                    <th>Product Price</th>
                    <th>Check Out</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {/* row 1 */}
                  {allProducts.map((product, index) => (
                    <tr key={product._id}>
                      <th>{index + 1}</th>
                      <td>
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={product.productImage}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="font-medium">{product.productName}</td>
                      <td className="text-zinc-600">
                        {product._id}
                      </td>
                      <td className="text-zinc-600">
                        {product.productQuantity}
                      </td>
                      <td className="text-zinc-600">
                        {product.productDiscount} %
                      </td>
                      <td className="text-zinc-600">${product.productPrice}</td>
                      <th>
                      <button onClick={()=>handleCheckOut(product)} className="text-zinc-600 font-medium p-3 text-2xl rounded bg-[#b2ee4a] shadow-md shadow-green-400">
                            <IoBagCheckOutline />
                      </button>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
        </div>
          </div>
        </div>
      ) : (
        <span className="flex h-screen justify-center items-center flex-col">
          <Link to="/dashboard/add-product">
            <button className="btn bg-[#7cb518]  rounded btn-lg mb-3">
              Add Products
            </button>
          </Link>
          <p className="text-zinc-500">
            No products in your shop please add some product
          </p>
        </span>
      )}
    </div>
  );
};
export default AllProduct;
