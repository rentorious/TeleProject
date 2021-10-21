import { useState, useEffect } from "react";

const ws = new WebSocket("wss://api-pub.bitfinex.com/ws/2");

export function useLive(symbols) {
  const [idData, setIdData] = useState({});
  const [symToId, setSymToId] = useState({});

  // Websocket events
  ws.onmessage = (msg) => {
    const msgData = JSON.parse(msg.data);

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

  // Subscribe to selected symbols
  useEffect(() => {
    if (symbols.length === 5) {
      ws.onopen = () => {
        for (const symbol of symbols) {
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

  return { ws, idData, symToId };
}
