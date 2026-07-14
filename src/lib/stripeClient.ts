import Stripe from "./stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || "sk_test_mock_secret_key_12345";
const stripe = new Stripe(stripeSecretKey);

export default stripe;
