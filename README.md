# CoinDCX Futures Prices

A simple web app that shows live CoinDCX futures prices. It needs no API key.

- Shows last price, mark price, 24h change, high/low, volume and funding rate
- Refreshes every 5 seconds
- 🔥 Top Movers tab: coins ranked by 24h % move (up or down), with rank and price move
- Gainers, Losers and Volume tabs, search and ★ favourites (saved in your browser)
- Tap any coin to open its candlestick chart with volume (1m, 5m, 15m, 1h, 1D)

## How to use

Open `index.html` in a browser. To use it on your phone, turn on GitHub Pages:
Settings → Pages → Branch → choose a branch, folder `/ (root)` → Save.

Data source: `https://public.coindcx.com/market_data/v3/current_prices/futures/rt`
Candles: `https://public.coindcx.com/market_data/candlesticks` (`pcode=f`). Charts use [Lightweight Charts](https://github.com/tradingview/lightweight-charts).
