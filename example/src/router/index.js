import React from 'react';
import { Route, Switch } from "react-router-dom";
import Home from "../containers/Home";
import Lang from "../containers/Lang";
import About from "../containers/About";

export default function AppRouter() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/lang" component={Lang} />
      <Route exact path="/about-us" component={About} />
    </Switch>
  );
}
