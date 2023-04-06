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
    ftmoperatest: {
      url: "https://rpcapi.fantom.network",
      accounts: [""],
      chainId: 250
      ,
    },
    mumbai: {
      url: "https://matic-mumbai.chainstacklabs.com	",
      accounts: [""],//
    },
  },
  etherscan: {
    apiKey: "",
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
};
