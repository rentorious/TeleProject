import React, { createContext, useState } from "react";

export const Context = createContext({});

export const Provider = (props) => {
  const { children } = props;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);

  const context = {
    isLoggedIn,
    setIsLoggedIn,
    darkTheme,
    setDarkTheme,
  };

  return <Context.Provider value={context}>{children}</Context.Provider>;
};

export const { Consumer } = Context;
