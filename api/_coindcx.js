// Small helpers shared by the /api functions. Files starting with "_" are not routes on Vercel.
const IST_OFFSET = 5.5 * 3600;

async function getJSON(url) {
  const r = await fetch(url, { headers: { "User-Agent": "inr-futures-app" } });
  if (!r.ok) throw new Error(`CoinDCX ${r.status} for ${url}`);
  return r.json();
}

function send(res, status, body, cacheSeconds) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  // Vercel's CDN caches by URL, so many viewers share one CoinDCX call.
  res.setHeader("Cache-Control", `public, s-maxage=${cacheSeconds}, stale-while-revalidate=${cacheSeconds * 5}`);
  res.status(status).send(JSON.stringify(body));
}

function istDayStart(nowSec = Math.floor(Date.now() / 1000)) {
  return Math.floor((nowSec + IST_OFFSET) / 86400) * 86400 - IST_OFFSET;
}

const URLS = {
  instruments: "https://api.coindcx.com/exchange/v1/derivatives/futures/data/active_instruments?margin_currency_short_name%5B%5D=INR",
  conversions: "https://api.coindcx.com/api/v1/derivatives/futures/data/conversions",
  rt: "https://public.coindcx.com/market_data/v3/current_prices/futures/rt",
  candles: "https://public.coindcx.com/market_data/candlesticks",
};

module.exports = { getJSON, send, istDayStart, URLS };
