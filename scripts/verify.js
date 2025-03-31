const hre = require("hardhat")
const { ethers } = require("hardhat")

async function main() {
  const croakTokenAddress = "YOUR_CROAK_TOKEN_ADDRESS"
  const croakStakingAddress = "YOUR_CROAK_STAKING_ADDRESS"
  const croakSwapAddress = "YOUR_CROAK_SWAP_ADDRESS"

  // Get deployer address
  const [deployer] = await ethers.getSigners()

  console.log("Verifying contracts with deployer:", deployer.address)

  // Verify CroakToken
  console.log("Verifying CroakToken...")
  try {
    await hre.run("verify:verify", {
      address: croakTokenAddress,
      constructorArguments: [deployer.address],
    })
    console.log("CroakToken verified successfully")
  } catch (error) {
    console.error("Error verifying CroakToken:", error)
  }

  // Verify CroakStaking
  console.log("Verifying CroakStaking...")
  const rewardRate = ethers.utils.parseEther("0.000001") // Must match deployment value
  try {
    await hre.run("verify:verify", {
      address: croakStakingAddress,
      constructorArguments: [croakTokenAddress, rewardRate, deployer.address, deployer.address],
    })
    console.log("CroakStaking verified successfully")
  } catch (error) {
    console.error("Error verifying CroakStaking:", error)
  }

  // Verify CroakSwap
  console.log("Verifying CroakSwap...")
  try {
    await hre.run("verify:verify", {
      address: croakSwapAddress,
      constructorArguments: [croakTokenAddress, deployer.address, deployer.address],
    })
    console.log("CroakSwap verified successfully")
  } catch (error) {
    console.error("Error verifying CroakSwap:", error)
  }

  console.log("Verification process complete!")
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })