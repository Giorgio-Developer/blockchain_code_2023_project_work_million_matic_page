import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const PRIVATE_KEY = "3de513387cbaddff039b1dea01ec284b12f1f57c3535682d175e7897b3ec8dcf";

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
