/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
import React from 'react';
import './Subtotal.css';
import CurrencyForamt from 'react-currency-format';

function Subtotal() {
  return (
    <div className="subtotal">
      <CurrencyForamt
        renderText={(value) => (
          <>
            <p>
              Subtotal 0 : <strong>0</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" name="a" id="a" />
              This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={0}
        displayType="text"
        thousandSeparator
        prefix="$"
      />

      <button>Proceed to Checkout</button>
    </div>
  );
}

export default Subtotal;
