const hre = require("hardhat");

async function deploy_nft() {
  const testNFT = await hre.ethers.getContractFactory("TestNFT");
  const nft = await testNFT.deploy("TESTNFT","TEST","0x93f54D755A063cE7bB9e6Ac47Eccc8e33411d706",0,100);
  await nft.deployed();
  console.log("TestNFT deployed to:", nft.address);
}

deploy_nft().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});