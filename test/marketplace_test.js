const hre = require("hardhat");
const { formatBytes32String } = require("ethers/lib/utils");
const { ethers } = require("ethers");

async function main() {
  const TestMarketplace = await hre.ethers.getContractFactory("TestMarketplace");
  const testMarketplace = await TestMarketplace.attach(
    "0x6b49795FF24F2d23631d97E6fA235f9E2AF00911"
  );

  const fees = await testMarketplace.estimateFees(
    10006,
    "0x025EF5a2d6AF68E229fC9A49681a64ce0787D520",
    formatBytes32String("Hello LayerZero"),
    false,
    []
  );
  console.log(ethers.utils.formatEther(fees[0].toString()));

  await testMarketplace.incrementCounter(
    10006,
    { value: ethers.utils.parseEther(ethers.utils.formatEther(fees[0].toString())) }
  );

}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});