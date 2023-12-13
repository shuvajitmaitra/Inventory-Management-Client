import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { MdShoppingCartCheckout } from "react-icons/md";
import useProducts from "../../Hook/useProducts";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import RouteTitle from "../../Components/RouteTitle";
import useManager from "../../Hook/useManager";

const AllProduct = () => {
  const [products,refetch] = useProducts();
  const [isManager] = useManager()
  const [allProducts, setAllProducts] = useState(products);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    setAllProducts(products);
  }, [products,isManager]);

  const handleCheckOut = (product) => {
    refetch();
    if (product.productQuantity <= 0) {
      navigate("/dashboard/manage-product");
      return toast("Insufficient Product Quantity", { icon: "🥲" });
    }
    const checkedProducts = {
      productId: product._id,
      shopName: product.shopName,
      shopId: product.shopId,
      email: product.email,
      productAddedDate: product.productAddedDate,
      productName: product.productName,
      productImage: product.productImage,
      productQuantity: product.productQuantity,
      productLocation: product.productLocation,
      profitMargin: product.profitMargin,
      makingCost: product.makingCost,
      productPrice: product.productPrice,
      productDiscount: product.productDiscount,
      productDescription: product.productDescription,
      saleCount: product.saleCount,
      payStatus: "unpaid",
    };
    axiosSecure.post("/product-check-out", checkedProducts).then((res) => {
      if (res.data.insertedId) {
        toast.success("Checked Out");
        // navigate("/dashboard/checked-product")
      }
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const id = e.target.search.value;
    const filter = products?.filter((item) => item._id === id);
    setAllProducts(filter);
  };

  return (
    <div className="min-h-screen  bg-zinc-100 lg:px-10 my-20">
      <Helmet>
        <title>TrendLoom | Sales Collection</title>
      </Helmet>
      {isManager && products?.length && (
        <div className="space-y-7 py-10 max-w-screen-xl mx-auto">
         <RouteTitle heading="All Product Collection" />
          <div >
            <form onSubmit={handleSearch}>
              <span className="relative w-fit">
                <input
                  type="text"
                  name="search"
                  placeholder="Search product by Product ID"
                  className="w-1/2 mx-auto py-3 rounded-full pl-3 "
                />
                <button>
                  <FaSearch className="absolute top-1 right-4" />
                </button>
              </span>
            </form>
          </div>
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-10 lg:m-0 gap-5 ">
          {allProducts?.map((product) => (
                    <div key={product._id} className="rounded-lg bg-[#7bb51862] p-10 space-y-3">
                     <div className=" flex justify-center items-center b">
                            <img
                              src={product.productImage}
                              alt="Avatar Tailwind CSS Component" 
                              className=" block left-0 right-0 mx-auto  w-32 h-32"
                            />
                          </div>
                      <h3 className="font-medium"><strong>Product Name: </strong>{product.productName}</h3>
                      <h3 className="text-zinc-600"><strong>Product id: </strong>{product._id}</h3>
                      <h3 className="text-zinc-600">
                      <strong>Product Quantity: </strong>{product.productQuantity}
                      </h3>
                      <h3 className="text-zinc-600">
                      <strong>Product Discount: </strong> {product.productDiscount} %
                      </h3>
                      <h3 className="text-zinc-600"><strong>Product Price: </strong>${product.productPrice}</h3>
                     <div className="flex">
                     <button
                          onClick={() => handleCheckOut(product)}
                          className="text-zinc-600 font-medium p-3 text-2xl rounded bg-[#b2ee4a] shadow-md shadow-green-400 w-1/2 mx-auto flex justify-center"
                        >
                          <MdShoppingCartCheckout />

                        </button>
                     </div>
                    </div>
                  ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default AllProduct;
