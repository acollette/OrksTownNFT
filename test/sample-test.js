const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Orcs", function () {
  let owner, alice, bob;
  let orcs;
  let tx;

  beforeEach(async function () {
    [owner, alice, bob] = await ethers.getSigners();
    const Orcs = await ethers.getContractFactory("dyorktown", owner)
    orcs = await Orcs.deploy(999,2,10000, "https://gateway.pinata.cloud/ipfs/QmfR8YL7ckawDfQPumxoGYgHWgyexwuzWDABjFPYmMBSFm", "https://gateway.pinata.cloud/ipfs/Qmbo7UmgPAX2wbGnW6Jvh8J7X5kp1e7EUGve3aNQYcWBkB");
    await orcs.deployed();
  })


  it("Should mint 1000 for Owner", async function () {
    expect(await orcs.owner()).to.equal(owner.address);
    await orcs.initMint(1001);
    expect(await orcs.balanceOf(owner.address)).to.equal(1001);

  });

  it("should not be possible to mint", async function () {
    await expect(orcs.connect(alice).mint(2)).to.be.reverted;
  })

  it ("should be possible to mint", async function(){
    await orcs.toggleMintOpen();
    let tx = await orcs.connect(alice).mint(2);
    await tx.wait();
    expect(await orcs.balanceOf(alice.address)).to.equal(2);
    console.log(await orcs.balanceOf(alice.address));
    
    

  })
});
