import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../Context";
import { FaSpinner } from "react-icons/fa";

const Details = (props) => {
  const [high, setHigh] = useState(0);
  const [low, setLow] = useState(0);
  const [last, setLast] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setisLoading] = useState(true);

  const { favorites, setFavorites, isLoggedIn, isDark } = useContext(Context);

  const symbol = props.match.params.symbol;

  useEffect(() => {
    if (favorites && favorites.includes(symbol)) setIsFavorite(true);
  }, [favorites, setIsFavorite, symbol]);

  useEffect(() => {
    console.log(isLoggedIn);
    axios
      .get(`/v1/pubticker/${symbol}`)
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          return res.data;
        } else {
          throw new Error(res.statusText);
        }
      })
      .then((data) => {
        const { low, high, last_price } = data;
        setHigh(Number.parseFloat(high));
        setLow(Number.parseFloat(low));
        setLast(Number.parseFloat(last_price));
        setisLoading(false);
      })
      .catch((err) => console.log(err));
  }, [symbol, isLoggedIn]);

  const addToFavorites = () => {
    if (!favorites.includes(symbol)) setFavorites([...favorites, symbol]);
    setIsFavorite(true);
  };

  const removeFromFavorites = () => {
    const newFavs = favorites.filter((fav) => fav !== symbol);
    setFavorites([...newFavs]);
    setIsFavorite(false);
  };

  return (
    <>
      <table
        className={`table is-stripped is-narrow is-fullwidth ${
          isDark && "isDark"
        }`}
      >
        <thead>
          <tr>
            <td>Name</td>
            <td>Last</td>
            <td>High</td>
            <td>Low</td>
          </tr>
        </thead>
        {isLoading ? (
          <FaSpinner style={{ fontSize: "2rem", color: "#7FFFD4" }} />
        ) : (
          <tbody>
            <tr>
              <th className={`${isDark && "is-light"}`}>{symbol}</th>
              <td>{formatNumber(last)}</td>
              <td>{formatNumber(high)}</td>
              <td>{formatNumber(low)}</td>
            </tr>
          </tbody>
        )}
      </table>
      {isLoggedIn && (
        <div className="detailOptions mx-3 my-1">
          {isFavorite ? (
            <button className="button is-danger" onClick={removeFromFavorites}>
              Remove From Favorites
            </button>
          ) : (
            <button className="button is-primary" onClick={addToFavorites}>
              Add To Favorites
            </button>
          )}
        </div>
      )}
    </>
  );
};

function formatNumber(x) {
  return x
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default Details;
