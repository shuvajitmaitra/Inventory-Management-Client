import { Link } from "react-router-dom";
import useProducts from "../../../Hook/useProducts";
import ProductCard from "./ProductCard";
import { FaSearch } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const AllProduct = () => {
  const [products] = useProducts();
  console.log(products);

  return (
    <div className="bg-zinc-100 min-h-screen lg:px-10">
        <Helmet>
        <title>TrendLoom | Products</title>
      </Helmet>
      {products.length ? (
        <div className="space-y-7 py-10">
            <h3 className="text-5xl text-center font-medium">All Product are here</h3>
          <div>
           <span className="relative w-fit">
           <input type="text" className="w-1/2 mx-auto py-3 rounded-full relative" />
            <FaSearch className="absolute top-1 right-4" />
           </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {
                products.map(product=><ProductCard product={product} key={product._id}></ProductCard>)
            }
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
