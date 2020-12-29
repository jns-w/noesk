import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Customer from "./fronts/customer/Customer";
import Service from "./fronts/restaurant/pages/service/Service"
import Kitchen from "./fronts/restaurant/pages/kitchen/Kitchen"

function App() {

  return (
    <Switch>
      <Route path='/customer' component={Customer}/>
      <Route path='/service' component={Service} />
      <Route path='/kitchen' component={Kitchen} />
    </Switch>
  );
}

export default App;