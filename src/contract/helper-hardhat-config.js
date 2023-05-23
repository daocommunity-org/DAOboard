const { ethers } = require("hardhat");
const networkConfig = {
  31337: {
    name: "hardhat",
  },
  //Add mumbai and polygon
};

const developmentChains = ["hardhat", "localhost"];
module.exports = {
  networkConfig,
  developmentChains,
};
