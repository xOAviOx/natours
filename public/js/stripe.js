import axios from "axios";
import { showAlert } from "./alert";

const { Stripe } = require("stripe");
const stripe = Stripe(
  "pk_test_51RLTRxDI2o6j6T6whE5zfDL7zZo30CLusCq9rZ2prLUCv39ipMADIPjDVCilx6dgwhhYZRevz0SBsD9BaY5hnEZy003CPGzXX0"
);

export const bookTour = async (tourId) => {
  try {
    //1  get checkout session from endpoint
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);
    //2 create checkout form + charge credit card
    // await stripe.redirectToCheckout({
    //   sessionId: session.data.session.id,
    // });
    window.location.replace(session.data.session.url);
  } catch (err) {
    console.log(err);
    showAlert("error", err);
  }
};
