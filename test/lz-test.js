const { formatBytes32String } = require("ethers/lib/utils");
const { ethers } = require("ethers");
const hre = require("hardhat");
async function main() {
  const LayerZeroDemo1 = await hre.ethers.getContractFactory("LayerZeroDemo1");
  const layerZeroDemo1 = await LayerZeroDemo1.attach(
    "0x5a6ef98aDcf9dF1903956cCfA46a00Bff6628FA0"
  );
  const fees = await layerZeroDemo1.estimateFees(
    10006,
    "0x819d5e4b469b428DC542b13a3319EDfFD58aC2E2",
    formatBytes32String("Hello LayerZero"),
    false,
    []
  );
  console.log(ethers.utils.formatEther(fees[0].toString()));
  await layerZeroDemo1.sendMsg(
    10006,
    "0x819d5e4b469b428DC542b13a3319EDfFD58aC2E2",
    formatBytes32String("Hello LayerZero"),
    { value: ethers.utils.parseEther(ethers.utils.formatEther(fees[0].toString())) }
  );
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

