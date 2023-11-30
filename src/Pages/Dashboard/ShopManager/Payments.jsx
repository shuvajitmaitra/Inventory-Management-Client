import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import RouteTitle from "../../../Components/RouteTitle";
import { Helmet } from "react-helmet-async";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY_PK);
const Payments = () => {
  return (
    <div className="min-h-screen ">
      <Helmet>
        <title>TrendLoom | Payment</title>
      </Helmet>
      <div>
        <RouteTitle heading="Payment" />
        <div>
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      </div>
    </div>
  );
};
export default Payments;
