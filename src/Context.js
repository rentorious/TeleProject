import React, { createContext, useEffect, useState } from "react";

export const Context = createContext({});

export const Provider = (props) => {
  const { children } = props;

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn")
      ? JSON.parse(localStorage.getItem("isLoggedIn"))
      : false
  );
  const [favorites, setFavorites] = useState(
    localStorage.getItem("favorites")
      ? JSON.parse(localStorage.getItem("favorites"))
      : []
  );

  const [isDark, setIsDark] = useState(
    localStorage.getItem("isDark")
      ? JSON.parse(localStorage.getItem("isDark"))
      : false
  );

  const context = {
    isLoggedIn,
    setIsLoggedIn,
    favorites,
    setFavorites,
    isDark,
    setIsDark,
  };

  useEffect(() => {
    if (isDark) localStorage.setItem("isDark", JSON.stringify(true));
    else localStorage.setItem("isDark", JSON.stringify(false));
  }, [isDark]);

  useEffect(() => {
    if (isLoggedIn) localStorage.setItem("isLoggedIn", JSON.stringify(true));
    else localStorage.setItem("isLoggedIn", JSON.stringify(false));
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify([...favorites]));
  }, [favorites]);

  return <Context.Provider value={context}>{children}</Context.Provider>;
};

export const { Consumer } = Context;
