const hre = require("hardhat");
async function main() {
  const LayerZeroDemo1 = await hre.ethers.getContractFactory("LayerZeroDemo1");
  const layerZeroDemo1 = await LayerZeroDemo1.deploy(
    "0x79a63d6d8BBD5c6dfc774dA79bCcD948EAcb53FA"
  );
  await layerZeroDemo1.deployed();
  console.log("layerZeroDemo1 deployed to:", layerZeroDemo1.address);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});