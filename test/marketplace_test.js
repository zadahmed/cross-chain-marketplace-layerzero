const hre = require("hardhat");
const { formatBytes32String } = require("ethers/lib/utils");
const { ethers } = require("ethers");

async function main() {
  const TestMarketplace = await hre.ethers.getContractFactory("TestMarketplace");
  const testMarketplace = await TestMarketplace.attach(
    "0x643C107552b0009A64E8553d90d69691Ae48a1Ba"
  );
  const fees = await testMarketplace.estimateFees(
    43113,
    "0x3F335A54C5127C6620a835B3CB5130E67d26bbcb",
    formatBytes32String("Hello LayerZero"),
    false,
    []
  );
  console.log(ethers.utils.formatEther(fees[0].toString()));
  await testMarketplace.sendMsg(
    43113,
    "0x3F335A54C5127C6620a835B3CB5130E67d26bbcb",
    formatBytes32String("Hello LayerZero"),
    { value: 10000000000000000 }
  );
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});