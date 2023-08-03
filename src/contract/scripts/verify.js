const { run } = require("hardhat");

const verify = async (contractAddress, args) => {
  console.log("Verifying contract....");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified!");
    } else {
      console.log(e);
    }
  }
};
verify("0x92CDca30876B53Cea26fecFc5258AB47cd9653c4",[])
module.exports = { verify };
