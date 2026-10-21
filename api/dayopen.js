// Price of every INR futures pair at 00:00 IST today (open of the first 15m candle).
const { getJSON, send, istDayStart, URLS } = require("./_coindcx");

module.exports = async (req, res) => {
  const day = istDayStart();
  try {
    const pairs = await getJSON(URLS.instruments);
    const opens = {};
    const todo = [...pairs];
    const worker = async () => {
      while (todo.length) {
        const pair = todo.shift();
        try {
          const j = await getJSON(`${URLS.candles}?pair=${pair}&from=${day}&to=${day + 3600}&resolution=15&pcode=f`);
          const first = (j.data || [])
            .filter(k => Math.floor(k.time / 1000) >= day)
            .sort((a, b) => a.time - b.time)[0];
          if (first) opens[pair] = Number(first.open);
        } catch {}
      }
    };
    await Promise.all(Array.from({ length: 25 }, worker));
    const complete = Object.keys(opens).length >= pairs.length * 0.9;
    // Cache long once the day's data is in; retry soon if CoinDCX was missing some.
    send(res, 200, { day, opens }, complete ? 1800 : 60);
  } catch (e) {
    send(res, 502, { error: String(e.message || e) }, 5);
  }
};

module.exports.config = { maxDuration: 60 };
