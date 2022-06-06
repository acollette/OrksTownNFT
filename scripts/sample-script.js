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
  const OrkTown = await hre.ethers.getContractFactory("dyorktown");
  const orkTown = await OrkTown.deploy(999,2,10000, "https://gateway.pinata.cloud/ipfs/QmPMrQhx5Sit4cuA7YECP2J7A7WpBqdVoooeJx7rTbcoPj", "https://gateway.pinata.cloud/ipfs/QmPebTLfD4LZCqgfkbx2VWfXo1wZpJM854yRShx1338Stx");

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
