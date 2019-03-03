export default {
  apiBaseURL: "https://api.kraken.com",

  recentTradesLimit: 80,

  routes: {
    // GET
    getAssetPairs: "/0/public/AssetPairs",
    getRecentTrades: "/0/public/Trades",
    getTicker: "/0/public/Ticker"
  }
};
