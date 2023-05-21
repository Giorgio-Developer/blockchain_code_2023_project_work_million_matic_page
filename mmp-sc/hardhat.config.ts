import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const PRIVATE_KEY = "492266588f006ba6132edb51c0ba2e6ca95968f2cdd1e1928eb9c43b8461918b";

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
