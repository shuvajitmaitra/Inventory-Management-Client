import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import RouteTitle from "../../Components/RouteTitle";

const Feedback = () => {
  const {
    register,
    handleSubmit,
    reset,
    // formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const name = data.user_name;
    const email = data.user_email;
    const message = data.message;

    const serviceId = "service_q3pwjge";
    const templateId = "template_2kqjvif";
    const userId = "rhqsKWDZOqWUsB6cP";

    const templateParams = {
      to_email: email,
      to_name: name,
      message: message,
    };

    // Send the email
    emailjs.send(serviceId, templateId, templateParams, userId).then(
      (result) => {
        toast("Email sent", { icon: "📨" });
        console.log(result.text);
        reset();
      },
      (error) => {
        console.log(error.text);
      }
    );
  };
  useEffect(() => {
    AOS.init();
  }, []);

  const inputStyle =
    "focus:border-b-2 focus:border-[#7cb518] focus:outline-none text-[#7cb518] mb-2 border-b-2 border-zinc-300 p-3 w-full font-medium rounded";
  return (
    <div
      data-aos="fade-left"
      className="  rounded-lg  lg:w-1/2 space-y-10"
    >
      <RouteTitle heading="Contact Us" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[#7bb5182f] p-6 border border-zinc-200 rounded"
      >
        <div className="lg:flex justify-center items-center gap-6 pb-4">
          <input
            type="text"
            name="name"
            {...register("user_name", { required: true })}
            placeholder="Your name"
            className={inputStyle}
            required
            data-aos="fade-left"
          />
          <input
            type="email"
            name="email"
            {...register("user_email", { required: true })}
            placeholder="Your email"
            className={inputStyle}
            required
            data-aos="fade-left"
          />
        </div>
        <textarea
          type="text"
          name="message"
          {...register("message", { required: true })}
          placeholder="Your Message"
          className="w-full border-2 pb-36 p-3 focus:border-[#7cb518] focus:outline-none text-[#7cb518]  border-zinc-300 rounded"
          required
        />

        <div
          className="form-control mt-6 md:w-1/2 mx-auto"
        >
          <button
            type="submit"
            className="btn bg-[#7cb518] rounded text-lg hover:text-[#7cb518] font-medium text-white"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
};
export default Feedback;
