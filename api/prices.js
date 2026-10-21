// Live prices for CoinDCX INR futures + the USDT→INR rate CoinDCX uses for them.
const { getJSON, send, URLS } = require("./_coindcx");

let meta = null; // { pairs, rate, at }

async function getMeta() {
  if (meta && Date.now() - meta.at < 10 * 60 * 1000) return meta;
  const [pairs, conv] = await Promise.all([getJSON(URLS.instruments), getJSON(URLS.conversions)]);
  const usdtInr = (Array.isArray(conv) ? conv : []).find(c => c.symbol === "USDTINR");
  meta = { pairs, rate: usdtInr ? Number(usdtInr.conversion_price) : null, at: Date.now() };
  return meta;
}

module.exports = async (req, res) => {
  try {
    const [{ pairs, rate }, rt] = await Promise.all([getMeta(), getJSON(URLS.rt)]);
    const all = rt.prices || {};
    const prices = {};
    for (const p of pairs) {
      const t = all[p];
      if (t) prices[p] = { ls: t.ls, pc: t.pc, h: t.h, l: t.l, v: t.v };
    }
    send(res, 200, { ts: rt.ts, rate, prices }, 3);
  } catch (e) {
    send(res, 502, { error: String(e.message || e) }, 1);
  }
};
