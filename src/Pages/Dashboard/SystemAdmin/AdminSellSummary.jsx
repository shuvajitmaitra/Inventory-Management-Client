import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import ReactModal from "react-modal";
import { useForm } from "react-hook-form";
import emailjs from '@emailjs/browser';
import toast from "react-hot-toast";
import { MdClose } from "react-icons/md";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};



const AdminSellSummary = () => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  const axiosPublic = useAxiosPublic();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(0);


  const { data, isLoading } = useQuery({
    queryKey: ["AdminSellSummary", page],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/admin-sell-summary?page=${page}`
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
  const totalPage = Math.ceil(data?.totalUser / 2);
  
  const pages = [...new Array(totalPage).fill(0)];
  



     
// modal---------------------------------------------------------------------------------

function openModal() {
  setIsOpen(true);
}

function closeModal() {
  setIsOpen(false);
}

const  onSubmit = (data) => {
  const email = data.user_email
  const message = data.message

  const serviceId = 'service_q3pwjge';
  const templateId = 'template_2kqjvif';
   const userId = 'rhqsKWDZOqWUsB6cP';
   const templateParams = {
    to_email: email, 
    to_name: "Shop Owner",
    message: message,
  };

  // Send the email
  emailjs.send(serviceId, templateId, templateParams, userId)
  .then((result) => {
    toast("Email sent", {icon: "📨"})
    closeModal();
      console.log(result.text);
  }, (error) => {
      console.log(error.text);
  });
};

  const Style =
    "w-full  rounded-lg py-5 bg-gradient-to-r  from-[#a3d02a]  to-[#e5f26a]  font-bold text-xl  ";
  return (
    <div className="w-full">
      <div>
        <h2 className="text-5xl font-medium text-center pt-5 p-3 mb-3 border-b-4 border-[#7cb518] w-fit  mx-auto ">
          Sell Summary
        </h2>
      </div>
      <div className="w-screen flex flex-col md:flex-row lg:w-3/4 mx-auto justify-between items-center gap-3 p-4 my-10 lg:my-0">
        <h3 className={Style}>Admin Income: <span className="text-zinc-600 font-medium">${data?.adminResult.income}</span></h3>
        <h3 className={Style}>Total Product: <span className="text-zinc-600 font-medium">{data?.totalProduct}</span></h3>
        <h3 className={Style}>Total Sale: <span className="text-zinc-600 font-medium">{data?.totalSale}</span></h3>
      </div>
      <div>
        <h2 className="text-5xl font-medium text-center pt-5 p-3 mb-3 border-b-4 border-[#7cb518] w-fit  mx-auto ">
          All Users
        </h2>
      </div>
      <div className=" p-10 m-10 pb-0 rounded-lg bg-[#7bb51859]">
        <div className=" rounded-lg ">
          <table className="table text-center">
            {/* head */}
            <thead className="bg-[#b2ee4a]">
              <tr>
                <th> #</th>
                <th>Owner Name</th>
                <th>Owner Email</th>
                <th>Shop Name</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {/* row 1 */}
              {data?.result?.map((shop, index) => (
                <tr key={shop?._id}>
                  <th>{index + 1}</th>

                  <td className="font-medium">{shop?.name}</td>
                  <td className="font-medium">{shop?.email}</td>
                  <td className="font-medium">{shop?.shopName}</td>
                  <td className="font-medium">{shop?.role}</td>
                  <td className="font-medium">
                  {
                    !shop?.role &&   
                     <button  onClick={openModal}  className="text-zinc-600 font-medium py-1 px-2 rounded bg-[#b2ee4a] shadow-md shadow-green-400">
                    Promo
                    </button>
                  }
{/* ------------------------------ */}
{/* Modal */}
{/* ------------------------------ */}
<div className="relative ">
            <ReactModal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={customStyles}
              id="root"
              contentLabel="Example Modal"
              className="card-body pt-5 pb-10 h-screen lg:h-[80vh] rounded-md border bg-green-400 lg:w-1/2 mx-auto absolute  "
            >
              <h2 className="text-3xl  font-bold text-[#7cb518] text-center lg:py-5 relative">
                Send Promo Message!
              </h2>
              <MdClose
                onClick={closeModal}
                className="text-3xl lg:text-4xl absolute top-0 right-0 lg:-top-5 lg:-right-4 rounded-full bg-accent-focus text-error  "
              />
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full rounded-md  mx-auto "
              >
                {/* <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    name="user_name"
                    {...register("user_name", { required: true })}

                    className="input input-bordered"
                  />
                </div> */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    name="user_email"
                    placeholder="User Email"
                    {...register("user_email", { required: true })}
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Message</span>
                  </label>
                  <input
                    type="text"
                    name="message"
                    {...register("message", { required: true })}
                    placeholder="Write promo message"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control mt-6">
                  <button
                    type="submit"
                    className="btn text-white hover:text-black  bg-[#7cb518]"
                    value='Send'
                  >
                    Send Email
                  </button>
                </div>
              </form>
            </ReactModal>
          </div>
 {/* ------------------------------ */}
 {/* Modal */}
 {/* ------------------------------ */}
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
export default AdminSellSummary;
