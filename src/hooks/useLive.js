import { useState, useEffect, useRef } from "react";

export function useLive(symbols, option) {
  const [idData, setIdData] = useState({});
  const [idToSym, setIdToSym] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const ws = useRef(null);

  // Initialize websocket
  useEffect(() => {
    ws.current = new WebSocket("wss://api-pub.bitfinex.com/ws/2");
    ws.current.onopen = () => setIsOpen(true);
    ws.current.onclose = () => console.log("ws connection closed");
    ws.current.onmessage = (msg) => setData(JSON.parse(msg.data));

    const wsCurrent = ws.current;

    return () => {
      wsCurrent.close();
    };
  }, []);

  // Unsubsribe/Subsribe to channels
  useEffect(() => {
    if (!ws.current || !isOpen) return;

    console.log(ws.current);

    for (const symbol of symbols) {
      console.log("SUBSRIBING TO");
      let wsConfig = JSON.stringify({
        event: "subscribe",
        channel: "ticker",
        symbol: `t${symbol.toUpperCase()}`,
      });

      ws.current.send(wsConfig);
    }
  }, [symbols, isOpen]);

  useEffect(() => {
    if (data?.event === "subscribed") {
      console.log("SUBSRIBED");
      const { pair: sym, chanId: id } = data;

      const newCrypto = {
        low: 0,
        high: 0,
        daily_change: 0,
        daily_change_rel: 0,
        last_price: 0,
      };

      setIdToSym((prevData) => ({ ...prevData, [id]: sym }));
      setIdData((prevData) => ({ ...prevData, [id]: newCrypto }));
    } else if (data instanceof Array && data[1].length === 10) {
      const id = data[0];
      const arr = data[1];

      const newData = {
        low: arr[9],
        high: arr[8],
        daily_change: arr[4],
        daily_change_rel: arr[5],
        last_price: arr[6],
      };

      setIdData((prevData) => ({ ...prevData, [id]: newData }));
    }
  }, [data, setIdData, setIdToSym]);

  return { data, idData, idToSym };
}
