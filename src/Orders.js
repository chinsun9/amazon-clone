import React, { useEffect, useState } from 'react';
import { getOrders } from './firebase';
import Order from './Order';
import { userStateValue } from './StateProvider';
import './Orders.css';

function Orders() {
  const [{ user }] = userStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    console.log(1, user);
    if (user) {
      console.log(2, user);

      getOrders(user, setOrders);
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <div className="orders">
      <h1>your orders</h1>

      <div className="orders__order">
        {orders?.map((order) => (
          <Order order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
