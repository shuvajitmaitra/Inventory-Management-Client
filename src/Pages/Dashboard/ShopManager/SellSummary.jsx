import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import useAuth from "../../../Hook/useAuth";
import { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import RouteTitle from "../../../Components/RouteTitle";
import { Helmet } from "react-helmet-async";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';

const SellSummary = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(0);


  const { user } = useAuth();

  const { data={}, isLoading } = useQuery({
    queryKey: ["sellSummary", page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/sell-summary/${user?.email}?page=${page}`
      );
      return res?.data;
    },
  });
  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];


  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
    Z`;
  };
  
  const TriangleBar = (props) => {
    // eslint-disable-next-line react/prop-types
    const { fill, x, y, width, height } = props;
  
    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

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
    "w-full  rounded-lg py-5 bg-gradient-to-r  from-[#a3d02a]  to-[#e5f26a]  font-bold text-xl  ";
  return (
    <div className="w-full">
      <Helmet>
        <title>TrendLoom | Sell Summary</title>
      </Helmet>
      <RouteTitle heading="Sell Summary" />

      <div className="w-screen flex flex-col md:flex-row lg:w-3/4 mx-auto justify-between items-center gap-3 p-4 my-10 lg:my-0">
        <h3 className={Style}>
          Total sale:{" "}
          <span className="text-zinc-600 font-medium">
            {data?.totalProduct}
          </span>
        </h3>
        <h3 className={Style}>
          Total Invest:{" "}
          <span className="text-zinc-600 font-medium">
            ${data?.totalInvest}
          </span>
        </h3>
        <h3 className={Style}>
          Income:{" "}
          <span className="text-zinc-600 font-medium">
            $ {Math.floor(data?.totalIncome)}
          </span>
        </h3>
        <h3 className={Style}>
          Total Profit:{" "}
          <span className="text-zinc-600 font-medium">
            ${data?.totalProfit}
          </span>
        </h3>
      </div>
      <RouteTitle heading="Sales Status"/>
      <div className="flex justify-center items-center">
      <BarChart
      width={500}
      height={300}
      data={data?.salesResult}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey='productName' />
      <YAxis />
      <Bar dataKey="saleCount" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
        {data?.salesResult?.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % 6]} />
        ))}
      </Bar>
    </BarChart>
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
      <div className="flex justify-center items-center gap-2 pb-5">
        <button
          className={""}
          onClick={() => setPage(page > 0 ? page - 1 : 0)}
        >
          <FaAngleLeft />
        </button>
        {pages.map((item, index) => (
          <button
            className={`w-7 h-7 flex justify-center items-center border border-[#7cb518] rounded-full ${
              index === page ? "bg-[#7cb518]" : "bg-white"
            }`}
            key={index}
            onClick={() => setPage(index)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className={""}
          onClick={() =>
            setPage(page < pages.length - 1 ? page + 1 : pages.length - 1)
          }
        >
          <FaAngleRight />
        </button>
      </div>
    </div>
  );
};
export default SellSummary;
