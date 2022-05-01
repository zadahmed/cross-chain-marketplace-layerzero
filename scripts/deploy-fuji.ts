const hre = require("hardhat");

async function deploy_nft() {
  const testNFT = await hre.ethers.getContractFactory("TestNFT");
  const nft = await testNFT.deploy("TESTNFT","TEST","0x79a63d6d8BBD5c6dfc774dA79bCcD948EAcb53FA",0,100);
  await nft.deployed();
  console.log("TestNFT deployed to:", nft.address);
}

deploy_nft().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});