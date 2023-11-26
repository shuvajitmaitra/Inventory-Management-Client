import { Link } from "react-router-dom";
import useProducts from "../../../Hook/useProducts";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useManagerInfo from "../../../Hook/useManagerInfo";
import useAuth from "../../../Hook/useAuth";
import { Helmet } from "react-helmet-async";

const ManageProduct = () => {
  const [products, refetch, isLoading] = useProducts();
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [managerInfo] = useManagerInfo();
  const productLimit = parseInt(managerInfo?.productLimit);
  const newProductLimit = { newProductLimit: productLimit + 1 };

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <progress className="progress w-56"></progress>
      </div>
    );
  }
  
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/productDelete/${id}`).then((res) => {
          if (res?.data?.deletedCount) {
            axiosPublic
              .patch(`/newProductLimit/${user.email}`, newProductLimit)
              .then((res) => {
                if (res?.data?.modifiedCount) {
                  refetch();
                  toast("Products deleted", { icon: "🗑️" });
                }
              });
          }
        });
      }
    });
  };
  return (
    <div className=" bg-zinc-100  min-h-screen">
        <Helmet>
        <title>TrendLoom | Product Manage</title>
      </Helmet>
      {products.length ? (
        <div>
          <div className="py-5">
            <h3 className="text-center font-bold text-4xl">Manage Products</h3>
          </div>
          <div className="flex justify-between items-center p-10 pb-0">
            <h3 className="text-xl font-medium">
              Total Products: {products.length}
            </h3>
            <Link to={productLimit === 0 ? "/dashboard/subscription-plan" :"/dashboard/add-product" }>
              <button className="btn bg-[#7cb518] btn-sm text-white  rounded mb-3">
                Add Products
              </button>
            </Link>
          </div>
          <div className=" p-10 m-10 rounded-lg bg-[#7bb5186b]">
            <div className="overflow-x-auto rounded-lg ">
              <table className="table">
                {/* head */}
                <thead className="bg-[#b2ee4a]">
                  <tr>
                    <th> #</th>
                    <th>Product Image</th>
                    <th>Product Name</th>
                    <th>Product Quantity</th>
                    <th>Sale Count</th>
                    <th>Product Update</th>
                    <th>Product Delete</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {/* row 1 */}
                  {products.map((product, index) => (
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
                        {product.productQuantity}
                      </td>
                      <td className="text-zinc-600">{product.saleCount}</td>
                      <td>
                        <Link to={`/dashboard/product-update/${product._id}`}>
                          <button className="text-zinc-600 font-medium py-1 px-2 rounded bg-[#b2ee4a] shadow-md shadow-green-400">
                            Update
                          </button>
                        </Link>
                      </td>
                      <th>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="text-white font-medium py-1 px-2 rounded bg-red-500 shadow-md shadow-green-400"
                        >
                          Delete
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
          <Link to={productLimit === 0 ? "/dashboard/subscription-plan" :"/dashboard/add-product" }>
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
export default ManageProduct;
