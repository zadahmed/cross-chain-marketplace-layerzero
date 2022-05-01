const hre = require("hardhat");

async function main() {
  const testNFT = await hre.ethers.getContractFactory("TestNFT");
  const nft = await testNFT.deploy("TestNFT","TEST","ipfs://testipfsurl", "ipfs://hiddentestipfsurl");
  await nft.deployed();
  console.log("TestNFT deployed to:", nft.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});