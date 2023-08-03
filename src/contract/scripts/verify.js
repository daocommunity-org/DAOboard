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
verify("0x7C4AA2D25087BE8AA7c7F53cC1600308d436A3E0",[])
module.exports = { verify };
