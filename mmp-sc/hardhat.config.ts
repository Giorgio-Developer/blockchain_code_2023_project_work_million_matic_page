import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const PRIVATE_KEY = "adcd9f8e8c64b41a75f7248ceca3cfd0aceee8fb46afba2ab1fb3fae68400220";

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    mumbai: {
      url: `http://rd.knobs.it:8545`,
      accounts: [PRIVATE_KEY],
      chainId: 80001,
    },
  },
  gasReporter: {
    enabled: true,
    currency: 'EUR',

  }
};

export default config;
