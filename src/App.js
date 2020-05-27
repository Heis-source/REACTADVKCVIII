import React from 'react';
import './App.css';
import './bootstrap/css/bootstrap.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Register from './register/register.jsx';
import Login from './login/login.jsx';
import Ads from './ads/ads.jsx';
import Details from './details/details.jsx';
import Edit from './edit/edit.jsx';
import Create from './create/createAd.jsx'
import store from './store';
import { Provider } from "react-redux";



function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="container">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path='/ads' component={Ads} />
          <Route path='/create' component={Create} />
          <Route path={`/details/:id`} component={Details} />
          <Route path={`/edit/:id`} component={Edit} />
          <Route path="/register" component={Register} />
          <Redirect from="/" to='/register' />
        </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;