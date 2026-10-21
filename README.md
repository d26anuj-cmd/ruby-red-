# CoinDCX INR Futures

A simple web app for CoinDCX INR futures pairs. It needs no API key.

- **📅 आज का बदलाव:** every INR futures pair, ranked by % change since 00:00 IST today
- **🔥 टॉप मूवर्स 24h:** top 25 coins by 24h swing ((high − low) / low), skipping the lowest-volume 25%
- Tap a coin to open its candlestick chart (1m, 5m, 15m, 1h, 1D)
- ☆ star a coin to keep it at the top of the day list (saved in your browser)

## How to use

Open `index.html` in a browser. To use it on your phone, turn on GitHub Pages:
Settings → Pages → Branch → choose a branch, folder `/ (root)` → Save.

## Data sources

- INR pairs: `https://api.coindcx.com/exchange/v1/derivatives/futures/data/active_instruments?margin_currency_short_name[]=INR`
- Prices: `https://public.coindcx.com/market_data/v3/current_prices/futures/rt`
- Candles and day-open price: `https://public.coindcx.com/market_data/candlesticks` (`pcode=f`)
- Charts use [Lightweight Charts](https://github.com/tradingview/lightweight-charts)
