const hre = require("hardhat");
async function main() {
  const LayerZeroDemo1 = await hre.ethers.getContractFactory("LayerZeroDemo1");
  const layerZeroDemo1 = await LayerZeroDemo1.deploy(
    "0x93f54D755A063cE7bB9e6Ac47Eccc8e33411d706"
  );
  await layerZeroDemo1.deployed();
  console.log("layerZeroDemo1 deployed to:", layerZeroDemo1.address);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});