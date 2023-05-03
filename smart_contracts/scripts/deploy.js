const hre = require("hardhat");

async function main() {
  const SBCpay = await hre.ethers.getContractFactory("SBCpay");
  const sbcpay = await SBCpay.deploy();

  await sbcpay.deployed();

  console.log("SBCpay has been deployed to", sbcpay.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
