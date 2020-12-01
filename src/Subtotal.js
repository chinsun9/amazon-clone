/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
import React from 'react';
import './Subtotal.css';
import CurrencyFormat from 'react-currency-format';
import { useHistory } from 'react-router-dom';
import { userStateValue } from './StateProvider';
import { getBasketTotal } from './reducer';

function Subtotal() {
  const history = useHistory();
  const [{ basket }, dispatch] = userStateValue();

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" name="a" id="a" />
              This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType="text"
        thousandSeparator
        prefix="$"
      />

      <button onClick={(e) => history.push('/payment')}>
        Proceed to Checkout
      </button>
    </div>
  );
}

export default Subtotal;
