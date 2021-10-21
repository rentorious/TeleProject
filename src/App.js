import React from "react";
import { BrowserRouter as Router, BrowserRouter } from "react-router-dom";
import Container from "./components/Container";
import { Provider } from "./Context";

const App = () => {
  return (
    <Router>
      <Provider>
        <BrowserRouter>
          <Container />
        </BrowserRouter>
      </Provider>
    </Router>
  );
};

export default App;
