import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useLive } from "../hooks/useLive";
import { Context } from "../Context";
import { Link } from "react-router-dom";

const Table = (props) => {
  const [symbols, setSymbols] = useState([]);
  const { idData, idToSym } = useLive(symbols, props.option);
  const { favorites } = useContext(Context);

  const { option } = props;

  // Initial setup
  useEffect(() => {
    if (option === "top5") {
      // Fetch top 5 SYMBOLS
      // TODO: Error component
      axios
        .get("/v1/symbols")
        .then((res) =>
          setSymbols(() => res.data.slice(0, 5).map((x) => x.toUpperCase()))
        )
        .catch((err) => console.log(err));
    } else if (option === "favorites") {
      //  set symbols to those from context
      setSymbols(() => [...favorites]);
    } else {
      throw new Error("Invalid table prop: option");
    }
  }, [favorites, option]);

  return (
    <>
      <table className="table is-striped is-narrow is-fullwidth">
        <thead>
          <tr>
            <td>Name</td>
            <td>Last</td>
            <td>Change</td>
            <td>Change Percent</td>
            <td>High</td>
            <td>Low</td>
          </tr>
        </thead>
        <tbody>
          {/* // TODO: sort by order from axios request */}
          {Object.keys(idData)
            .filter((key) => symbols.includes(idToSym[key]))
            .map((key) => {
              const { high, low, daily_change, daily_change_rel, last_price } =
                idData[key];
              return (
                <tr key={idToSym[key]} className="fadeInColor">
                  <th>
                    <Link to={`/details/${idToSym[key]}`}>{idToSym[key]}</Link>
                  </th>
                  <td>{formatNumber(last_price)}</td>
                  <td>{formatNumber(daily_change)}</td>
                  <td>{formatNumber(daily_change_rel)}%</td>
                  <td>{formatNumber(high)}</td>
                  <td>{formatNumber(low)}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

// Helpers
function formatNumber(x) {
  return x
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default Table;
