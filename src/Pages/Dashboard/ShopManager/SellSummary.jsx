import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import useAuth from "../../../Hook/useAuth";
import { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const SellSummary = () => {
  const axiosPublic = useAxiosPublic();
  const [page, setPage] = useState(0);

  const { user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["sellSummary", page],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/sell-summary/${user?.email}?page=${page}`
      );
      return res?.data;
    },
  });
  
  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <progress className="progress w-56"></progress>
      </div>
    );
  }
  const totalPage = Math.ceil(data?.totalProduct / 5);
  
  const pages = [...new Array(totalPage).fill(0)];
  

  const Style =
    "w-full  rounded-lg py-5 bg-gradient-to-r  from-[#a3d02a]  to-[#e5f26a]  ";
  return (
    <div className="w-full">
      <div>
        {" "}
        <h2 className="text-5xl font-medium text-center pt-5 p-3 mb-3 border-b-4 border-[#7cb518] w-fit  mx-auto ">
          Sell Summary
        </h2>
      </div>
      <div className="w-screen flex flex-col md:flex-row lg:w-3/4 mx-auto justify-between items-center gap-3 p-4 my-10 lg:my-0">
        <h3 className={Style}>Total sale: {data?.totalProduct}</h3>
        <h3 className={Style}>Total Invest: ${data?.totalInvest}</h3>
        <h3 className={Style}>Total Profit: ${data?.totalProfit}</h3>
      </div>
      <div className=" p-10 m-10 pb-0 rounded-lg bg-[#7bb51859]">
        <div className=" rounded-lg ">
          <table className="table text-center">
            {/* head */}
            <thead className="bg-[#b2ee4a]">
              <tr>
                <th> #</th>

                <th>Product Name</th>
                <th>Selling Date</th>
                <th>Selling Time</th>
                <th>Profit</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {/* row 1 */}
              {data?.result?.map((product, index) => (
                <tr key={product?._id}>
                  <th>{index + 1}</th>

                  <td className="font-medium">{product?.productName}</td>
                  <td className="text-zinc-600">
                    {product?.soldTime?.split("T")[0]}
                  </td>
                  <td className="text-zinc-600">
                    {product?.soldTime?.split("T")[1].split(".")[0]}
                  </td>
                  <td className="text-zinc-600">
                    ${parseInt(product.productPrice) - product.makingCost}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-center items-center gap-2">
        <button
          className={''}
          onClick={() => setPage(page > 0 ? page - 1 : 0)}
        >
          <FaAngleLeft />
        </button>
        {pages.map((item, index) => (
          <button
            className={`w-7 h-7 flex justify-center items-center border border-[#7cb518] rounded-full ${index=== page ? "bg-[#7cb518]" : "bg-white"}`}
            key={index}
            onClick={() => setPage(index)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className={''}
          onClick={() => setPage(page < pages.length-1 ? page + 1 : pages.length-1)}
        >
          <FaAngleRight />
        </button>
      </div>
    </div>
  );
};
export default SellSummary;
