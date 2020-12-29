import React, { useState, useEffect } from 'react';
import { faTasks } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios'
import KitchenOrderCard from './components/ui/KitchenOrderCard';
import FAIcon from '../../../shared/components/FAIcon';
import '../../../shared/styles/home.scss'

function Kitchen() {
  const [orders, setOrders] = useState([]);

  async function getAllOrders() {
    // await axiosGet('/api/orders/active');
    await Axios.get('/api/orders/active')
    .then(res => {
      const curOrders = res.data.orders.filter(
        (el) => el.status === 'Confirmed' || el.status === 'Preparing'
      );
      // console.log('curOrders:', curOrders);
      const arr = [];
      curOrders.forEach((el) => {
        el.items.forEach((item) => {
          if (item.progress === 'Confirmed' || item.progress === 'Preparing') {
            const obj = {
              orderId: el._id,
              item,
            };
            arr.push(obj);
          }
        });
      });
      setOrders(arr);
    })
    .catch(err => console.log(err));
  }

  useEffect(() => {
    getAllOrders();
  }, []);
  console.log(orders)

  const orderCards = orders.map((el, i) => (
    <KitchenOrderCard item={el.item} key={i} orderId={el.orderId} getAllOrders={getAllOrders} />
  ));

  if (orders.length === 0) {
    return (
      <div className="container">
        <h1>No new orders!</h1>
      </div>
    )
  }
  return (
    <div className="kitchen-container">
      <div className="crew-title">
        <FAIcon icon={faTasks} divClass="icon" />
        <h1>Orders</h1>
      </div>
      <div className="flexbox ordercards">{orderCards}</div>
    </div>
  );
}

export default Kitchen;
