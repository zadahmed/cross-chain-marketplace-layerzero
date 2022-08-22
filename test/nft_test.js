const hre = require("hardhat");
const { formatBytes32String } = require("ethers/lib/utils");
const { ethers } = require("ethers");

async function main() {

  const TestNFT = await hre.ethers.getContractFactory("TestNFT");
  const testNFT = await TestNFT.attach(
    "0x5A1DC699765a6044Cce67f9985a8291b476F5Bb6"
  );

  const counter = await testNFT.counter();
  console.log(counter);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});