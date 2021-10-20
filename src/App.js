import React, { useEffect, useState } from "react";
import axios from "axios";

const ws = new WebSocket("wss://api-pub.bitfinex.com/ws/2");

const App = () => {
  const [symbols, setSymbols] = useState([]);
  const [idData, setIdData] = useState({});
  const [symToId, setSymToId] = useState({});
  const [messageCount, setMessageCount] = useState(0);

  // Websocket events
  ws.onmessage = (msg) => {
    const msgData = JSON.parse(msg.data);

    setMessageCount(messageCount + 1);

    // console.log(msgData);

    if (msgData?.event === "subscribed") {
      const { pair: sym, chanId: id } = msgData;

      const newCrypto = {
        low: 0,
        high: 0,
        daily_change: 0,
        daily_change_rel: 0,
        last_price: 0,
      };

      setSymToId({ ...symToId, [sym]: id });

      setIdData({ ...idData, [id]: newCrypto });
    } else if (msgData instanceof Array && msgData[1].length === 10) {
      const id = msgData[0];
      const arr = msgData[1];

      const newData = {
        low: arr[9],
        high: arr[8],
        daily_change: arr[4],
        daily_change_rel: arr[5],
        last_price: arr[6],
      };

      setIdData({ ...idData, [id]: newData });
    }
  };

  // Initial setup
  useEffect(() => {
    // Fetch top 5 SYMBOLS
    // TODO: Error component
    axios
      .get("/v1/symbols")
      .then((res) =>
        setSymbols(res.data.slice(0, 5).map((x) => x.toUpperCase()))
      )
      .catch((err) => console.log(err));

    // On cleanup close WebSocket connection
    return () => {
      ws.close();
    };
  }, []);

  // Subscribe to selected symbols
  useEffect(() => {
    if (symbols.length === 5) {
      ws.onopen = () => {
        for (const symbol of symbols) {
          console.log(symbol);
          let wsConfig = JSON.stringify({
            event: "subscribe",
            channel: "ticker",
            symbol: `t${symbol.toUpperCase()}`,
          });

          ws.send(wsConfig);
        }
      };
    }
  }, [symbols]);

  return (
    <>
      {/* <h1>{messageCount}</h1> */}

      <table className="table is-striped is-narrow">
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
          {symbols
            .filter((symbol) => symbol in symToId && symToId[symbol] in idData)
            .map((symbol) => {
              const { high, low, daily_change, daily_change_rel, last_price } =
                idData[symToId[symbol]];
              return (
                <tr key={symToId[symbol]} className="fadeInColor">
                  <th>{symbol}</th>
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

export default App;
