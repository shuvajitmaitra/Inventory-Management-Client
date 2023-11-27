import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import emailjs from '@emailjs/browser';
import { useForm } from "react-hook-form";
import { useState } from "react";
import ReactModal from "react-modal";
import { MdClose } from "react-icons/md";
import toast from "react-hot-toast";
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


const Shops = () => {
  // const form = useRef();
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

    const axiosPublic = useAxiosPublic()
    const [modalIsOpen, setIsOpen] = useState(false);
    const {data, isLoading} = useQuery({
        queryKey: ["allShop"],
        queryFn: async ()=> {
           const res = await  axiosPublic.get('/all-shop?role="manager"')
           return res.data
        }
    })
    // console.log(data);

    if (isLoading) {
        return (
          <div className="h-screen flex justify-center items-center">
            <progress className="progress w-56"></progress>
          </div>
        );
      }

     
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

      
  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        <h2 className="text-5xl font-medium text-center pt-5 p-3 mb-3 border-b-4 border-[#7cb518] w-fit  mx-auto ">
         All Shops
        </h2>
      </div>
     <div className="w-full mx-auto">
     <div className="p-10 m-10 pb-0 rounded-lg bg-[#7bb51859]">
        <div className=" rounded-lg ">
          <table className="table text-center">
            {/* head */}
            <thead className="bg-[#b2ee4a]">
              <tr>
                <th> #</th>
                <th>Shop Logo</th>
                <th>Shop Name</th>
                <th>User Name</th>
                <th>User Email</th>
                <th>Product Limit</th>
                <th>Shop Description</th>
                <th>Send Notice Button</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {/* row 1 */}
              {data?.map((shop, index) => (
                <tr key={shop?._id}>
                  <th>{index + 1}</th>
                  <td>
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={shop.shopLogo}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </td>
                  <td className="font-medium">{shop?.shopName}</td>
                  <td className="font-medium">{shop?.name}</td>
                  <td className="font-medium">{shop?.email}</td>
                  <td className="text-zinc-600">{shop?.productLimit}</td>
                  <td className="text-zinc-600">{shop?.shopInfo}</td>
                  <td>
                   <button  onClick={openModal} className="text-zinc-600 font-medium py-1 px-2 rounded bg-[#b2ee4a] shadow-md shadow-green-400">
                      Notice
                    </button>

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
              className="card-body pt-5 pb-10 h-screen lg:h-[80vh] rounded-md border bg-[#7bb51881] lg:w-1/2 mx-auto absolute  "
            >
              <h2 className="text-3xl  font-bold text-[#7cb518] text-center lg:py-5 relative">
                Send a Notice!
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
                    placeholder="Write Notice"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control mt-6">
                  <button
                    type="submit"
                    className="btn text-white hover:text-black bg-[#7cb518] border-px"
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
     </div>
    </div>
  );
};
export default Shops;
