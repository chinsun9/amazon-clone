/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import './Product.css';
import { userStateValue } from './StateProvider';

function Product({ id, title, image, price, rating }) {
  const [{}, dispatch] = userStateValue();

  const addToBasket = () => {
    // dispatch the item into the data layer
    dispatch({
      type: 'ADD_TO_BASKET',
      item: {
        id,
        title,
        image,
        price,
        rating,
      },
    });
  };

  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map(() => (
              <p>✨</p>
            ))}
        </div>
      </div>

      <img src={image} alt="p" />
      <button type="button" onClick={addToBasket}>
        Add to Basket
      </button>
    </div>
  );
}

export default Product;
