import React, {useState, useEffect} from 'react';
import {Route, Switch, NavLink, useRouteMatch} from 'react-router-dom';
import {axiosGet} from '../shared/helpers/api';
import Home from './pages/Home';
import Cart from './pages/components/Cart';
import Topbar from './pages/components/ui/Topbar';
import Checkout from './pages/Checkout';
import './styles/menu.scss'
import { BrowserView, MobileView, isBrowser, isMobile} from 'react-device-detect'

function Customer() {
  const [sessionData, setSessionData] = useState({});
  const [pageMode, setPageMode] = useState({mode: 'home', category: ''});
  let { path, url } = useRouteMatch()

  function goHome() {
    setPageMode({mode: 'home', category: ''});
  }

  // FUNCTION CALL TO RE-RENDER
  async function getSessionData(tableno) {
    const res = await axiosGet(`http://localhost:80/api/tables/${tableno}`);
    console.log(res)
    setSessionData(res.table.session);
  }

  function goOrders() {
    setPageMode({mode: 'orders', category: ''});
  }

  let backdrop;
  switch (pageMode.mode) {
    case 'menuitems':
      backdrop = <div className="backdrop-solid menuitems"/>;
      break;
    case 'orders':
      backdrop = <div className="backdrop-solid orders"/>;
      break;
    default:
      backdrop = <div className="backdrop-solid home"/>;
      break;
  }

  useEffect(() => {
    return () => {
    };
  }, []);

  return (
    <div className="customer-container">
      <div className="main-div">
        {backdrop}
        <div className="ui-wrapper">
          <Topbar goHome={goHome} goOrders={goOrders}/>
            <Route path={`${path}/tables`}>
              <NavLink to="/customer/table/1">
                <p>Table 1</p>
              </NavLink>
              <NavLink to="/customer/table/2">
                <p>Table 2</p>
              </NavLink>
              <NavLink to="/customer/table/3">
                <p>Table 3</p>
              </NavLink>
              <NavLink to="/customer/table/4">
                <p>Table 4</p>
              </NavLink>
              <NavLink to="/customer/table/5">
                <p>Table 5</p>
              </NavLink>
              <NavLink to="/customer/table/6">
                <p>Table 6</p>
              </NavLink>
              <NavLink to="/customer/table/7">
                <p>Table 7</p>
              </NavLink>
              <NavLink to="/customer/table/8">
                <p>Table 8</p>
              </NavLink>
              <NavLink to="/customer/table/9">
                <p>Table 9</p>
              </NavLink>
              <NavLink to="/customer/table/10">
                <p>Table 10</p>
              </NavLink>
            </Route>
            <Route path="/customer/table/:tableno">
              <Home
                setPageMode={setPageMode}
                pageMode={pageMode}
                getSessionData={getSessionData}
                cartData={sessionData.cart}
                sessionData={sessionData}
              />
              <Cart
                cartData={sessionData.cart}
                sessionId={sessionData._id}
                getSessionData={getSessionData}
                pageMode={pageMode}
              />
            </Route>
            <Route path="/customer/checkout">
              <Checkout/>
            </Route>

        </div>
      </div>
    </div>
  );
}

export default Customer;
