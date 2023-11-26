import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';




const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY_PK);
const Payments = () => {
  return (
    <div className="min-h-screen ">
      <div>
        <h2 className="text-3xl font-bold">Payment</h2>
        <div >
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      </div>
    </div>
  );
};
export default Payments;
