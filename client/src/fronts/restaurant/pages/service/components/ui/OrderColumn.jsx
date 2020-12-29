import React from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import OrderItemCard from './OrderItemCard';

function OrderColumn({ sessionID, orderData, getRestaurantData }) {
  async function confirmOrder() {
    await Axios.patch(`/api/orders/confirm/${orderData.orderNo}`)
      .then((res) => {
        console.log(res);
        getRestaurantData();
        // socket.confirmOrder(sessionID);
      })
      .catch((err) => console.log(err));
  }

  const orderItems = orderData.items.map((itemData) => <OrderItemCard orderId={orderData._id} itemData={itemData}/>);

  return (
    <div className="order-column">
      <div className="header">
        <h4>Order no: {orderData.orderNo}</h4>
        <p>status: {orderData.status}</p>
      </div>
      <div className="column-body">
        <div className="order-items-container">{orderItems}</div>

        {orderData.status === 'Requested' ?
        <button type="button" onClick={confirmOrder}>
          Confirm order
        </button>
        : ''
        }
      </div>
    </div>
  );
}

OrderColumn.propTypes = {
  sessionID: PropTypes.number,
  orderData: PropTypes.object,
};

export default OrderColumn;
