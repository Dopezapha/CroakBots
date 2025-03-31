require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
const { PRIVATE_KEY, INFURA_API_KEY } = process.env;

module.exports = {
  solidity: {
    version: "0.8.22",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000  // Higher value optimizes for contract execution cost over deployment cost
      },
      viaIR: true  // Enable Intermediate Representation compilation pipeline
    }
  },
  networks: {
    linear_testnet: {
      url: "https://rpc.sepolia.linea.build",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 59141,
      gasPrice: "auto"
    },
    linea_sepolia: {
      url: `https://linea-sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [PRIVATE_KEY],
    },
    linea_mainnet: {
      url: `https://linea-mainnet.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [PRIVATE_KEY],
    }
  }
};