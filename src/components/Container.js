import React, { useContext } from "react";
import Table from "./Table";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import Details from "./Details";
import { Context } from "../Context";

const Container = () => {
  const { isDark } = useContext(Context);
  console.log("darkie", isDark);
  return (
    <div className={`${isDark ? "appBodyDark" : "appBody"}`}>
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
    </div>
  );
};

export default Container;
