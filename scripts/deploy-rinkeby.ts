
async function main() {
  const TestMarketplace = await hre.ethers.getContractFactory("TestMarketplace");
  const testMarketplace = await TestMarketplace.deploy(
    "0x79a63d6d8BBD5c6dfc774dA79bCcD948EAcb53FA"
  );
  await testMarketplace.deployed();
  console.log("testMarketplace deployed to:", testMarketplace.address);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});