// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const OrkTown = await hre.ethers.getContractFactory("OrkTown");
  const orkTown = await OrkTown.deploy(999, "https://gateway.pinata.cloud/ipfs/QmdD8sHh9bDX2RjVt5VTiM52zxkrWT91ycU544orFLhwN9/",10,10000);

  await orkTown.deployed();

  console.log("OrkTown contract deployed to:", orkTown.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
