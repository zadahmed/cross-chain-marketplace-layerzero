const hre = require("hardhat");

async function main() {
  const LayerZeroDemo1 = await hre.ethers.getContractFactory("LayerZeroDemo1");
  const layerZeroDemo1 = await LayerZeroDemo1.deploy(
    "0xf69186dfBa60DdB133E91E9A4B5673624293d8F8"
  );
  await layerZeroDemo1.deployed();
  console.log("layerZeroDemo1 deployed to:", layerZeroDemo1.address);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});