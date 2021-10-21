import { useState, useEffect } from "react";

const ws = new WebSocket("wss://api-pub.bitfinex.com/ws/2");

export function useLive(symbols, option) {
  const [idData, setIdData] = useState({});
  const [symToId, setSymToId] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Websocket events
  ws.onmessage = (msg) => {
    const msgData = JSON.parse(msg.data);

    if (msgData?.event === "subscribed") {
      console.log("SUBSRIBED");
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
    if (symbols.length > 0) {
      ws.onopen = () => {
        for (const symbol of symbols) {
          console.log(`SUBSCRIBING to ${symbol}`);

          let wsConfig = JSON.stringify({
            event: "subscribe",
            channel: "ticker",
            symbol: `t${symbol.toUpperCase()}`,
          });

          ws.send(wsConfig);
        }
      };
    }

    return () => {
      console.log("BRIIIIIIIIIIIIIii");
      setIdData({});
    };
  }, [symbols, setIdData, setSymToId]);

  useEffect(() => {
    console.log(Object.keys(idData).length, symbols.length);
    if (Object.keys(idData).length === symbols.length && isLoading) {
      setIsLoading(false);
    }
  }, [symbols.length, idData, isLoading]);

  return { ws, idData, symToId, isLoading, setIsLoading };
}
