# CoinDCX INR Futures

Live CoinDCX INR futures prices in ₹. It needs no API key.

- **📅 आज का बदलाव:** every INR futures pair, ranked by % change since 00:00 IST today
- **🔥 टॉप मूवर्स 24h:** top 25 coins by 24h swing ((high − low) / low), skipping the lowest-volume 25%
- Tap a coin to open its candlestick chart (1m, 5m, 15m, 1h, 1D)
- ☆ star a coin to keep it at the top of the day list (saved in your browser)

Prices are converted from USDT to ₹ at CoinDCX's own INR futures rate.

## Deploy (Vercel, free)

CoinDCX blocks browsers on other websites from reading its data, so the app needs the
small server functions in `api/`. GitHub Pages can't run them; Vercel can.

1. Go to https://vercel.com and choose **Continue with GitHub**
2. **Add New → Project**, pick `ruby-red-`, press **Import**, then **Deploy**
3. Open the `*.vercel.app` link it gives you

## How it works

- `api/prices.js`: INR futures list, live prices and the USDT→INR rate
- `api/dayopen.js`: each pair's price at 00:00 IST (first 15m candle), cached on Vercel
- `api/candles.js`: chart candles for one pair
- Charts use [Lightweight Charts](https://github.com/tradingview/lightweight-charts)
