require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  paths: {
    artifacts: './src/artifacts'
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    ropsten: {
      url: "https://ropsten.infura.io/v3/18357c43a5ec4ef8884cb156adcea32b",
      accounts: ["0x91066c6f168f87e0384ba93c5ae8995f887fa0527534d11f9c005d360d571f10"]
    },
    ftmtest: {
      url: "https://rpc.testnet.fantom.network",
      accounts: ["0x91066c6f168f87e0384ba93c5ae8995f887fa0527534d11f9c005d360d571f10"],
      chainId: 4002
    }
  },

};
