import React from "react";
import Table from "./components/Table";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import { Provider } from "./Context";
import Details from "./components/Details";

const App = () => {
  return (
    <Router>
      <Provider>
        <Header />
        <Switch>
          <Route path="/" exact>
            <Table option="top5" />
          </Route>
          <Route path="/details/:symbol" component={Details}></Route>
          <Route path="/favorites">
            <Table option="favorites" />
          </Route>
        </Switch>
      </Provider>
    </Router>
  );
};

export default App;
