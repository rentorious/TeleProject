import React from "react";
import Table from "./components/Table";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Header from "./components/Header";
import { Provider } from "./Context";
import Details from "./components/Details";

const App = () => {
  return (
    <Router>
      <Provider>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route
              path="/"
              exact
              render={(props) => <Table {...props} option="top5" />}
            />
            <Route path="/details/:symbol" component={Details} />
            <Route
              path="/favorites"
              render={(props) => <Table {...props} option="favorites" />}
            />
          </Switch>
        </BrowserRouter>
      </Provider>
    </Router>
  );
};

export default App;
