import React from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';

function OrderItemCard({itemData, orderId}) {
  // console.log(itemData);
  async function updateItem() {
    await Axios.patch(`/api/orders/items/${orderId}`, {
      itemId: itemData._id
    })
    .then(res => console.log(res))
    .catch(err => console.log(err));
  }

  if (itemData.progress === 'Served') {
    return (
        <s>
      <div className="order-item-card">
        <div className="dish-name-wrapper"><p>{itemData.dish.name}</p></div>
        <div className="quantity-progress">
          <p>x{itemData.quantity}</p>
          <p>{itemData.progress}</p>
        </div>
        {itemData.progress === 'Ready' ?
          <button className="btn-sm" onClick={updateItem}>Serve</button>
          : ''
        }
      </div>
        </s>
    );
  } else {
    return (
      <div className="order-item-card">
        <div className="dish-name-wrapper"><p>{itemData.dish.name}</p></div>
        <div className="quantity-progress">
          <p>x{itemData.quantity}</p>
          <p>{itemData.progress}</p>
        </div>
        {itemData.progress === 'Ready' ?
          <button className="btn-sm" onClick={updateItem}>Serve</button>
          : ''
        }
      </div>
    );
  }
}

OrderItemCard.propTypes = {
  itemData: PropTypes.object,
};

export default OrderItemCard;
