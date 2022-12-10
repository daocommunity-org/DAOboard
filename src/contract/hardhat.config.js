require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  paths: {
    artifacts: "./src/artifacts",
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    ropsten: {
      url: "https://ropsten.infura.io/v3/18357c43a5ec4ef8884cb156adcea32b",
      //accounts: [""]
    },
    ftmtest: {
      url: "https://rpc.testnet.fantom.network",
      //accounts: [""],
      chainId: 4002,
    },
  },
};
