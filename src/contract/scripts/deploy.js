const hre = require("hardhat");
const { verify } = require("./verify");
async function main() {
  // We get the contract to deploy
  const Cave = await hre.ethers.getContractFactory("DAOboard");
  // We set the constructor of the contract within a message
  const caveContract = await Cave.deploy();
  await caveContract.deployed();
  console.log("Cave deployed to:", caveContract.address);
  //console.log(process.env.ETHERSCAN_API_KEY);

  // console.log("verifying...");
  // await verify(caveContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
