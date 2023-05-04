import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { polygonMumbai } from "wagmi/chains";
import { configureChains, createClient, WagmiConfig } from "wagmi";

// const alchemyKey = "RG6DbE9j31P-vqt80LOVURG90WifPh3h";
const alchemyKey = "viMeSu_upGiVL3hlP6P0Hq_YwLEEok32";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
if (!alchemyKey) {
  throw new Error("Alchemy key not found");
}

const { chains, provider, webSocketProvider } = configureChains(
  [polygonMumbai],
  [alchemyProvider({ apiKey: alchemyKey })]
);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

root.render(
  <React.StrictMode>
    <WagmiConfig client={client}>
      <App />
    </WagmiConfig>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();