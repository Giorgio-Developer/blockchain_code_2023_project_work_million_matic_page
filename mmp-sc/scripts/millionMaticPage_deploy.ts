import { ethers } from "hardhat";

async function main() {

  const MillionMaticPageFactory = await ethers.getContractFactory("MillionMaticPage");
  const mmp = await MillionMaticPageFactory.deploy();

  await mmp.deployed();

  console.log(
    `Deployed to ${mmp.address}`
  );

	console.log( await mmp.ourMint(0,0, {value: ethers.utils.parseEther("0.001")}));
	await mmp.ourMint(1,0, {value: ethers.utils.parseEther("0.001")});
	await mmp.ourMint(0,2, {value: ethers.utils.parseEther("0.001")});

	await mmp.setAltText(1, "This is the alt text for the second NFT");

	console.log(await mmp.getAllMetadata(4, 4));
	console.log(await mmp.getAltTextsOfMintedNFTs());

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
