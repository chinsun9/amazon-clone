import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import CheckoutProduct from './CheckoutProduct';
import { userStateValue } from './StateProvider';
import { getBasketTotal } from './reducer';
import axios from './axios';
import { db } from './firebase';
import './Payment.css';

function Payment() {
  const [{ basket, user }, dispatch] = userStateValue();
  const history = useHistory();

  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [cardElementError, setCardElementError] = useState(null);
  const [secretError, setSecretError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    // generate the special stripe secret which allows us to change a customer
    const getClientSecret = async () => {
      console.log(`getClientSecret pending...`);
      let response = null;
      try {
        response = await axios({
          method: 'post',
          // Stripe expects the total in a currencies subunits
          url: `/payments/create?total=${parseInt(
            (getBasketTotal(basket) * 100).toFixed(2)
          )}`,
        });
        setSecretError(null);
      } catch (error) {
        response = error.response;
        setSecretError(error.response.data.errormessage);
      }

      console.log('the secret is >>>', response.data);
      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [basket]);

  const handleSubmit = async (event) => {
    // do all the fancy stripe stuff...

    event.preventDefault();

    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // paymentIntent = payment confirmation

        db.collection('users')
          .doc(user?.uid)
          .collection('orders')
          .doc(paymentIntent.id)
          .set({
            basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        setSucceeded(true);
        setCardElementError(null);
        setProcessing(false);

        history.replace('/orders');

        dispatch({
          type: 'EMPTY_BASKET',
        });
      })
      .catch();

    console.log(payload);
    // const payload = await stripe
  };

  const handleChange = (event) => {
    // Listen for changes in the cardElement
    // and display any errors as the customer types their card details
    setDisabled(!event.complete);

    // console.info(event, processing, ',', disabled, ',', succeeded);
    setCardElementError(event.error ? event.error.message : '');
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 rea lane</p>
            <p>lost angeles, ca</p>
          </div>
        </div>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => {
              const { id, title, image, price, rating } = item;
              return (
                <CheckoutProduct
                  id={id}
                  title={title}
                  image={image}
                  price={price}
                  rating={rating}
                />
              );
            })}
            {secretError && <p>{secretError}</p>}
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment method</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total : {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType="text"
                  thousandSeparator
                  prefix="$"
                />

                <button
                  type="button"
                  disabled={
                    processing || disabled || succeeded || secretError != null
                  }
                >
                  <span>{processing ? <p>Processing</p> : 'Buy Now'}</span>
                </button>
              </div>

              {cardElementError && <div>{cardElementError}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
