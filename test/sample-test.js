const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Orcs", function () {
  let owner, alice, bob;
  let orcs;
  let tx;

  beforeEach(async function () {
    [owner, alice, bob] = await ethers.getSigners();
    const Orcs = await ethers.getContractFactory("Orcs", owner)
    orcs = await Orcs.deploy();
    await orcs.deployed();
  })


  it("Should return the new greeting once it's changed", async function () {
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, world!");
    await greeter.deployed();

    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
