import React, { createContext, useState } from "react";

export const Context = createContext({});

export const Provider = (props) => {
  const { children } = props;
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);

  const context = {
    isLoggedIn,
    setisLoggedIn,
    darkTheme,
    setDarkTheme,
  };

  return <Context.Provider value={context}>{children}</Context.Provider>;
};

export const { Consumer } = Context;
