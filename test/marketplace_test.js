const hre = require("hardhat");
const { formatBytes32String } = require("ethers/lib/utils");
const { ethers } = require("ethers");

async function main() {
  const TestMarketplace = await hre.ethers.getContractFactory("TestMarketplace");
  const testMarketplace = await TestMarketplace.attach(
    "0x025EF5a2d6AF68E229fC9A49681a64ce0787D520"
  );

  const fees = await testMarketplace.estimateFees(
    10006,
    "0xe299c08d4AFdA3AB428E47A9bB876661a5762BA7",
    formatBytes32String("Hello LayerZero"),
    false,
    []
  );
  console.log(ethers.utils.formatEther(fees[0].toString()));

  await testMarketplace.incrementCounter(
    10006,
    { value: ethers.utils.parseEther(ethers.utils.formatEther(fees[0].toString())) }
  );

  const TestNFT = await hre.ethers.getContractFactory("TestNFT");
  const testNFT = await TestNFT.attach(
    "0xe299c08d4AFdA3AB428E47A9bB876661a5762BA7"
  );

  const counter = await testNFT.counter();
  console.log(counter);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});