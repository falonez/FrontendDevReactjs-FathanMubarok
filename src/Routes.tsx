import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from '../pages/DetailRestaurant';
import Homeku from './Homeku';

const Routes : React.FC = () => {
  return (
    <>
      <Router>
      <Switch>
        <Route path="/about" component={About} />
        <Route path="/contact" component={Homeku} />
      </Switch>
    </Router>
    </>
  )
}

export default Routes
