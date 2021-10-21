import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../Context";

const Details = (props) => {
  const [high, setHigh] = useState(0);
  const [low, setLow] = useState(0);
  const [last, setLast] = useState(0);
  const [isLoading, setisLoading] = useState(true);

  const { favorites, setFavorites } = useContext(Context);

  const symbol = props.match.params.symbol;

  useEffect(() => {
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
  }, [symbol]);

  const addToFavorites = () => {
    if (!favorites.includes(symbol)) setFavorites([...favorites, symbol]);
  };

  return (
    <>
      <table className="table is-stripped is-narrow is-fullwidth">
        <thead>
          <tr>
            <td>Name</td>
            <td>Last</td>
            <td>High</td>
            <td>Low</td>
          </tr>
        </thead>
        {!isLoading && (
          <tbody>
            <tr>
              <th>{symbol}</th>
              <td>{formatNumber(last)}</td>
              <td>{formatNumber(high)}</td>
              <td>{formatNumber(low)}</td>
              {/* <td>{last}</td>
            <td>{high}</td>
            <td>{low}</td> */}
            </tr>
          </tbody>
        )}
      </table>
      <button className="button is-primary" onClick={addToFavorites}>
        Add To Favorites
      </button>
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
