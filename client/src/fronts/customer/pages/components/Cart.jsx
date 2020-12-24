import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';
import { calculateTotal } from '../../../shared/helpers/func';
import CartItemCard from './ui/CartItemCard';

function Cart({ cartData, sessionId, getSessionData, pageMode }) {
  const [expandCart, setExpandCart] = useState(false);
  const { tableno } = useParams();

  function toggleExpandCart() {
    setExpandCart(!expandCart);
  }

  function decideCartClass(mode, cartCount) {
    if (mode === 'orders' || cartCount === 0) {
      return 'cart-div hidden';
    }
    if (expandCart === true) {
      return 'cart-div expand';
    }
    return 'cart-div';
  }

  let cartItems = '';
  let cartTotal = 0;
  let divClass = 'cart-div hidden';
  if (cartData) {
    cartTotal = calculateTotal(cartData);
    cartItems = cartData.map((item) => <CartItemCard cartItem={item} key={item.dish.name} />);
    divClass = decideCartClass(pageMode.mode, cartTotal);
  }

  async function placeOrder() {
    await Axios.patch(`/api/orders/new/${sessionId}`)
    .then(res => {
      setExpandCart(false);
    })
    .catch(err => console.log(err));
    getSessionData(tableno);
  }

  return (
    <div className={divClass}>
      <div className="cart-header" onClick={() => toggleExpandCart()}>
        <h4>Shopping Cart</h4>
        <FontAwesomeIcon
          icon={faChevronUp}
          className={expandCart === true ? 'fa-arrow expand' : 'fa-arrow'}
        />
      </div>
      <div className="cart-body">{cartItems}</div>
      <div className="cart-footer">
        <div className="order-button-div" onClick={placeOrder}>
          <h5>Place Order</h5>
        </div>
        <div className="cart-total-text-div">
          <p>Total: </p> <h5>${cartTotal.toFixed(2)}</h5>
        </div>
      </div>
    </div>
  );
}

Cart.propTypes = {
  cartData: PropTypes.array,
  sessionId: PropTypes.string,
  getSessionData: PropTypes.func,
  pageMode: PropTypes.object,
};

export default Cart;
