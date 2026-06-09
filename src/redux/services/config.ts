
const BASEURL = import.meta.env.VITE_API_URL;
const CRYPTO_KEY = import.meta.env.VITE_CRYPTO_KEY_SECRET;
console.log("API URL from config:", BASEURL);
console.log("Crypto Key from config:", CRYPTO_KEY);
const config = {
  BASEURL: BASEURL,
  cryptoKey: CRYPTO_KEY,

  headersCommon: {
    "Content-Type": "application/json"
  },

};

export default config;
