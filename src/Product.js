/* eslint-disable react/prop-types */
import React from 'react';
import { userStateValue } from './StateProvider';
import './Product.css';

function Product({ id, title, image, price, rating }) {
  const [, dispatch] = userStateValue();

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
            .fill('✨')
            .reduce((a, b) => a + b, '')}
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
