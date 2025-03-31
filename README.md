# Croak Ecosystem

A comprehensive DeFi ecosystem built on the Linea blockchain, featuring a custom ERC20 token, staking mechanism, and decentralized exchange.

## Overview

The Croak Ecosystem consists of several interconnected smart contracts that work together to provide a complete DeFi experience:

- **CroakToken**: An ERC20 token with tax mechanisms, burning and minting capabilities
- **CroakStaking**: A staking platform with tiered rewards based on lock periods
- **CroakSwap**: A decentralized exchange for trading CROAK with other tokens
- **Collab**: A management contract that deploys and coordinates the ecosystem

## Smart Contracts

### CroakToken

The CroakToken is an ERC20-compliant token with the following features:

- **Name**: Croak Token
- **Symbol**: CROAK
- **Decimals**: 18
- **Total Supply**: 200,000,000 CROAK
- **Tax System**: Configurable buy/sell taxes (default 3%)
- **Trading Control**: Owner can enable/disable trading
- **Tax Exemptions**: Certain addresses can be exempted from taxes

#### Key Functions

- `enableTrading()`: Enables trading for all users
- `setTaxRates(uint256 newBuyTaxRate, uint256 newSellTaxRate)`: Updates the buy and sell tax rates
- `setTaxExemptStatus(address account, bool status)`: Sets tax exemption status for an address
- `setTreasuryAddress(address newTreasuryAddress)`: Updates the treasury address
- `setAuthorizedPair(address pair, bool status)`: Sets a liquidity pair as authorized
- `mint(address to, uint256 amount)`: Mints new tokens (owner only)

### CroakStaking

The staking contract allows users to lock their CROAK tokens for different periods to earn rewards:

- **Lock Periods**:
  - 7 days: 1x reward multiplier
  - 30 days: 1.2x reward multiplier
  - 90 days: 1.5x reward multiplier
- **Minimum Stake**: 100 CROAK
- **Early Withdrawal Fee**: 20% (configurable up to 30%)

#### Key Functions

- `stake(uint256 amount, uint256 lockPeriod)`: Stake tokens with a specified lock period
- `withdraw(uint256 amount)`: Withdraw staked tokens (fee applies if before lock end)
- `claimReward()`: Claim accumulated rewards
- `getStakerInfo(address account)`: View staking details for an address

### CroakSwap

A simple DEX for swapping between CROAK and other tokens:

- **Swap Fee**: 0.3%
- **Liquidity Pools**: CROAK paired with various tokens
- **Constant Product Formula**: Uses x*y=k for price determination

#### Key Functions

- `addTokenPair(address token)`: Add support for a new token pair
- `addLiquidity(address token, uint256 croakAmount, uint256 tokenAmount)`: Add liquidity to a pool
- `swapCroakForToken(address token, uint256 croakAmount, uint256 minTokenAmount)`: Swap CROAK for another token
- `swapTokenForCroak(address token, uint256 tokenAmount, uint256 minCroakAmount)`: Swap a token for CROAK
- `getExchangeRate(address token)`: Get current exchange rates

### Collab

The management contract that deploys and coordinates the ecosystem:

- Deploys all contracts
- Sets up initial token distribution
- Configures tax exemptions
- Manages contract updates

#### Key Functions

- `updateStakingContract(address _newStakingContract)`: Update the staking contract
- `updateSwapContract(address _newSwapContract)`: Update the swap contract
- `setupTokenPair(address tokenAddress)`: Add a new token pair to the swap
- `addLiquidity(address tokenAddress, uint256 croakAmount, uint256 tokenAmount)`: Add liquidity to a pool
- `enableTrading()`: Enable trading for the token
- `updateTreasuryAddress(address _newTreasuryAddress)`: Update the treasury address
- `getContractAddresses()`: Get addresses of all deployed contracts

## Security Features

The Croak Ecosystem implements several security features:

- **Reentrancy Protection**: All contracts use ReentrancyGuard to prevent reentrancy attacks
- **Ownership Controls**: Critical functions are protected by Ownable
- **Safe ERC20**: Uses SafeERC20 for token transfers to handle non-standard tokens
- **Fee Limits**: Maximum tax rates and withdrawal fees are capped

## Deployment

The ecosystem is designed to be deployed through the Collab contract, which handles the deployment and configuration of all other contracts:

1. Deploy the Collab contract with a treasury address
2. The Collab constructor will:
   - Deploy CroakToken
   - Deploy CroakStaking
   - Deploy CroakSwap
   - Configure tax exemptions
   - Distribute initial token supply

## Development and Testing

### Prerequisites

- Solidity ^0.8.22
- Hardhat or Truffle
- Ethereum development environment