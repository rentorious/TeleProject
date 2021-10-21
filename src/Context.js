import React, { createContext, useEffect, useState } from "react";

export const Context = createContext({});

export const Provider = (props) => {
  const { children } = props;

  const localIsLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
  const localFavorites = Object.keys(
    JSON.parse(localStorage.getItem("favorites"))
  );

  const [isLoggedIn, setIsLoggedIn] = useState(localIsLoggedIn || false);
  const [favorites, setFavorites] = useState(localFavorites || []);
  const [darkTheme, setDarkTheme] = useState(false);

  const context = {
    isLoggedIn,
    setIsLoggedIn,
    darkTheme,
    setDarkTheme,
    favorites,
    setFavorites,
  };

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
