import { ethers } from "hardhat";

async function main() {

  const MillionMaticPageFactory = await ethers.getContractFactory("MillionMaticPage");
  const mmp = await MillionMaticPageFactory.deploy();

  await mmp.deployed();

  console.log(
    `Deployed to ${mmp.address}`
  );

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
