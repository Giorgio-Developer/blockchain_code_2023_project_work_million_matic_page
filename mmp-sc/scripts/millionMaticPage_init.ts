import { ethers } from "hardhat";

async function main() {

  //const MillionMaticPageFactory = await ethers.getContractFactory("MillionMaticPage");
  //const mmp = await MillionMaticPageFactory.deploy();

  //await mmp.deployed();
/*
  console.log(
    `Deployed to ${mmp.address}`
  );
*/

	const signer = ethers.provider.getSigner();
	const mmp = await ethers.getContractAt("MillionMaticPage", "0x43E310D5A9604653361eB53085aa3dfF77b3dc3c", signer);


	const contract_addr = "0x43E310D5A9604653361eB53085aa3dfF77b3dc3c";
	let tx = await mmp.ourMint(1, {value: ethers.utils.parseEther("0.00000001")});

	await console.log( tx );

	tx = await mmp.setTokenURI(1, "bafkreifg75xs4w3htd2ief3rr36r7qn52o6n4tz666ulshxjoem37qixfq");

	await console.log( tx );


	//await mmp.ourMint(1,0, {value: ethers.utils.parseEther("0.00001")});
	//await mmp.ourMint(0,2, {value: ethers.utils.parseEther("0.00001")});

	//await mmp.setAltText(1, "This is the alt text for the second NFT");

	//console.log(await mmp.getAllMetadata(4, 4));
	//console.log(await mmp.getAltTextsOfMintedNFTs());


	//await mmp.ourMint(2, {value: ethers.utils.parseEther("0.00001")});

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
