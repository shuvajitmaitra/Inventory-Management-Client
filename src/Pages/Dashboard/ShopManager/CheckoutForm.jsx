import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../../Hook/useAuth";

const CheckoutForm = () => {
  const [transactionId, setTransactionId] = useState("");
  const [error, setError] = useState("");
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate()

  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState("");
  const params = useParams();
  const price = parseInt(params.price);
  const totalPrice = price;

  useEffect(() => {
    axiosPublic
      .post("/create-payment-intent", { price: totalPrice })
      .then((res) => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      });
  }, [axiosPublic, totalPrice]);

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setError("");
    }
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user.email || "anonymous",
            name: user.displayName || "anonymous", 
          },
        },
      });

    if (confirmError) {
      console.log({ confirmError });
    } else {
      console.log({ paymentIntent });
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);

        const payment = {
          email: user.email,
          transactionId: paymentIntent.id,
          price: totalPrice,
          date: new Date(),
          subscriptionType:
            (totalPrice === 10 && "Basic") ||
            (totalPrice === 20 && "Advance") ||
            (totalPrice === 50 && "Premium"),
        };
        const newProductLimit = {
          newProductLimit:
            (totalPrice === 10 && 200) ||
            (totalPrice === 20 && 450) ||
            (totalPrice === 50 && 1500),
            subscriptionType: 
            (totalPrice === 10 && "Basic") ||
            (totalPrice === 20 && "Advance") ||
            (totalPrice === 50 && "Premium"),
        };

        const res = await axiosPublic.put("/payment", payment);
        if (res.data.insertedId) {
          axiosPublic
            .patch(`/newProductLimit/${user.email}`, newProductLimit)
            .then((res) => {
              if (res?.data?.modifiedCount) {
              axiosPublic.patch(`/system-admin-income?price=${totalPrice}`)
              .then(response=>{

                console.log(response.data);
                if(response.data.modifiedCount){
                  navigate("/dashboard/products")
                  toast.success("Payment Success!");
                }
              })
              }
            });
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        className="input input-bordered"
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        type="submit"
        disabled={!stripe || !clientSecret}
        className="btn btn-accent"
      >
        Pay
      </button>
      <p>{error}</p>
      <p>Your Transaction Id: {transactionId}</p>
    </form>
  );
};
export default CheckoutForm;
