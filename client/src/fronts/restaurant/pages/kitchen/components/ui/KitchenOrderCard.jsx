import React from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';


function KitchenOrderCard({ item, orderId, getAllOrders }) {

  async function updateProgress() {
    await Axios.patch(`/api/orders/items/${orderId}`, {
      itemId: item._id,
    })
      .then((res) => {
        getAllOrders();
        // socket.transmit('order');
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="sm-container">
      <div className="flexbox">
        <h3>{item.dish.name}</h3>
        <h3 className="pill">x{item.quantity}</h3>
      </div>
      <div className="flexbox btn-container">
        {/* <button className={status.class} onClick={updateProgress} type="button">
          {status.button}
        </button> */}
        <button className={item.progress === 'Confirmed' ? 'pink' : 'green'} onClick={updateProgress} type="button">
          {item.progress === 'Confirmed' ? 'START' : 'COMPLETE'}
        </button>
        <div className="sm-container">
          <p>Status: {item.progress}</p>
        </div>
      </div>
    </div>
  );
}

KitchenOrderCard.propTypes = {
  item: PropTypes.object,
  orderId: PropTypes.string,
  getAllOrders: PropTypes.func,
};

export default KitchenOrderCard;
