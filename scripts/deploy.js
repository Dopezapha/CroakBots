// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  console.log("Deploying Croak ecosystem...");
  
  // Get the deployer's address
  const [deployer] = await hre.ethers.getSigners();
  console.log(`Deploying contracts with the account: ${deployer.address}`);
  
  // Define treasury address (using deployer's address for now)
  const treasuryAddress = deployer.address;
  
  // Deploy the Collab contract which will deploy all other contracts
  const Collab = await hre.ethers.getContractFactory("Collab");
  const collab = await Collab.deploy(treasuryAddress);
  
  await collab.waitForDeployment();
  
  // Get the contract address
  const collabAddress = await collab.getAddress();
  console.log(`Collab contract deployed to: ${collabAddress}`);
  
  // Get addresses of all deployed contracts
  const contractAddresses = await collab.getContractAddresses();
  console.log(`CroakToken deployed to: ${contractAddresses[0]}`);
  console.log(`CroakStaking deployed to: ${contractAddresses[1]}`);
  console.log(`CroakSwap deployed to: ${contractAddresses[2]}`);
  
  console.log("Deployment complete!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });