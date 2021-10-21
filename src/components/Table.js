import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useLive } from "../hooks/useLive";
import { Context } from "../Context";
import { Link } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

const Table = (props) => {
  const [symbols, setSymbols] = useState([]);
  const { idData, idToSym } = useLive(symbols);
  const { favorites, isDark } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  const { option } = props;

  useEffect(() => {
    if (Object.keys(idToSym).length === symbols.length) setIsLoading(false);
  }, [idToSym, setIsLoading, symbols.length]);

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
      {isLoading ? (
        <FaSpinner style={{ fontSize: "2rem", color: "#7FFFD4" }} />
      ) : (
        <table
          className={`table is-striped is-narrow is-fullwidth p-4 has-text-right is-size-7-mobile ${
            isDark && "isDark"
          }`}
        >
          <thead>
            <tr>
              <td className="has-text-left">Name</td>
              <td>Last</td>
              <td>Change</td>
              <td>Change Percent</td>
              <td>High</td>
              <td>Low</td>
            </tr>
          </thead>
          <tbody>
            {Object.keys(idData)
              .sort((a, b) => {
                const diff =
                  symbols.indexOf(idToSym[a]) - symbols.indexOf(idToSym[b]);
                return diff;
              })
              .filter((key) => symbols.includes(idToSym[key]))
              .map((key) => {
                const {
                  high,
                  low,
                  daily_change,
                  daily_change_rel,
                  last_price,
                } = idData[key];
                return (
                  <tr key={idToSym[key]} className="fadeInColor">
                    <th className="has-text-left">
                      <Link to={`/details/${idToSym[key]}`}>
                        {idToSym[key]}
                      </Link>
                    </th>
                    <td>{formatNumber(last_price)}</td>
                    <td
                      className={`${
                        daily_change > 0.0 ? "textGain" : "textLoss"
                      }`}
                    >
                      {formatNumber(daily_change)}
                    </td>
                    <td
                      className={`${
                        daily_change > 0.0 ? "textGain" : "textLoss"
                      }`}
                    >
                      {formatNumber(daily_change_rel)}%
                    </td>
                    <td>{formatNumber(high)}</td>
                    <td>{formatNumber(low)}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
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
