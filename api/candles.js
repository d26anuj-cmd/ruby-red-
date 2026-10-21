// Candles for one futures pair (used by the chart).
const { getJSON, send, URLS } = require("./_coindcx");

const RES = new Set(["1", "5", "15", "60", "1D"]);

module.exports = async (req, res) => {
  const { pair, from, to, resolution } = req.query;
  if (!/^B-[A-Z0-9]+_[A-Z]+$/.test(pair || "") || !RES.has(resolution) || !/^\d+$/.test(from) || !/^\d+$/.test(to)) {
    return send(res, 400, { error: "bad params" }, 60);
  }
  try {
    const url = `${URLS.candles}?pair=${pair}&from=${from}&to=${to}&resolution=${resolution}&pcode=f`;
    send(res, 200, await getJSON(url), 10);
  } catch (e) {
    send(res, 502, { error: String(e.message || e) }, 1);
  }
};
