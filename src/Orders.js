import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import Order from './Order';
import { userStateValue } from './StateProvider';
import './Orders.css';

function Orders() {
  const [{ user }] = userStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      console.log(user);
      db.collection('users')
        .doc(user?.uid)
        .collection('orders')
        .orderBy('created', 'desc')
        .onSnapshot((snapshot) => {
          setOrders(
            snapshot.docs.map((doc) => {
              const { id } = doc;
              return { id, data: doc.data() };
            })
          );
        });
    } else {
      setOrders([]);
    }
  }, []);

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
