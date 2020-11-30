import React from 'react';
import './Checkout.css';
import CheckoutProduct from './CheckoutProduct';
import { userStateValue } from './StateProvider';
import Subtotal from './Subtotal';

function Checkout() {
  const [{ basket }] = userStateValue();

  return (
    <div className="checkout">
      <div className="checkout__left">
        {/* <img src="" alt="" className="checkout__ad" /> */}

        <div>
          <h2 className="chekcout__title">Your shopping Basket</h2>
          {/* BasketItem */}
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
        </div>
      </div>

      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
