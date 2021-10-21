import React from "react";
import Table from "./components/Table";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import { Provider } from "./Context";

const App = () => {
  return (
    <Router>
      <Provider>
        <Header />
        <Switch>
          <Route path="/" exact>
            <Table />
          </Route>
          <Route path="/details">
            <Table />
          </Route>
        </Switch>
      </Provider>
    </Router>
  );
};

export default App;
