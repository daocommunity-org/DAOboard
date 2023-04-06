const hre = require("hardhat");
const { verify } = require("./verify");
async function main() {
  // We get the contract to deploy
  const Leaderboard = await hre.ethers.getContractFactory("LeaderBoard");
  // We set the constructor of the contract within a message
  console.log("hi")
  const LeaderboardContract = await Leaderboard.deploy({ gasLimit: 3e7 });
  console.log(LeaderboardContract)
  await LeaderboardContract.deployed();
  console.log("Leaderboard Contract deployed to:", LeaderboardContract.address);
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
